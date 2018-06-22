"use strict";
/*商家运营*/
var layLoad;
layui.use(['element', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	
});

//渲染商品选择下拉列表数据
$('body').delegate('#htmlWrap .getGoodsName','click',function (){
	$('.selContBox').find('.goodsItems').hide();
	var $this = $(this);
	$this.parents('.selContBox').find('.goodsItems').show();
	getSelGoodsList('init','','');
})
//输入框操作后设置商品按钮下的数据
$('body').delegate('#htmlWrap .getGoodsName','keyup',function (){//首页选择输入框搜索事件
	var $this = $(this);
	var thisVal = $this.val()||'';
	getSelGoodsList('search',thisVal,$this);
});
//渲染列表里面已经设置的商品及对应的位置
var $recLen = $(".recGoodNum").val()||8;//当前的推荐列表有多少个商品 默认为8
var selGoodsArr = [];//存放已经被设置的商品位置
for(var i=0;i<$recLen;i++){
	selGoodsArr.push('0');
}
getRecGoodsItems();
function getRecGoodsItems(){
	for(var i=0;i<$recLen;i++){
		var $strList = '<tr class="rowTr hide row'+ (i+1) +'">' +
	     	    	'<td class="posSord">'+ (i+1) +'</td>' +
	     	    	'<td class="posShortName">--</td>' +
				 	'<td class="posLogoImg">--</td>' +
				 	'<td class="posPrice">--</td>' +
				 	'<td class="posTatol">--</td>' +
				 	'<td class="posBase">--</td>' +
				 	'<td class="posReal">--</td>' +
					'<td class="posCreatTime">--</td>' +
					'<td class="posNature">--</td>' +
					'<td class="recMan_selHomeGoods selContBox clearfix">' +
						'<div class="inputIconBox">' +
							'<input class="layui-input getGoodsName" data-value="" value="" placeholder="请选择商品(支持搜索)" type="text" name="" />' +
							'<i class="layui-select-icon"></i>' +
						'</div>' +
						'<div class="goodsItems hide">' +
							'<ul class="selGoodsBox selHomeGoodsBox">' +
								'<li value="0" data-id="--" data-name="" data-img="--" data-price="--" data-tatol="--" data-base="--" data-real="--" data-time="--" data-nature="--">请选择商品</li>' +
							'</ul>' +
	     	     		'</div>' +
					'</td>' +
			    '</tr>';
	    $('#htmlWrap').append($strList);
	}
	$.ajax({
		data:{pNo:1,pSize:1000000,location:3},
	    url:"/admin/product/recommend/list.do",
	    type:"post",
	    beforeSend:beforeSend(),
	    success:function(json){
		    if(json.message == "成功"){
		    	var datas = json.data.datas.list;
		    	if(datas && datas.length){
		    		for(var i=0;i<datas.length;i++){
		    			var $eq = datas[i].botique_sort;//排序号
		    			selGoodsArr[$eq-1] = datas[i].id;//把已经被设置的商品的id存起来
		    			if(datas[i].product_ad_attr == '1'){
		    				var $adAttr = '购买商品';
		    			}else if(datas[i].product_ad_attr == '2'){
		    				var $adAttr = '广告商品';
	    				}else if(datas[i].product_ad_attr == '3'){
		    				var $adAttr = '充值商品';
		    			}else{
		    				var $adAttr = '';
		    			}
			    		$('#htmlWrap').find('.posShortName').eq($eq-1).html(datas[i].full_name);
			    		$('#htmlWrap').find('.posShortName').eq($eq-1).attr('data-id',datas[i].id);
			    		$('#htmlWrap').find('.posLogoImg').eq($eq-1).empty().append('<img src="' + datas[i].image_url + '" style="width: 110px;height: 80px;" alt="" />');
			    		$('#htmlWrap').find('.posCreatTime').eq($eq-1).html(datas[i].update_time);
			    		$('#htmlWrap').find('.posPrice').eq($eq-1).html(datas[i].retail_price);
			    		$('#htmlWrap').find('.posTatol').eq($eq-1).html(datas[i].exchange_points);
			    		$('#htmlWrap').find('.posBase').eq($eq-1).html(datas[i].base);
			    		$('#htmlWrap').find('.posReal').eq($eq-1).html(datas[i].sale_count);
			    		$('#htmlWrap').find('.posNature').eq($eq-1).html($adAttr);
			    		$('#htmlWrap').find('.getGoodsName').eq($eq-1).val(datas[i].full_name);
			    	}
		    	}
		    	$('#htmlWrap').find('.rowTr').removeClass('hide');
		    	getSelGoodsList('init','','');
		    }
	    }
	});//ajax
};

//获取下拉列表数据方法
function getSelGoodsList(type,name,$this){//type为渲染方式：(init为初始渲染，search为搜索渲染),name为搜索的内容,$this为搜索时操作的节点
	var data = {shortName:name||'',pNo:1,pSize:10000000,status:12};
	$.ajax({
		data:data,
	    dataType:"json",
	    url:"/admin/product/recommend/slaves/list.do",
	    type:"post",
	    beforeSend:beforeSend(),
	    success:function(json){
    		if(layLoad){
    			layer.close(layLoad);
    		}
		    if(json.message == "成功"){
		    	var datas = json.data.datas.list;
		    	if(datas && datas.length){
		    		var str = '<li value="0" data-id="--" data-name="" data-img="--" data-price="--" data-tatol="--" data-base="--"' + 
		    			'data-real="--" data-time="--" data-nature="--">请选择商品</li>';
		    		for(var j=0;j<selGoodsArr.length;j++){
		    			for(var i=0;i<datas.length;i++){
			    			var $nature = datas[i].product_ad_attr;
			    			if($nature == '1'){//是购买商品
			    				var $natureText = '购买商品';
			    			}else if($nature == '2'){//广告商品
			    				var $natureText = '广告商品';
		    				}else if($nature == '3'){//广告商品
			    				var $natureText = '充值商品';
			    			}else{
			    				var $natureText = '--';
			    			}
			    			if(selGoodsArr[j] == datas[i].id){
			    				str += '<li selected="selected" value="'+ (i+1) +'" data-id="'+ datas[i].id +'" data-name="'+ datas[i].full_name +'" data-img="'+ 
					    			datas[i].image_url +'" data-price="'+ datas[i].retail_price +'" data-tatol="'+ datas[i].exchange_points +'" data-base="'+ 
					    			datas[i].base +'" data-real="'+ datas[i].sale_count +'" data-time="'+ datas[i].update_time +'" data-nature="'+ 
					    			$natureText +'">'+ datas[i].full_name +'</li>';
			    			}else{
			    				str += '<li value="'+ (i+1) +'" data-id="'+ datas[i].id +'" data-name="'+ datas[i].full_name +'" data-img="'+ 
					    			datas[i].image_url +'" data-price="'+ datas[i].retail_price +'" data-tatol="'+ datas[i].exchange_points +'" data-base="'+ 
					    			datas[i].base +'" data-real="'+ datas[i].sale_count +'" data-time="'+ datas[i].update_time +'" data-nature="'+ 
					    			$natureText +'">'+ datas[i].full_name +'</li>';
			    			}
				    	}
		    			$('.goodsItems').eq(j).find('.selGoodsBox').empty().append(str);
		    			str = '<li value="0" data-id="--" data-name="" data-img="--" data-price="--" data-tatol="--" data-base="--"' + 
		    			'data-real="--" data-time="--" data-nature="--">请选择商品</li>';
		    		}
		    	}else{
		    		if(type == 'search'){
		    			$this.parents('.selContBox').find('.goodsItems').find('.selGoodsBox').empty().append('<div onclick="null" style="color:#c3c3c3">无匹配项</div>');
		    		}
		    	}
		    }
	    }
	});//ajax
};
//下拉框的取消事件
$('body').on('click',function (e){
	var $e = window.event || e; // 兼容IE7
	var $obj = $($e.srcElement || $e.target);
	if(e.target.className != "goodsItems" && e.target.className.indexOf("getGoodsName") < 0){
		$('.goodsItems').hide();
	}
});
//下拉列表选择商品的点击事件
$('body').delegate('.selGoodsBox li','click',function (){
	var layLoad = layer.load(2,{shade: 0.6});//加载等待
	var $this = $(this);
	//被选择的商户的信息
	var $dataName = $this.attr('data-name');//商品名称
	var $dataLogo = $this.attr('data-img');//商品图
	var $dataTime = $this.attr('data-time')||'--';//提交时间
	var $dataId = $this.attr('data-id');//商品ID
	var $dataPrice = $this.attr('data-price');//原价
	var $dataTatol = $this.attr('data-tatol');//兑换积分
	var $dataBase = $this.attr('data-base');//已售基数
	var $dataReal = $this.attr('data-real')||'0';//实售数量
	var $dataNature = $this.attr('data-nature');//商品广告属性
	//当前位置上的商品信息  posPrice posTatol posBase posReal posCreatTime posNature
	var $sord = $this.parents('tr').find('.posSord').html();
	var $posShortName = $this.parents('tr').find('.posShortName').html();
	var $posShortNameid = $this.parents('tr').find('.posShortName').attr('data-id')||'';
	//选择商品推荐到首页
	if($this.html() == '请选择商品' && $posShortName == '--'){
		if(layLoad){
			layer.close(layLoad);
		}
		layer.msg('请勿重复操作！');
		return false;
	}else if($dataId == $posShortNameid){
		if(layLoad){
			layer.close(layLoad);
		}
		layer.msg('请勿重复操作！');
		return false;
	}else if($posShortName != '--' && $dataName == ''){//恢复默认
		$dataId = $posShortNameid;
		$sord = 0;
		var data = {productId:$dataId,botiqueSort:$sord};
		var param = {'$dataName':$dataName,'$dataId':$dataId,'$dataLogo':$dataLogo,'$dataTime':$dataTime,'$dataPrice':$dataPrice,'$dataTatol':$dataTatol,'$dataBase':$dataBase,'$dataReal':$dataReal,'$dataNature':$dataNature};//需要传入的参数变量
		replaceSet($this,data,param);
		window.location.reload();
	}else{
		var data = {productId:$dataId,botiqueSort:$sord};
		var param = {'$dataName':$dataName,'$dataId':$dataId,'$dataLogo':$dataLogo,'$dataTime':$dataTime,'$dataPrice':$dataPrice,'$dataTatol':$dataTatol,'$dataBase':$dataBase,'$dataReal':$dataReal,'$dataNature':$dataNature};
		var hasPosItems = $('#htmlWrap').find('tr');
		var flag = true;
		for(var i=0;i<hasPosItems.length;i++){//查看同一商品是否在不同位置设置(重复设置)
			var _dataId = hasPosItems.eq(i).find('.posShortName').attr('data-id');
			if(_dataId == $dataId){
				flag = false;
				layer.confirm('当前商品已在首页展示，是否确认覆盖？', {
					btn: ['确认', '取消'] //按钮
				}, function() {
					var layLoad = layer.load(2,{
						shade: 1
					});//加载等待
					replaceSet($this,data,param);
					layer.closeAll('dialog');
					window.location.reload();
				},function (){
					if(layLoad){
						layer.close(layLoad);
					}
					layer.closeAll('dialog');
				});//同一商户在不同位置设置时的强提示
			}
		}
		if(flag){
			replaceSet($this,data,param);
			if(layLoad){
				layer.close(layLoad);
			}
		};
	}
})
function replaceSet($this,data,param){//param 函数内需要的变量参数集合
	$.ajax({
		data:data,
	    dataType:"json",
	    url:"/admin/mall/layout/product/recommend/boutique/sort/set.do",
	    type:"post",
	    beforeSend:beforeSend(),
	    success:function(json){
	    	layer.closeAll();
		    if(json.message == "成功"){
		    	$this.parents('.rowTr').find('.posShortName').html(param.$dataName||'--');
		    	$this.parents('.rowTr').find('.posShortName').attr('data-id',param.$dataId);
				if($this.parents('.rowTr').find('.posLogoImg').find('img').length){
					if(param.$sord == 0){
						$this.parents('.rowTr').find('.posLogoImg').html('--');
					}else{
						if(param.$dataLogo && param.$dataLogo != '--'){
							$this.parents('.rowTr').find('.posLogoImg').find('img').attr('src',param.$dataLogo);
						}else{
							$this.parents('.rowTr').find('.posLogoImg').html('--');
						}
					}
				}else{
					$this.parents('.rowTr').find('.posLogoImg').html('<img src="'+ param.$dataLogo +'" style="width: 110px;height: 80px;" alt="" />');
				}
				$this.parents('.rowTr').find('.posCreatTime').html(param.$dataTime);
				$this.parents('.rowTr').find('.posPrice').html(param.$dataPrice);
				$this.parents('.rowTr').find('.posTatol').html(param.$dataTatol);
				$this.parents('.rowTr').find('.posBase').html(param.$dataBase);
				$this.parents('.rowTr').find('.posReal').html(param.$dataReal);
				$this.parents('.rowTr').find('.posNature').html(param.$dataNature);
				$this.parents('.rowTr').find('.getGoodsName').val(param.$dataName);
		    }else{
		    	layer.msg(json.message);
			    return;
		    }
		    $this.parents('.rowTr').find('.goodsItems').addClass('hide');
	    },
	    error:function (){
	    	layer.closeAll();
	    	layer.msg('操作失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
	    }
	});//ajax
};

//模块2的特殊处理方法
function getSecModuleLis($goodsNum){//传入商品数量
	var $goodsListNum = $("#htmlWrap").find(".rowTr").length;//原有商品推荐的位置
	if(Number($goodsNum) < Number($goodsListNum)){//说明需要删除展示位置
		$("#htmlWrap").find(".rowTr").eq(Number($goodsNum)-1).nextAll().remove();
	}else if(Number($goodsNum) > Number($goodsListNum)){//说明需要增加展示位置
		var $len = Number($goodsNum) - Number($goodsListNum);//的到需要增加的列表项数量
		for(var i=0;i<$len;i++){
			var $trLis = Number($goodsListNum) + i + 1;
			var $strList = '<tr class="rowTr row'+ $trLis +'">' +
		     	    	'<td class="posSord">'+ $trLis +'</td>' +
		     	    	'<td class="posShortName">--</td>' +
					 	'<td class="posLogoImg">--</td>' +
					 	'<td class="posPrice">--</td>' +
					 	'<td class="posTatol">--</td>' +
					 	'<td class="posBase">--</td>' +
					 	'<td class="posReal">--</td>' +
						'<td class="posCreatTime">--</td>' +
						'<td class="posNature">--</td>' +
						'<td class="recMan_selHomeGoods selContBox clearfix">' +
							'<div class="inputIconBox">' +
								'<input class="layui-input getGoodsName" data-value="" value="" placeholder="请选择商品(支持搜索)" type="text" name="" />' +
								'<i class="layui-select-icon"></i>' +
							'</div>' +
							'<div class="goodsItems hide">' +
								'<ul class="selGoodsBox selHomeGoodsBox">' +
									'<li value="0" data-id="--" data-name="" data-img="--" data-price="--" data-tatol="--" data-base="--" data-real="--" data-time="--" data-nature="--">请选择商品</li>' +
								'</ul>' +
		     	     		'</div>' +
						'</td>' +
				    '</tr>';
		    $('#htmlWrap').append($strList);
		}
		
	}
};
//模块2应用配置的时候进行验证列表是否配置商品
function verifyRecList(){
	var $trLen = $('#htmlWrap').find('.rowTr');
	var recListFlag = true;
	if(!$trLen){
		layer.msg('请完善配置信息！', {
			time: 1000, //1s后自动关闭
			icon: 2
		});
		return;
	}else{
		for(var i=0;i<$trLen.length;i++){
			if($trLen.eq(i).find('.posShortName').html() == '--' && $trLen.eq(i).find('.posLogoImg').html() == '--'){//拿商品名称+商品图片来作为验证是否为空的标准
				layer.msg('请完善配置信息！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				recListFlag = false;
				return recListFlag;
			}else{
			   recListFlag = true;
			}
		}
		
		return recListFlag;
	}
}

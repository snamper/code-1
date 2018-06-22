"use strict";
layui.use(['element', 'form'], function(){
	$ = layui.jquery;
	var form = layui.form(); 
	
	 
});
//监测推荐到首页 radio的点击时间
$('.selectGoodsItem').delegate('input[type=radio]','click',function(){
	$(this).parents('.recHomeBox').attr('data-radio',$(this)[0].defaultValue);
	if($(this)[0].defaultValue == 0){//如果选择的是不推荐到首页，那么就需要清空排序号
		$(this).parents('.selItemLis').find('.newGoodSort').val('');
		$(this).parents('.selItemLis').find('.newGoodSort').attr('disabled',true);
	}else{
		$(this).parents('.selItemLis').find('.newGoodSort').removeAttr('disabled');
	}
	$(this).attr('checked',"checked");
	$(this).siblings("input").removeAttr('checked');
});

//先获取已经选择的商品，作为下拉列表回显时使用
var contrastArr = [];//存放被选中的商品的id
$.ajax({//注：从后台数据拿到需要回显的商品
    dataType:"json",
    url:"/admin/product/noob/info.do",
    type:"get",
    async: false,
    success:function(json){
	    if(json.message == "成功"){
	    	var datas = json.data.noobList;
	    	if(datas && datas.length){
		        for(var i=0;i<datas.length;i++){
		        	contrastArr.push(datas[i].productId);//获取已经被选择的商品id
		        }
	    	}
	    }
    }
});//ajax


//选择优惠券按钮下的列表数据
getSelLimitList('');
function getSelLimitList(name){//name为搜索时候的内容
	$.ajax({//注：需要展现的是已上架+购买类型+非特价的商品(3合1的条件限制)
	    dataType:"json",
	    url:"/admin/product/recommend/slaves/list.do?isPackage=false&pNo=1&pSize=10000000&status=4&productAdAttr=1&specialOfferFlag=false&shortName="+name,
	    type:"get",
	    async: false,
	    success:function(json){
		    if(json.message == "成功"){
		    	var datas = json.data.datas.list;
		    	var str = '';
		    	if(datas && datas.length){
		            if(contrastArr.length){//查看回显数组是否存在
		    			for(var i=0;i<datas.length;i++){
		    				var lisId = datas[i].id;
		    				var lisName = datas[i].name;
		    				var strLis;
		    				for(var j=0;j<contrastArr.length;j++){
		    					if(contrastArr[j] == lisId){
				    				strLis = '<li class="coupLis fl activeThis" title="'+ datas[i].full_name +'" data-id="'+ datas[i].id +'" data-point="'+ datas[i].channelSelection.mailPrice +'">'+ datas[i].full_name +'</li>';
				    				break;
				    			}else{
				    				strLis = '<li class="coupLis fl" title="'+ datas[i].full_name +'" data-id="'+ datas[i].id +'" data-point="'+ datas[i].channelSelection.mailPrice +'">'+ datas[i].full_name +'</li>';
				    			}
		    				}
		    				str += strLis;
				    	}
		    		}else{//初次设置
		    			for(var i=0;i<datas.length;i++){
			    			str += '<li class="coupLis fl" data-id="'+ datas[i].id +'"data-point="'+ datas[i].exchange_points +'">'+ datas[i].full_name +'</li>';
				    	}
		    		}
	    			$('.selCoupsBox').empty().append(str);
	    			$('.handleBtnBox').show();
		    	}else{
		    		$('.selCoupsBox').empty().append('<li class="coupLis noDatasLis">暂无匹配数据</li>');
		    		$('.handleBtnBox').hide();
		    	}

		    }
	    }
	});//ajax
};
//优惠券下拉列表的点击事件
$('.selCoupsBox').delegate('.coupLis','click',function (){
	var $this = $(this);
	if($this.hasClass("activeThis")){
		$this.removeClass("activeThis");
	}else{
		$this.addClass("activeThis");
	}
});
//展示区域内商品列表的删除按钮事件
$('.selectGoodsItem').delegate('.delCofigBtn','click',function(){
	var $this = $(this);
	var $id = $this.parents('.selItemLis').attr('data-id');
	$this.parents('.selItemLis').remove();
	if(contrastArr.length > 1){
		for(var i=0;i<contrastArr.length;i++){
			if($id == contrastArr[i]){
				contrastArr.splice(i,1);
			}
		}
	}else{
		contrastArr = [];
	}
})
//优惠券选择输入框的点击事件
$('.selCoupsInp').on('click',function(){
	getSelLimitList('');
	$('.searchGood').val('');//重新点击选择商品框的时候清空上次的搜索内容
	$('.selCoupsContItem').show();
});
//优惠券选择输入框的搜索事件
$('.searchGood').on('keyup',function(){
	var $this = $(this);
	var $thisVal = $this.val()||'';
	getSelLimitList($thisVal);

});
//下拉列表的搜索图标事件 
$('.layuiIcon').on('click',function(){
	var $Val = $('.searchGood').val()||'';
	getSelLimitList($thisVal);
});
//优惠券下拉框的取消事件
$('body').on('click',function (e){
	var $e = window.event || e; // 兼容IE7
	var $obj = $($e.srcElement || $e.target);
	if(e.target.className.indexOf("coupLis") < 0 && e.target.className.indexOf("sureCoups") < 0 && e.target.className.indexOf("selCoupsBox") < 0 
	&& e.target.className.indexOf("handleBtnBox") < 0 && e.target.className.indexOf("selCoupsInp") < 0 && e.target.className.indexOf("searchGood") < 0
	&& e.target.className.indexOf("layuiIcon") < 0 && e.target.className.indexOf("searchBox") < 0){
		$('.selCoupsContItem').hide();
	}
});
//优惠券下拉框确定按钮事件
$('.sureCoups').on('click',function (){
	var $coupLis = $('.coupLis');//下拉列表里面的商品
	var $selItemLis = $('.selItemLis');//展示区域的商品
    var newLis = '';
    contrastArr = [];//在点击确定按钮的时候清空初始化的回显数组
    
    
    var temporaryArr = contrastArr;//使用临时数组存放需要对比的已选中的商品id
	for(var i=0;i<$coupLis.length;i++){
		if($coupLis.eq(i).hasClass('activeThis')){
			contrastArr.push($coupLis.eq(i).attr('data-id'));//点击确定按钮的时候要重新记录被选择的商品的id
			var flag = false;//判断是否存在重复的商品
			
			if($selItemLis.length){//说明展示区域已经有已被选中的商品
				var itemInput = null;
				for(var j=0;j<$selItemLis.length;j++){//已经被选中的和最新确认选中的进行对比，如果有重复的就要进行提示处理
					if($coupLis.eq(i).attr('data-id') == $selItemLis.eq(j).attr('data-id')){//说明存在重复的数据
						itemInput = $('.selectGoodsItem').find('[data-id="'+$selItemLis.eq(j).attr('data-id')+'"]')[0].outerHTML;
						flag = true;
					}
				}
				if(!flag){
					newLis += '<li class="selItemLis" data-id="'+$coupLis.eq(i).attr('data-id')+'">'+
			    		'<span class="selGoodsName fl marginRight20">'+$coupLis.eq(i).html()+'</span>'+
			    		'<span class="oldCoast fl marginRight20" data-oldPoint="'+$coupLis.eq(i).attr('data-point')+'">原价：'+$coupLis.eq(i).attr('data-point')+'积分</span>'+
			    		'<span class="txt-impt fl">*</span><span class="fl">新手价：</span>'+
			    		'<input type="text" class="layui-input-inline newCoastInp marginRight20" value="" placeholder="小于售价(≥0的整数)" autocomplete="off">'+
			    		'<div class="recHomeBox marginRight20" data-radio="1"><span class="txt-impt fl">*</span><span class="fl">推荐到首页：</span>'+
			    		'<input name="recHome'+$coupLis.eq(i).attr('data-id')+'" value="1" type="radio" lay-filter="recHome" checked="checked"><span>是</span>'+
						'<input class="margin_left" name="recHome'+$coupLis.eq(i).attr('data-id')+'" value="0" type="radio" lay-filter="recHome"><span>否</span></div>'+
						'<div class="fl">'+
							'<span class="fl">排序：</span>'+
				    		'<input type="text" class="layui-input-inline newGoodSort marginRight20 fl" value="" placeholder="大于0的整数" autocomplete="off">'+
					    	'<div class="layui-btn-group fl">'+
							    '<a class="layui-icon layui-btn layui-btn-primary layui-btn-small delCofigBtn" title="删除">&#xe640;</a>'+
							'</div>'+
						'</div>'+
						'<div class="clearfix"></div>'+
      					'</li>';
				}else{
					newLis += itemInput;
				}
			}else{
				newLis += '<li class="selItemLis" data-id="'+$coupLis.eq(i).attr('data-id')+'">'+
			    		'<span class="selGoodsName fl marginRight20">'+$coupLis.eq(i).html()+'</span>'+
			    		'<span class="oldCoast fl marginRight20" data-oldPoint="'+$coupLis.eq(i).attr('data-point')+'">原价：'+$coupLis.eq(i).attr('data-point')+'积分</span>'+
			    		'<span class="txt-impt fl">*</span><span class="fl">新手价：</span>'+
			    		'<input type="text" class="layui-input-inline newCoastInp marginRight20" value="" placeholder="小于售价(≥0的整数)" autocomplete="off">'+
			    		'<div class="recHomeBox marginRight20" data-radio="1"><span class="txt-impt fl">*</span><span class="fl">推荐到首页：</span>'+
			    		'<input name="recHome'+$coupLis.eq(i).attr('data-id')+'" value="1" type="radio" lay-filter="recHome" checked="checked"><span>是</span>'+
						'<input class="margin_left" name="recHome'+$coupLis.eq(i).attr('data-id')+'" value="0" type="radio" lay-filter="recHome"><span>否</span></div>'+
						'<div class="fl">'+
							'<span class="fl">排序：</span>'+
				    		'<input type="text" class="layui-input-inline newGoodSort marginRight20 fl" value="" placeholder="大于0的整数" autocomplete="off">'+
					    	'<div class="layui-btn-group fl">'+
							    '<a class="layui-icon layui-btn layui-btn-primary layui-btn-small delCofigBtn" title="删除">&#xe640;</a>'+
							'</div>'+
						'</div>'+
						'<div class="clearfix"></div>'+
      					'</li>';
			}
		}
	}
	$('.selectGoodsItem').empty().append(newLis);//添加新的商品列表项
	$('.selCoupsContItem').hide();
});

//配置保存按钮
$('.setMessage').on('click', function (){
	var $newCoastInp = $('.newCoastInp');//新手价
	var $newGoodSort = $('.newGoodSort');//排序
	
	
	for(var i=0;i<$newGoodSort.length;i++){
		if($newCoastInp.eq(i).hasClass('errorInput')){
			layer.msg('新手价为大于等于0的整数且小于等于原价！', {
				time: 1500, //1s后自动关闭
				icon: 2
			});
			return;
		}
		if($newGoodSort.eq(i).hasClass('errorInput')){
			layer.msg('排序号为大于0的整数且不能重复！', {
				time: 1500, //1s后自动关闭
				icon: 2
			});
			return;
		}
	}
	var datas = getShowConfig();
	if($('.selItemLis').length){//说明展示区有商品列表
		if(datas){
			$.ajax({
				type:"post",
				url:'/admin/product/noob/save.do',
				data:JSON.stringify(datas),
				dataType:"json",
				contentType : "application/json" ,
				success:function(json){
					if(json.message == "成功"){
						layer.msg('操作成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						});
					}else{
						layer.msg(json.message);
					}
				},
				error:function (){
					layer.msg('操作失败！', {
						time: 1000, //1s后自动关闭
						icon: 2
					});
				}
			})//ajax
		}else{
			if($('.newCoastInp').hasClass('errorInput')){//新手价不符合标准
				layer.msg('新手价为大于等于0的整数且小于等于原价！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}else if($('.newGoodSort').hasClass('errorInput')){//排序不符合标准
				layer.msg('排序号为大于0的整数且不能重复！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}else{
				layer.msg('请检查配置项是否符合标准', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
			return;
		}
	}else{
		layer.msg('请配置新手福利商品！', {
			time: 1500,
			icon: 2
		});
		return;
	}
});

//应用配置按钮事件
$('.useConfigBtns').on('click',function (){
	$.ajax({
		type:"post",
		data:'',
		url:'/admin/product/noob/apply.do',
		dataType:"json",
		success:function(json){
			if(json.message == "成功"){
				layer.msg('配置应用成功！', {
					time: 1000, //1s后自动关闭
					icon: 1
				});
			}else{
				layer.msg(json.message);
			}
		},
		error:function (){
			layer.msg('配置应用失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
		}
	})//ajax
});

//校验展示区商品列表的配置数据
function getShowConfig(){
	if(!$('.getLimitVal').check().noZero($('.getLimitVal').val())){
		$('.tooltip-getLimitVal').addClass('hide');
		var $getLimitVal = $('.getLimitVal').val();//领取不同商品数量限制
	}else{
		$('.tooltip-getLimitVal').removeClass('hide');
		return;
	}
	if(!$('.hourInterval').check().noZero($('.hourInterval').val())){
		$('.tooltip-hourInterval').addClass('hide');
		var $hourInterval = $('.hourInterval').val();//领取时间间隔
	}else{
		$('.tooltip-hourInterval').removeClass('hide');
		return;
	}
	var $newCoastInp = $('.newCoastInp');//新手价
	var $newGoodSort = $('.newGoodSort');//排序
	var $selItemLis = $('.selItemLis');//展示区的列表项
	var $len = $('.selItemLis').length;
	for(var i=0;i<$len;i++){
		if(!$newCoastInp.eq(i).val()){//校验新手价
			$newCoastInp.eq(i).addClass('errorInput');//加上红线框
			return;
		}else{
			var $oldCoast = $newCoastInp.eq(i).parents('.selItemLis').find('.oldCoast').attr('data-oldPoint')||0;//原价积分
			if(Number($newCoastInp.eq(i).val()) >= 0 && Number($newCoastInp.eq(i).val()) <= Number($oldCoast)){
				$newCoastInp.eq(i).removeClass('errorInput');//去掉红线框
			}else{
				$newCoastInp.eq(i).addClass('errorInput');//加上红线框
				return;
			}
		}
		if($newGoodSort.eq(i).val()){//校验排序
			if(!$('.newGoodSort').check().noZero($newGoodSort.eq(i).val())){
				$newGoodSort.eq(i).removeClass('errorInput');//去掉红线框
			}else{
				$newGoodSort.eq(i).addClass('errorInput');//加上红线框
				return;
			}
		}
	}
	var data = {
		"noobRule": {
			"productCountLimit": $getLimitVal||'',
			"hourInterval": $hourInterval||''
		}
	}
	var $noobList = [];//存放展示区列表数据的数组
	for(var i=0;i<$len;i++){
		var noobLis = {};//存放展示区的每一个商品配置
		noobLis.productId = $selItemLis.eq(i).attr('data-id');//商品id
		noobLis.productName = $selItemLis.eq(i).find('.selGoodsName').html();//商品名称
		noobLis.exchangePoints = $selItemLis.eq(i).find('.oldCoast').attr('data-oldpoint')||0;//商品原价格
		noobLis.noobExchangePoints = $selItemLis.eq(i).find('.newCoastInp').val();//新手福利商品价格
		noobLis.noobHomePage = $selItemLis.eq(i).find('.recHomeBox').attr('data-radio');//是否存在于首页
		noobLis.noobGoodSort = $selItemLis.eq(i).find('.newGoodSort').val()||'';//首页排序
		$noobList.push(noobLis);
	}
	data.noobList = $noobList;
	return data;
}

//正则验证
//领取不同商品数量限制验证 大于0的整数
$('.getLimitVal').blur(function (){
	var $this = $(this);
	var perVal = $this.val()||'';
	if(!$('.getLimitVal').check().noZero(perVal)){//符合标准
		$('.tooltip-getLimitVal').addClass('hide');
	}else{
		$('.tooltip-getLimitVal').removeClass('hide');
		return;
	}
});
//领取时间间隔验证 大于0的整数
$('.hourInterval').blur(function (){
	var $this = $(this);
	var perVal = $this.val()||'';
	if(!$('.hourInterval').check().noZero(perVal)){//符合标准
		$('.tooltip-hourInterval').addClass('hide');
	}else{
		$('.tooltip-hourInterval').removeClass('hide');
		return;
	}
});
//新手价的验证  大于等于0且小于等于原价
$('body').delegate('.newCoastInp','blur',function (){
	var $this = $(this);
	var perVal = $this.val()||'';
	var $oldCoast = $this.parents('.selItemLis').find('.oldCoast').attr('data-oldPoint')||0;//原价积分
	if(!$('.newCoastInp').check().hasZero(perVal) && Number(perVal) <= Number($oldCoast)){//符合标准
		$this.removeClass('errorInput');
		$this.attr("value",perVal);
	}else{
		$this.addClass('errorInput');
		return;
	}
});
//排序的验证  大于0的整数且可以为空
$('body').delegate('.newGoodSort','blur',function (){
	var $this = $(this);
	var perVal = $this.val()||'';
	if(perVal){
		if(!$('.newGoodSort').check().noZero(perVal)){//符合标准
			if($('.newGoodSort').length > 1){
				for(var i=0;i<$('.newGoodSort').length;i++){
					if(perVal == $('.newGoodSort').eq(i).val() && $this.parents('.selItemLis').attr('data-id') != $('.newGoodSort').eq(i).parents('.selItemLis').attr('data-id')){
						$this.addClass('errorInput');
						layer.msg('排序号重复！', {
							time: 1500, //1s后自动关闭
							icon: 2
						});
						return;
					}else{
						$this.removeClass('errorInput');
					}
				}
			}
			$this.removeClass('errorInput');
			$this.attr("value",perVal);
		}else{
			$this.addClass('errorInput');
			return;
		}
	}else{
		$this.removeClass('errorInput');
		$this.attr("value",perVal);
	}
});
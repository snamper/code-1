"use strict";
var layLoad;//loading加载初始化
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	
	var location = 1;	//推荐位置，默认频道页
	//切换查询状态
	$(".chooseType>li").on("click", function() {
		var toLocation = $(this).attr("data-location");
	     if(toLocation == '1'){
			$('#htmlWrap').find('.rowTr').addClass('hide');
		}else{
			if(layLoad){
				layer.close(layLoad);
			}else{
				layLoad = layer.load(2);//加载等待
			}
		}
		if(Number(toLocation) > 3){//区分前后三个导航（toLocation=1,2,3为一个页面，4,5,6为另一个页面）
			window.location.href = window.location.origin + '/operation/recMall/mallRec?pNo=1&pSize=10&location=' + toLocation;
			return;
		}else{
			window.location.href = window.location.origin + '/operation/opMerMan/merManRefer?pNo=1&pSize=10&location=' + toLocation;
			var isInit = (getQueryString("pNo")&&getQueryString("pSize"))?false:true;
			if(!isInit){
				replaceParamVal("location",toLocation); 
			}else{
				window.location.search = "?pNo=1&pSize=10&location="+toLocation;			 
			}
		}
	})//切换查询状态
	//fun replace url
	function replaceParamVal(paramName,replaceWith){  
	     var oUrl = window.location.href.toString();  
	     var re=eval('/('+ paramName+'=)([^&]*)/gi');  
	     var nUrl = oUrl.replace(re,paramName+'='+replaceWith);  		 
	     window.location = nUrl;  
	} 
	
	//切换商品广告属性查询(购买商品&广告商品)
	form.on('select(productAdAttr)', function(data){
		$('.productAdAttr').attr('data-productAdAttr', data.value);
	});
	
	//设置排序
	$(".setSorts").blur(function() {
		var sort = $(this).val();
		var preSort = $(this).attr("data-value")
		var reg = new RegExp("^[1-4]{1}$");
		var reg1 = new RegExp("^[1-8]{1}$");
		location = $(".chooseType").attr("data-location")
		if(!sort){
			sort = 0;
		}else{
			if(location == 2 && !reg.test(Number(sort))){
				layer.msg("只能设置数字1-4！");
				$(this).val(preSort);
				return;
			}else if(location == 1 && !reg1.test(Number(sort))){
				layer.msg("只能设置数字1-8！");
				$(this).val(preSort);
				return;
			}
		}
		var data = {
			"productId":$(this).attr("data-recmId"),
			"channelPageSort":sort
		}
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/operation/opMerMan/setManSort",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('设置成功！', {
						time: 1500, //1s后自动关闭
						icon: 1
					},function(){
						search('1');
					});
				}else{
					layer.msg(json.message, {
						time: 1500, //1s后自动关闭
						icon: 2
					})
				}
			},
			error: function() {
				layer.msg('设置失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		});
	})
	
	//初始化日期组件
	if($('.layui-form').eq(0).hasClass('dataPlug')){//判断数据是否请求成功
		var opt = {
			sMax: getQueryString("enDate") ? getQueryString("enDate") : laydate.now(),//开始日期的最大值
			eMin: getQueryString("stDate") ? getQueryString("stDate") : '2017-01-01'//结束日期的最小值
		};
		var dateIint = new dateComponent(opt);
	}
	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				var layLoad = layer.load(2,{
					shade: 0.6
				});//加载等待
				var $starTimes = getQueryString('stDate')||'';//开始时间
				var $endTimes = getQueryString('enDate')||'';//截止时间
				var $shortName = getQueryString('shortName')||'';
				var productAdAttr = $('.productAdAttr').attr('data-productAdAttr')||'';
				if(productAdAttr == '0'){
					productAdAttr = '';
				}
				var pageNo = obj.curr;
				var pageSize = $("#paging").attr("data-page-size");
				var location = $(".chooseType").find(".layui-this").attr("data-location");
				window.location.search="?productAdAttr="+escape(productAdAttr)+"&shortName=" + escape($shortName) + "&location="+escape(location)+
					"&pSize="+escape(pageSize)+"&pNo="+escape(pageNo)+"&stDate="+escape($starTimes)+"&enDate="+escape($endTimes);
			};
		}
	});
});

//加载首页已推荐的商品数据
var selGoodsArr = ['0','0','0','0'];//存放首页已经推荐的商品
if(getQueryString("location") == 2){
	$.ajax({
		data:{"location":"2","pNo":1,"pSize":10},
	    dataType:"json",
	    url:"/operation/opMerMan/homeGoodsPos",
	    type:"post",
	    beforeSend:beforeSend(),
	    success:function(json){
		    if(json.message == "成功"){
		    	var datas = json.data.datas.list;
		    	if(datas && datas.length){
		    		for(var i=0;i<datas.length;i++){
		    			var $eq = datas[i].home_page_sort;
		    			selGoodsArr[$eq-1] = datas[i].id;
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

//新手推荐数据请求加载渲染
var selRecGoodsArr = ['0','0'];//存放新手推荐的商品
if(getQueryString("location") == 3){
	$.ajax({
	    url:"/admin/novice/product/config.do",
	    type:"get",
	    beforeSend:beforeSend(),
	    success:function(json){
		    if(json.message == "成功"){
		    	var datas = json.data;
		    	if(datas && datas.length){
		    		for(var i=0;i<datas.length;i++){
		    			var $eq = datas[i].index;//排序号
		    			if(datas[i].productDetail.productAdAttr == '1'){
		    				var $adAttr = '购买商品';
		    			}else if(datas[i].productDetail.productAdAttr == '2'){
		    				var $adAttr = '广告商品';
	    				}else if(datas[i].productDetail.productAdAttr == '3'){
		    				var $adAttr = '充值商品';
		    			}else{
		    				var $adAttr = '';
		    			}
			    		$('#htmlWrap').find('.posShortName').eq($eq-1).html(datas[i].productDetail.fullName);
			    		$('#htmlWrap').find('.posShortName').eq($eq-1).attr('data-id',datas[i].productId);
			    		$('#htmlWrap').find('.posLogoImg').eq($eq-1).empty().append('<img src="' + datas[i].productDetail.listImage + '" style="width: 110px;height: 80px;" alt="" />');
			    		$('#htmlWrap').find('.posCreatTime').eq($eq-1).html(datas[i].productDetail.updateTime);
			    		$('#htmlWrap').find('.posPrice').eq($eq-1).html(datas[i].productDetail.retailPrice);
			    		$('#htmlWrap').find('.posTatol').eq($eq-1).html(datas[i].productDetail.productRule.exchangePoints);
			    		$('#htmlWrap').find('.posBase').eq($eq-1).html(datas[i].productDetail.productRule.base);
			    		$('#htmlWrap').find('.posReal').eq($eq-1).html(datas[i].productDetail.soldNumber);
			    		$('#htmlWrap').find('.posNature').eq($eq-1).html($adAttr);
			    		$('#htmlWrap').find('.getGoodsName').eq($eq-1).val(datas[i].productDetail.fullName);
			    	}
		    	}
		    	$('#htmlWrap').find('.rowTr').removeClass('hide');
		    	getSelGoodsList('init','','');
		    }
	    }
	});//ajax
};

//首页推荐位置选择框点击
$('.getGoodsName').on('click',function (){
	$('.selContBox').find('.goodsItems').hide();
	var $this = $(this);
	$this.parents('.selContBox').find('.goodsItems').show();
	
})

//新手推荐位置商品选择
$('.getRecGoodsName').on('click',function (){
	$('.selContBox').find('.recGoodsItems').hide();
	var $this = $(this);
	$this.parents('.selContBox').find('.recGoodsItems').show();
})

//下拉框的取消事件
$('body').on('click',function (e){
	var $e = window.event || e; // 兼容IE7
	var $obj = $($e.srcElement || $e.target);
	if(e.target.className != "goodsItems" && e.target.className.indexOf("getGoodsName") < 0){
		$('.goodsItems').hide();
	}
	if(e.target.className != "recGoodsItems" && e.target.className.indexOf("getRecGoodsName") < 0){
		$('.recGoodsItems').hide();
	}
});

//新手推荐下拉列表商品点击事件
$('body').delegate('.selRecGoodsBox li','click',function (){
	var $this = $(this);
	//被选择的商户的信息
	if($this.attr('data-id') == $this.parents('tr').siblings().find('.posShortName').attr('data-id')){//重复选择
		layer.msg('请勿重复设置同一商品！', {
			time: 2000,
			icon: 2
		});
		return;
	}
	var layLoad = layer.load(2,{shade: 0.6});//加载等待
	var data = [];
	if($this.html() == '请选择商品'){
		if($this.parents('tr').siblings().find('.posShortName').attr('data-id')){
			var $otherId = $this.parents('tr').siblings().find('.posShortName').attr('data-id');//获取兄弟节点的id
			var $otherPos = $this.parents('tr').siblings().find('.posSord').html();//获取兄弟节点的位置
			var dataLis = {index: $otherPos,productId: $otherId};
			data.push(dataLis);
		}
	}else{
		var $dataId = $this.attr('data-id');//商品ID
		var $dataPos = $this.parents('tr').find('.posSord').html();//当前操作的排序位置
		if($this.parents('tr').siblings().find('.posShortName').attr('data-id')){
			var $otherId = $this.parents('tr').siblings().find('.posShortName').attr('data-id');//获取兄弟节点的id
			var $otherPos = $this.parents('tr').siblings().find('.posSord').html();//获取兄弟节点的位置
			var dataLis2 = {index: $otherPos,productId: $otherId};
			data.push(dataLis2);
		}
		var dataLis1 = {index: $dataPos,productId: $dataId};
		data.push(dataLis1);
	}
	$.ajax({
		type: "post",
		dataType: "json",
		url: "/admin/novice/product/config.do",
		data:JSON.stringify(data),
		contentType : "application/json" ,
		beforeSend:beforeSend(),
		success: function(json) {
			layer.close(layLoad);
			if(json.message == "成功") {
				window.location.reload();
			}else{
				layer.msg(json.message);
				window.location.reload();
			}
		},error: function(){
			layer.close(layLoad);
			window.location.reload();
		}
	});//ajax
});
//下拉列表的点击事件
$('body').delegate('.selHomeGoodsBox li','click',function (){
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
		var data = {productId:$dataId,homePageSort:$sord};
		var param = {'$dataName':$dataName,'$dataId':$dataId,'$dataLogo':$dataLogo,'$dataTime':$dataTime,'$dataPrice':$dataPrice,'$dataTatol':$dataTatol,'$dataBase':$dataBase,'$dataReal':$dataReal,'$dataNature':$dataNature};//需要传入的参数变量
		replaceSet($this,data,param);
	}else{
		var data = {productId:$dataId,homePageSort:$sord};
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
//
function replaceSet($this,data,param){//param 函数内需要的变量参数集合
	$.ajax({
		data:data,
	    dataType:"json",
	    url:"/operation/opMerMan/homePageSort",
	    type:"post",
	    beforeSend:beforeSend(),
	    success:function(json){
		    if(json.message == "成功"){
		    	$this.parents('.rowTr').find('.posShortName').html(param.$dataName);
		    	$this.parents('.rowTr').find('.posShortName').attr('data-id',param.$dataId);
				if($this.parents('.rowTr').find('.posLogoImg').find('img').length){
					if(param.$sord == 0){
						$this.parents('.rowTr').find('.posLogoImg').html('');
					}else{
						if(param.$dataLogo && param.$dataLogo != '--'){
							$this.parents('.rowTr').find('.posLogoImg').find('img').attr('src',param.$dataLogo);
						}else{
							$this.parents('.rowTr').find('.posLogoImg').html('');
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
				search('1');
		    }else{
		    	layer.msg(json.message);
			    return;
		    }
		    $this.parents('.rowTr').find('.goodsItems').addClass('hide');
	    },
	    error:function (){
	    	layer.msg('操作失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
	    }
	});//ajax
};

//获取展示位首页列表里 设置商品按钮下的数据
$('body').delegate('#htmlWrap .getGoodsName','keyup',function (){//首页选择输入框搜索事件
	var $this = $(this);
	var thisVal = $this.val()||'';
	getSelGoodsList('search',thisVal,$this);
});
//新手推荐 设置商品按钮下的数据
$('body').delegate('#htmlWrap .getRecGoodsName','keyup',function (){//首页选择输入框搜索事件
	var $this = $(this);
	var thisVal = $this.val()||'';
	getSelGoodsList('search',thisVal,$this);
});
function getSelGoodsList(type,name,$this){//type为渲染方式：init为初始渲染，search为搜索渲染,name为搜索的内容,$this为搜索时操作的节点
	var data = {shortName:name||'',pNo:1,pSize:10000000,status:4,isPackage:false};
	$.ajax({
		data:data,
	    dataType:"json",
	    url:"/operation/opMerMan/upDownLists",
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
		    			if(getQueryString("location") == 3){
		    				$('.recGoodsItems').eq(j).find('.selRecGoodsBox').empty().append(str);
		    			}else{
		    				$('.goodsItems').eq(j).find('.selGoodsBox').empty().append(str);
		    			}
		    			$('.goodsItems').eq(j).find('.selGoodsBox').empty().append(str);
		    			str = '<li value="0" data-id="--" data-name="" data-img="--" data-price="--" data-tatol="--" data-base="--"' + 
		    			'data-real="--" data-time="--" data-nature="--">请选择商品</li>';
		    		}
		    	}else{
		    		if(type == 'search'){
		    			if(getQueryString("location") == 3){
		    				$this.parents('.selContBox').find('.recGoodsItems').find('.selRecGoodsBox').empty().append('<div onclick="null" style="color:#c3c3c3">无匹配项</div>');
		    			}else{
		    				$this.parents('.selContBox').find('.goodsItems').find('.selGoodsBox').empty().append('<div onclick="null" style="color:#c3c3c3">无匹配项</div>');
		    			}
		    		}
		    	}
		    }
	    }
	});//ajax
};

$('#searchBtn').on('click', function (){//查询
	var layLoad = layer.load(2,{
		shade: 0.6
	});//加载等待
	search('1');
});
//查询
var search = function(pn) {
	var $starTimes = $('#LAY_demorange_s').val()||'';//开始时间
	var $endTimes = $('#LAY_demorange_e').val()||'';//截止时间
	var $shortName = $("#shortName").val()||'';
	var productAdAttr = $('.productAdAttr').attr('data-productAdAttr')||'';
	if(productAdAttr == '0'){
		productAdAttr = '';
	}
	var pageNo = $("#paging").attr("data-page-no");
	var pageSize = $("#paging").attr("data-page-size");
	var location = $(".chooseType").find(".layui-this").attr("data-location");
	window.location.search="?productAdAttr="+escape(productAdAttr)+"&shortName=" + escape($shortName) + "&location="+escape(location)+"&pSize="+escape(pageSize)+"&pNo="+escape(pn)+
	"&stDate="+escape($starTimes)+"&enDate="+escape($endTimes);
}
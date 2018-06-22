"use strict";
layui.use(['element', 'form'], function() {
	//在售商品 充值商品设置/编辑
	var form = layui.form(),
		layer = layui.layer,
		$ = layui.jquery;	
	
	//切换充值商家的请求
	form.on('radio(scaleFilter)', function(data){
		if(data.value == '1'){//话费
			$('.hfScale').removeClass('hide');
			$('.llScale').addClass('hide');
		}else{//流量
			$('.hfScale').addClass('hide');
			$('.llScale').removeClass('hide');
		}
	});  
	var curGoodsImg = "",		//单个点击商品列表图
		goodsId = "",			//保存到草稿箱后会生成id;
		merchantId = "",		//商户id
		productId = getQueryString('productId');
	var pay;
	
	var layLoad;
	//保存数据
	$(".setMessage").on("click", function() {
		layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		saveUpFn('save');
	});
	//保存调用ajax
	function ajaxSave(datas,urls){
		$.ajax({
			type: "post",
			dataType: "json",
			url: urls,
			data:JSON.stringify(datas),
			contentType : "application/json" ,
			beforeSend:beforeSend(),
			success: function(json) {
				$('.setMessage').removeAttr('disabled');
				layer.close(layLoad);
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						// &online=true&oSave=true   
						//online：在售商品直接编辑3种类型的商品(只有保存按钮，没有上架按钮)，oSave：在售商品二次编辑CPS(只有保存按钮，没有上架按钮)
						window.location.href = "/operation/opMerMan/merManRefer";
					});
				}else{
					layer.msg(json.message, {
						time: 1000, //1s后自动关闭
						icon: 2
					});
					$('.notClickBtn').addClass('hide');
					return false;
				}
			},
			error: function(error) {
				layer.close(layLoad);
				layer.msg('保存失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				$('.notClickBtn').addClass('hide');
				return false;
			}
		});//ajax请求
	}
	//保存&上架提取方法
	function saveUpFn(type){//type 区分保存/上架
		var saleBase = $(".saleBase").val();//已售基数
		if(getAskScales() && getAllLays()){
			var data = {
				"id":productId,
				"tMerchantSendRatioList":getAskScales(),
				"rechargeProductSizeList":getAllLays()
			};
		}else{
			if(layLoad){
				layer.close(layLoad);
			}
			return;
		}
		var $val = $('.goodsLabel').val() || '';//商品标签
		var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{0,4}$/;
		if($val && reg.test($val)){
			data.tag = $val;
		}else{
			if($val && !reg.test($val)){
				if(layLoad){
					layer.close(layLoad);
				}
				return;
			}
		}
		var $ruleId = $(".setMessage").attr("data-ruleId");
		data.productRule = {"base":saleBase,"id":$ruleId};
		var $urls = "/admin/operating/recharge/product/update.do";//二次编辑
		$('.notClickBtn').removeClass('hide');
		ajaxSave(data,$urls);
	};
	//获取商家请求比例
	function getAskScales(){
		var $scalesVal = $('.askVerify');
		var askArrList = [];
		for(var i=0;i<$scalesVal.length;i++){
			if(!$scalesVal.eq(i).val()){
				$('.tooltip-btnsAsk').removeClass('hide');
				if(layLoad){
					layer.close(layLoad);
				}
				return false;
			}else{
				var editorId = $scalesVal.eq(i).attr('data-id')||'';
				if($scalesVal.eq(i).parents('.scalesBox').hasClass('hfScale')){//话费下的配置
					if($scalesVal.eq(i).attr('data-name') == '19e'){
						if(!editorId){//初次设置，不需要传id
							var scalBox = {"merchanEname":"19e","ratio":$scalesVal.eq(i).val(),"rechargeType":"1"};
						}else{//二次编辑，需要传id
							var scalBox = {"id":editorId,"merchanEname":"19e","ratio":$scalesVal.eq(i).val(),"rechargeType":"1"};
						}
					}else{
						if(!editorId){//初次设置，不需要传id
							var scalBox = {"merchanEname":"ofpay","ratio":$scalesVal.eq(i).val(),"rechargeType":"1"};
						}else{//二次编辑，需要传id
							var scalBox = {"id":editorId,"merchanEname":"ofpay","ratio":$scalesVal.eq(i).val(),"rechargeType":"1"};
						}
					}
				}else{//流量下的配置
					if($scalesVal.eq(i).attr('data-name') == '19e'){
						if(!editorId){//初次设置，不需要传id
							var scalBox = {"merchanEname":"19e","ratio":$scalesVal.eq(i).val(),"rechargeType":"2"};
						}else{//二次编辑，需要传id
							var scalBox = {"id":editorId,"merchanEname":"19e","ratio":$scalesVal.eq(i).val(),"rechargeType":"2"};
						}
					}else{
						if(!editorId){//初次设置，不需要传id
							var scalBox = {"merchanEname":"ofpay","ratio":$scalesVal.eq(i).val(),"rechargeType":"2"};
						}else{//二次编辑，需要传id
							var scalBox = {"id":editorId,"merchanEname":"ofpay","ratio":$scalesVal.eq(i).val(),"rechargeType":"2"};
						}
					}
				}
				askArrList.push(scalBox);
			}
		}
		return askArrList;
	}
	//验证话费/流量添加的配置项是否都填写
	function getAllLays(){//tooltip-flowIntal
		var $rechargeProductSizeList = [];//存放话费和流量的配置项
		var tariffeLen = $('.tariffeContents').find('.tooltip-tariffe');//话费金额验证提示
		var tariffeIntalLen = $('.tariffeContents').find('.tooltip-tariffeIntal');//话费积分验证提示
		var flowLen = $('.flowContents').find('.tooltip-flow');//流量额度验证提示
		var flowIntalLen = $('.flowContents').find('.tooltip-flowIntal');//流量积分验证提示
		var flowPIdLen = $('.flowContents').find('.tooltip-flowPId');//流量产品ID验证提示
		
		var tariffeContentLis = $('body').find('.tariffeContentLis');
		for(var i=0;i<tariffeContentLis.length;i++){
			var tariffeJson = {};
			tariffeJson.rechargeType = '1';
			tariffeJson.id = $('body').find('.tariffeContentLis').eq(i).find('.tariffeNum').attr('data-id');
			if($('body').find('.tariffeContentLis').eq(i).find('.layui-form-radio').eq(0).hasClass('layui-form-radioed')){//正常
				tariffeJson.status = '1';
			}else{//维护
				tariffeJson.status = '0';
			}
			$rechargeProductSizeList.push(tariffeJson);
		}
		var flowTypes = $('.operators').attr('data-flowFilter');//区分是移动/联通/电信
		var flowUN = $('.flowContents').find('.flowUN').find('.flowContentLis');
		var flowCT = $('.flowContents').find('.flowCT').find('.flowContentLis');
		var flowCM = $('.flowContents').find('.flowCM').find('.flowContentLis');
		
		for(var i=0;i<flowUN.length;i++){
			var tariffeJson = {};
			tariffeJson.rechargeType = '2';
			tariffeJson.id = flowUN.eq(i).find('.flowNum').attr('data-id');
			tariffeJson.type = '0';
			if(flowUN.eq(i).find('.layui-form-radio').eq(0).hasClass('layui-form-radioed')){//正常
				tariffeJson.status = '1';
			}else{//维护
				tariffeJson.status = '0';
			}
			$rechargeProductSizeList.push(tariffeJson);
		}
		for(var i=0;i<flowCT.length;i++){
			var tariffeJson = {};
			tariffeJson.rechargeType = '2';
			tariffeJson.id = flowCT.eq(i).find('.flowNum').attr('data-id');
			tariffeJson.type = '2';
			if(flowCT.eq(i).find('.layui-form-radio').eq(0).hasClass('layui-form-radioed')){//正常
				tariffeJson.status = '1';
			}else{//维护
				tariffeJson.status = '0';
			}
			$rechargeProductSizeList.push(tariffeJson);
		}
		for(var i=0;i<flowCM.length;i++){
			var tariffeJson = {};
			tariffeJson.rechargeType = '2';
			tariffeJson.id = flowCM.eq(i).find('.flowNum').attr('data-id');
			tariffeJson.type = '1';
			if(flowCM.eq(i).find('.layui-form-radio').eq(0).hasClass('layui-form-radioed')){//正常
				tariffeJson.status = '1';
			}else{//维护
				tariffeJson.status = '0';
			}
			$rechargeProductSizeList.push(tariffeJson);
		}
		return $rechargeProductSizeList;
	};
	
	//充值类型模块验证
	//充值类型切换
	$(".chooseLays>li").on("click", function() {
		pay = $(this).attr("data-pay");
		$(".chooseLays").attr("data-pay",pay);
		if(pay == '1'){
			$('.selTariffe').removeClass('hide');//话费框
			$('.selFlow').addClass('hide');//流量框
		}else{
			$('.selTariffe').addClass('hide');//话费框
			$('.selFlow').removeClass('hide');//流量框
		}
	});
	
	//流量运营商的切换
	form.on('radio(flowFilter)', function(data){
		$('.operators').attr('data-flowFilter', data.value);
		if(data.value == '0'){
			$('.flowCM').addClass('hide');
			$('.flowUN').removeClass('hide');
			$('.flowCT').addClass('hide');
		}else if(data.value == '2'){
			$('.flowCM').addClass('hide');
			$('.flowUN').addClass('hide');
			$('.flowCT').removeClass('hide');
		}else{
			$('.flowCM').removeClass('hide');
			$('.flowUN').addClass('hide');
			$('.flowCT').addClass('hide');
		}
	});
});
//验证请求比例(保留两位小数)
$('.askVerify').blur(function (){
	var reg = /^[0-9]+(.[0-9]{1,2})?$/;//概率验证（0.01-100）保留2位小数
	var $this = $(this);
	var thisVal = $this.val();
	if(thisVal && reg.test(thisVal) && Number(thisVal) >= 0 && Number(thisVal) <= 100){
		var firstVal = $this.parents('.scalesBox').find('input').eq(0).val();
		var lastVal = $this.parents('.scalesBox').find('input').eq(1).val();
		if(firstVal && lastVal && Number(firstVal)+Number(lastVal)==100){//当前输入的符合条件之后就要验证两项之和是否等于100%
			$('.tooltip-btnsAsk').addClass('hide');
		}else{
			if(!firstVal || !lastVal){
				$('.tooltip-btnsAsk').addClass('hide');
			}else{
				$('.tooltip-btnsAsk').removeClass('hide');
				return false;
			}
		}
	}else{//不符合
		$('.tooltip-btnsAsk').removeClass('hide');
		return false;
	}
});
//验证商品标签
$('.goodsLabel').blur(function (){
	var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{0,4}$/;
	var $val = $(this).val();
	if(reg.test($val)){
		$('.tooltip-btnsLabel').addClass('hide');
	}else{
		$('.tooltip-btnsLabel').removeClass('hide');
		return false;
	}
});
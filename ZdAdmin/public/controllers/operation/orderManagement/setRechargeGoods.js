"use strict";
layui.use(['element', 'form'], function() {
	//购买商品设置/编辑
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
	var delHFArr = [];//存放话费下删除的配置
	var delCMArr = [];//存放移动流量下删除的配置
	var delUNArr = [];//存放联通流量下删除的配置
	var delCTArr = [];//存放电信流量下删除的配置
	
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
				layer.close(layLoad);
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						// &online=true&oSave=true   
						//online：在售商品直接编辑3种类型的商品(只有保存按钮，没有上架按钮)，oSave：在售商品二次编辑CPS(只有保存按钮，没有上架按钮)
						if(getQueryString('online') || getQueryString('oSave')){
							window.location.href = "/operation/opMerMan/merManRefer";
						}else{
							window.location.href = "/operation/opMerMan/upDownList";
						}
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
	//上架
	$(".slaves").on("click", function() {
		layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		saveUpFn('slaves');	
	})
	//上架ajax方法
	function ajaxSlave(datas,urls){
		$.ajax({
			type: "post",
			dataType: "json",
			url: urls,
			data:JSON.stringify(datas),
			contentType : "application/json" ,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					var data = {
						"status":4,
						"productId":productId
					} 
					$.ajax({
						type: "post",
						dataType: "json",
						url: "/operation/opMerMan/slaves",
						data: data,
						beforeSend:beforeSend(),
						success: function(json) {
							if(layLoad){
								layer.close(layLoad);
							}
							if(json.message == "成功") {
								layer.msg('上架成功！', {
									time: 1000, //1s后自动关闭
									icon: 1
								},function(){
									window.location.href = "/operation/opMerMan/upDownList";
								});
							}else{
								layer.msg(json.message, {
									time: 1000, //1s后自动关闭
									icon: 2
								});
								return false;
							}
						},
						error: function() {
							layer.msg('上架失败！', {
								time: 1000, //1s后自动关闭
								icon: 2
							});
							$('.notClickBtn').addClass('hide'); 
							return false;
						}
					})
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
				if(layLoad){
					layer.close(layLoad);
				}
				layer.msg('操作失败！', {
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
		var reg = new RegExp("^[0-9]*$");	
		if(!saleBase || !reg.test(saleBase)){
			$(".tooltip-saleBase").removeClass('hide');
			if(layLoad){
				layer.close(layLoad);
			}
			return;
		}
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
		var $flowPlimit = $('.flowPlimit');//欧飞面额验证是否符合标准
		var reg = /^([1-4][0-9]{2}|500|[1-9]?[0-9])$/;
		for(var i=0;i<$flowPlimit.length;i++){
			if(Number($flowPlimit.eq(i).val())>0 && reg.test($flowPlimit.eq(i).val())){}
			else{
				if(layLoad){
					layer.close(layLoad);
				}
				return;
			}
		}
		if($(".setMessage").attr("data-ruleId")){
			var $ruleId = $(".setMessage").attr("data-ruleId");
			data.productRule = {"base":saleBase,"id":$ruleId};
			var $urls = "/admin/operating/recharge/product/update.do";//二次编辑
		}else{
			var $urls = "/admin/operating/recharge/product/set.do";//初次设置
			data.productRule = {"base":saleBase};
		}
		$('.notClickBtn').removeClass('hide'); 
		if(type == 'save'){
			ajaxSave(data,$urls);
		}else{
			ajaxSlave(data,$urls);
		}
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
				return;
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
		var flowPLimitLen = $('.flowContents').find('.tooltip-flowPlimit');//流量欧飞面额验证提示
		
		var tariffeFlag = true;//话费
		for(var i=0;i<tariffeLen.length;i++){
			if(!tariffeLen.eq(i).hasClass('hide') || !$('.tariffeContents').find('.tariffeNum').eq(i).val()){
				tariffeFlag = false;//有未填项/错误项
			}else if(!tariffeIntalLen.eq(i).hasClass('hide') || !$('.tariffeContents').find('.tariffePoint').eq(i).val()){
				tariffeFlag = false;//有未填项/错误项
			}
		}
		var flowFlag = true;//流量
		for(var i=0;i<flowLen.length;i++){
			if(!flowLen.eq(i).hasClass('hide') || !$('.flowContents').find('.flowNum').eq(i).val()){
				flowFlag = false;//有未填项/错误项(流量额度)
			}else if(!flowIntalLen.eq(i).hasClass('hide') || !$('.flowContents').find('.flowPoint').eq(i).val()){
				flowFlag = false;//有未填项/错误项(对应流量额度的积分消耗)
			}else if(!flowPIdLen.eq(i).hasClass('hide') || !$('.flowContents').find('.flowPId').eq(i).val()){
				flowFlag = false;//有未填项/错误项(产品ID)
			}else if(!flowPLimitLen.eq(i).hasClass('hide') || !$('.flowContents').find('.flowPlimit').eq(i).val()){
				flowFlag = false;//有未填项/错误项(欧飞面额)
			}
		}
		if(!tariffeFlag){
			layer.msg('请完善相关配置项！');
			if(layLoad){
				layer.close(layLoad);
			}
			return;
		}else{
			var tariffeContentLis = $('body').find('.tariffeContentLis');
			for(var i=0;i<tariffeContentLis.length;i++){
				var tariffeJson = {};
				tariffeJson.rechargeType = '1';
				tariffeJson.amount = $('body').find('.tariffeContentLis').eq(i).find('.tariffeNum').val();
				tariffeJson.point = $('body').find('.tariffeContentLis').eq(i).find('.tariffePoint').val();
				if($('body').find('.tariffeContentLis').eq(i).find('.tariffeNum').attr('data-id')){//有id的为原有数据，没有id的为新增数据，新增数据不需要传id
					tariffeJson.id = $('body').find('.tariffeContentLis').eq(i).find('.tariffeNum').attr('data-id');
				}
				tariffeJson.disableType = '1';//该条原始数据没有被删除
				$rechargeProductSizeList.push(tariffeJson);
			}
		}
		if(delHFArr.length){
			for(var j=0;j<delHFArr.length;j++){
				$rechargeProductSizeList.push(delHFArr[j]);
			}
		}
		if(!flowFlag){
			layer.msg('请完善相关配置项！');
			if(layLoad){
				layer.close(layLoad);
			}
			return;
		}else{
			var flowTypes = $('.operators').attr('data-flowFilter');//区分是移动/联通/电信
			var flowUN = $('.flowContents').find('.flowUN').find('.flowContentLis');
			var flowCT = $('.flowContents').find('.flowCT').find('.flowContentLis');
			var flowCM = $('.flowContents').find('.flowCM').find('.flowContentLis');
			
			for(var i=0;i<flowUN.length;i++){
				var tariffeJson = {};
				tariffeJson.rechargeType = '2';
				tariffeJson.flow = flowUN.eq(i).find('.flowNum').val();
				tariffeJson.point = flowUN.eq(i).find('.flowPoint').val();
				tariffeJson.type = '0';
				tariffeJson.ehfProductId = flowUN.eq(i).find('.flowPId').val();
				tariffeJson.amount = flowUN.eq(i).find('.flowPlimit').val();
				if(flowUN.eq(i).find('.flowNum').attr('data-id')){//有id的为原有数据，没有id的为新增数据，新增数据不需要传id
					tariffeJson.id = flowUN.eq(i).find('.flowNum').attr('data-id');
				}
				tariffeJson.disableType = '1';//该条原始数据没有被删除
				$rechargeProductSizeList.push(tariffeJson);
			}
			if(delUNArr.length){
				for(var j=0;j<delUNArr.length;j++){
					$rechargeProductSizeList.push(delUNArr[j]);
				}
			}
			for(var i=0;i<flowCT.length;i++){
				var tariffeJson = {};
				tariffeJson.rechargeType = '2';
				tariffeJson.flow = flowCT.eq(i).find('.flowNum').val();
				tariffeJson.point = flowCT.eq(i).find('.flowPoint').val();
				tariffeJson.type = '2';
				tariffeJson.ehfProductId = flowCT.eq(i).find('.flowPId').val();
				tariffeJson.amount = flowCT.eq(i).find('.flowPlimit').val();
				if(flowCT.eq(i).find('.flowNum').attr('data-id')){//有id的为原有数据，没有id的为新增数据，新增数据不需要传id
					tariffeJson.id = flowCT.eq(i).find('.flowNum').attr('data-id');
				}
				tariffeJson.disableType = '1';//该条原始数据没有被删除
				$rechargeProductSizeList.push(tariffeJson);
			}
			if(delCTArr.length){
				for(var j=0;j<delCTArr.length;j++){
					$rechargeProductSizeList.push(delCTArr[j]);
				}
			}
			for(var i=0;i<flowCM.length;i++){
				var tariffeJson = {};
				tariffeJson.rechargeType = '2';
				tariffeJson.flow = flowCM.eq(i).find('.flowNum').val();
				tariffeJson.point = flowCM.eq(i).find('.flowPoint').val();
				tariffeJson.type = '1';
				tariffeJson.ehfProductId = flowCM.eq(i).find('.flowPId').val();
				tariffeJson.amount = flowCM.eq(i).find('.flowPlimit').val();
				if(flowCM.eq(i).find('.flowNum').attr('data-id')){//有id的为原有数据，没有id的为新增数据，新增数据不需要传id
					tariffeJson.id = flowCM.eq(i).find('.flowNum').attr('data-id');
				}
				tariffeJson.disableType = '1';//该条原始数据没有被删除
				$rechargeProductSizeList.push(tariffeJson);
			}
			if(delCMArr.length){
				for(var j=0;j<delCMArr.length;j++){
					$rechargeProductSizeList.push(delCMArr[j]);
				}
			}
		}
		return $rechargeProductSizeList;
	};

	//已售基数校验
	$('.saleBase').blur(function() { 
		var saleBase = $(this).val();
		 var reg = new RegExp("^[0-9]*$");
		if(!saleBase || !reg.test(saleBase)) {
			$(this).parent().parent().find(".layui-tooltip").removeClass('hide');
		} else {
			$(this).parent().parent().find(".layui-tooltip").addClass('hide');
		}
	});
	
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
	
	//动态创建配置项
	$("body").delegate('.addFariffeBtn','click',function (){//话费充值添加一条配置项
		var tariffeStr = '<div class="tariffeContentLis">' +
						'<input type="text" class="layui-input-inline tariffeNum" placeholder="请输入1-500" style="width: 100px;">' +
						'<span class="fl">(元)　</span><span class="txt-impt fl">*</span><span class="fl">消耗积分：</span>' +
						'<input type="text" class="layui-input-inline tariffePoint" placeholder="请输入消耗积分" style="width: 100px;">' +
				    	'<div class="layui-btn-group">' +
						    '<a class="layui-btn layui-btn-primary layui-btn-small addFariffeBtn" title="添加配置项"><i class="layui-icon"></i></a>' +
						    '<a class="layui-btn layui-btn-primary layui-btn-small delFariffeBtn" title="删除配置项"><i class="layui-icon"></i></a>' +
						'</div>' +
						'<span class="layui-tooltip tooltip-hints tooltip-tariffe hide">请输入1-500以内的整数</span>' +
						'<span class="layui-tooltip tooltip-hints tooltip-tariffeIntal hide">　请输≥0的整数</span>' +
					'</div>';
		$('.tariffeContents').append(tariffeStr);
	});
	$("body").delegate('.delFariffeBtn','click',function (){//话费充值删除一条配置项
		var $this = $(this);
		var delHFJson = {};//存放话费下删除的配置（id和状态）
		if($this.parents('.tariffeContentLis').find('.tariffeNum').attr('data-id')){//
			delHFJson.id = $this.parents('.tariffeContentLis').find('.tariffeNum').attr('data-id');
			delHFJson.disableType = '0';//disableType为1是正常保留数据，为0是删除了原有的数据
			delHFArr.push(delHFJson);
		}
		$this.parents('.tariffeContentLis').remove();
	});
	
	$("body").delegate('.addFlowBtnCM','click',function (){//移动流量充值添加一条配置项
		var flowStr = '<div class="flowContentLis">' +
			    		'<input type="text" class="layui-input-inline flowNum" placeholder="请输入1-11264" style="width: 100px;">' +
			    		'<span class="fl">(M)　</span><span class="txt-impt fl">*</span><span class="fl">消耗积分：</span>' +
			    		'<input type="text" class="layui-input-inline flowPoint" placeholder="请输入消耗积分" style="width: 100px;">' +
				    	'<span class="txt-impt fl"> *</span><span class="fl">19e产品ID：</span>' +
				    	'<input type="text" class="layui-input-inline flowPId" value="" placeholder="请输入产品ID" style="width: 100px;">' +
				    	'<span class="txt-impt fl">*</span><span class="fl">欧飞面额：</span>' +
			    		'<input type="text" class="layui-input-inline flowPlimit" value="" placeholder="请输入面额" style="width: 100px;">' +
				    	'<div class="layui-btn-group">' +
						    '<a class="layui-btn layui-btn-primary layui-btn-small addFlowBtnCM" title="添加配置项"><i class="layui-icon"></i></a>' +
						    '<a class="layui-btn layui-btn-primary layui-btn-small delFlowBtnCM" title="删除配置项"><i class="layui-icon"></i></a>' +
						'</div>' +
						'<span class="layui-tooltip tooltip-hints tooltip-flow hide">请输入1-11264以内的整数</span>' +
						'<span class="layui-tooltip tooltip-hints tooltip-flowIntal hide">　请输≥0的整数</span>' +
						'<span class="layui-tooltip tooltip-hints tooltip-flowPId hide">　请输如产品ID</span>' +
						'<span class="layui-tooltip tooltip-hints tooltip-flowPlimit hide">　请输入1-500以内的整数</span>'
			    	'</div>';
		$('.flowCM').append(flowStr);
	});
	$("body").delegate('.delFlowBtnCM','click',function (){//移动流量充值删除一条配置项
		var $this = $(this);
		var delCMJson = {};//存放移动流量下删除的配置（id和状态）
		if($this.parents('.flowContentLis').find('.flowNum').attr('data-id')){//
			delCMJson.id = $this.parents('.flowContentLis').find('.flowNum').attr('data-id');
			delCMJson.disableType = '0';//disableType为1是正常保留数据，为0是删除了原有的数据
			delCMArr.push(delCMJson);
		}
		$this.parents('.flowContentLis').remove();
	});
	$("body").delegate('.addFlowBtnUN','click',function (){//联通流量充值添加一条配置项
		var flowStr = '<div class="flowContentLis">' +
			    		'<input type="text" class="layui-input-inline flowNum" placeholder="请输入1-11264" style="width: 100px;">' +
			    		'<span class="fl">(M)　</span><span class="txt-impt fl">*</span><span class="fl">消耗积分：</span>' +
			    		'<input type="text" class="layui-input-inline flowPoint" placeholder="请输入消耗积分" style="width: 100px;">' +
				    	'<span class="txt-impt fl"> *</span><span class="fl">19e产品ID：</span>' +
				    	'<input type="text" class="layui-input-inline flowPId" value="" placeholder="请输入产品ID" style="width: 100px;">' +
				    	'<span class="txt-impt fl">*</span><span class="fl">欧飞面额：</span>' +
			    		'<input type="text" class="layui-input-inline flowPlimit" value="" placeholder="请输入面额" style="width: 100px;">' +
				    	'<div class="layui-btn-group">' +
						    '<a class="layui-btn layui-btn-primary layui-btn-small addFlowBtnUN" title="添加配置项"><i class="layui-icon"></i></a>' +
						    '<a class="layui-btn layui-btn-primary layui-btn-small delFlowBtnUN" title="删除配置项"><i class="layui-icon"></i></a>' +
						'</div>' +
						'<span class="layui-tooltip tooltip-hints tooltip-flow hide">请输入1-11264以内的整数</span>' +
						'<span class="layui-tooltip tooltip-hints tooltip-flowIntal hide">　请输≥0的整数</span>' +
						'<span class="layui-tooltip tooltip-hints tooltip-flowPId hide">　请输如产品ID</span>' +
						'<span class="layui-tooltip tooltip-hints tooltip-flowPlimit hide">　请输入1-500以内的整数</span>'
			    	'</div>';
		$('.flowUN').append(flowStr);
	});
	$("body").delegate('.delFlowBtnUN','click',function (){//联通流量充值删除一条配置项
		var $this = $(this);
		var delUNJson = {};//存放联通流量下删除的配置
		if($this.parents('.flowContentLis').find('.flowNum').attr('data-id')){//
			delUNJson.id = $this.parents('.flowContentLis').find('.flowNum').attr('data-id');
			delUNJson.disableType = '0';//disableType为1是正常保留数据，为0是删除了原有的数据
			delUNArr.push(delUNJson);
		}
		$this.parents('.flowContentLis').remove();
	});
	$("body").delegate('.addFlowBtnCT','click',function (){//电信流量充值添加一条配置项
		var flowStr = '<div class="flowContentLis">' +
			    		'<input type="text" class="layui-input-inline flowNum" placeholder="请输入1-11264" style="width: 100px;">' +
			    		'<span class="fl">(M)　</span><span class="txt-impt fl">*</span><span class="fl">消耗积分：</span>' +
			    		'<input type="text" class="layui-input-inline flowPoint" placeholder="请输入消耗积分" style="width: 100px;">' +
				    	'<span class="txt-impt fl"> *</span><span class="fl">19e产品ID：</span>' +
				    	'<input type="text" class="layui-input-inline flowPId" value="" placeholder="请输入产品ID" style="width: 100px;">' +
				    	'<span class="txt-impt fl">*</span><span class="fl">欧飞面额：</span>' +
			    		'<input type="text" class="layui-input-inline flowPlimit" value="" placeholder="请输入面额" style="width: 100px;">' +
				    	'<div class="layui-btn-group">' +
						    '<a class="layui-btn layui-btn-primary layui-btn-small addFlowBtnCT" title="添加配置项"><i class="layui-icon"></i></a>' +
						    '<a class="layui-btn layui-btn-primary layui-btn-small delFlowBtnCT" title="删除配置项"><i class="layui-icon"></i></a>' +
						'</div>' +
						'<span class="layui-tooltip tooltip-hints tooltip-flow hide">请输入1-11264以内的整数</span>' +
						'<span class="layui-tooltip tooltip-hints tooltip-flowIntal hide">　请输≥0的整数</span>' +
						'<span class="layui-tooltip tooltip-hints tooltip-flowPId hide">　请输如产品ID</span>' +
						'<span class="layui-tooltip tooltip-hints tooltip-flowPlimit hide">　请输入1-500以内的整数</span>'
			    	'</div>';
		$('.flowCT').append(flowStr);
	});
	$("body").delegate('.delFlowBtnCT','click',function (){//电信流量充值删除一条配置项
		var $this = $(this);
		var delCTJson = {};//存放电信流量下删除的配置
		if($this.parents('.flowContentLis').find('.flowNum').attr('data-id')){//
			delCTJson.id = $this.parents('.flowContentLis').find('.flowNum').attr('data-id');
			delCTJson.disableType = '0';//disableType为1是正常保留数据，为0是删除了原有的数据
			delCTArr.push(delCTJson);
		}
		$this.parents('.flowContentLis').remove();
	});
	
	//验证话费金额
	$("body").delegate('.tariffeNum','blur',function (){
		var $this = $(this);
		var $val = $this.val();
		var $pointVal = $this.parents('.tariffeContentLis').find('.tariffePoint').val();//当前行的积分值
		var reg = /^([1-4][0-9]{2}|500|[1-9]?[0-9])$/;//话费充值最大500元
		if($val && Number($val)>0 && reg.test($val)){
			if($pointVal && Number($pointVal) < Number($val)*100){
				layer.confirm('消耗积分小于充值额度，是否设置？', {
					btn: ['确认', '取消'] //按钮
				},function (){//确认
					layer.closeAll('dialog'); //关闭信息框 
					$this.parents('.tariffeContentLis').find('.tooltip-tariffe').addClass('hide');
				},function (){//取消
					layer.closeAll('dialog'); //关闭信息框 
					$this.parents('.tariffeContentLis').find('.tooltip-tariffe').addClass('hide');
					$this.val('');
				});
			}else{
				$this.parents('.tariffeContentLis').find('.tooltip-tariffe').addClass('hide');
			}
		}else{
			$this.parents('.tariffeContentLis').find('.tooltip-tariffe').removeClass('hide');
			return false;
		}
	});
	$("body").delegate('.tariffePoint','blur',function (){
		var $this = $(this);
		var $val = $this.val();
		var $moneyVal = $this.parents('.tariffeContentLis').find('.tariffeNum').val();//当前行的话费金额
		var reg = /^[1-9]\d*|0$/;//非负整数
		if($val && reg.test($val)){
			if($moneyVal && Number($moneyVal)*100 > Number($val)){
				layer.confirm('消耗积分小于充值额度，是否设置？', {
					btn: ['确认', '取消'] //按钮
				},function (){//确认
					layer.closeAll('dialog'); //关闭信息框 
					$this.parents('.tariffeContentLis').find('.tooltip-tariffeIntal').addClass('hide');
				},function (){//取消
					layer.closeAll('dialog'); //关闭信息框 
					$this.parents('.tariffeContentLis').find('.tooltip-tariffeIntal').addClass('hide');
					$this.val('');
				});
			}else{
				$this.parents('.tariffeContentLis').find('.tooltip-tariffeIntal').addClass('hide');
			}
		}else{
			$this.parents('.tariffeContentLis').find('.tooltip-tariffeIntal').removeClass('hide');
			return false;
		}
	});
	//验证流量
	$("body").delegate('.flowNum','blur',function (){
		var $this = $(this);
		var $val = $this.val();
		 var reg = /^[1-9]\d*$/;//最大11G流量
		if($val && reg.test($val) && Number($val)<=11264){
			$this.parents('.flowContentLis').find('.tooltip-flow').addClass('hide');
		}else{
			$this.parents('.flowContentLis').find('.tooltip-flow').removeClass('hide');
			return;
		}
	});
	$("body").delegate('.flowPoint','blur',function (){
		var $this = $(this);
		var $val = $this.val();
		var reg = /^[1-9]\d*|0$/;//非负整数
		if($val && reg.test($val)){
			$this.parents('.flowContentLis').find('.tooltip-flowIntal').addClass('hide');
		}else{
			$this.parents('.flowContentLis').find('.tooltip-flowIntal').removeClass('hide');
			return;
		}
	});
	//验证流量产品ID 
	$("body").delegate('.flowPId','blur',function (){
		var $this = $(this);
		var $val = $this.val();
//		var reg = /^[1-9]\d*|0$/;//非负整数
		if($val){
			$this.parents('.flowContentLis').find('.tooltip-flowPId').addClass('hide');
		}else{
			$this.parents('.flowContentLis').find('.tooltip-flowPId').removeClass('hide');
			return;
		}
	});
});
//验证商品标签
$('.goodsLabel').blur(function (){
	var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{0,4}$/;
	var $val = $(this).val();
	if(reg.test($val)){
		$('.tooltip-btnsLabel').addClass('hide');
	}else{
		$('.tooltip-btnsLabel').removeClass('hide');
		return;
	}
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
				return;
			}
		}
	}else{//不符合
		$('.tooltip-btnsAsk').removeClass('hide');
		return;
	}
});
//验证欧飞面额
$("body").delegate('.flowPlimit','blur',function (){
	var reg = /^([1-4][0-9]{2}|500|[1-9]?[0-9])$/;
	var $val = $(this).val();
	var $this = $(this);
	if($val){
		if(Number($val)>0 && reg.test($val)){
			$this.parents('.flowContentLis').find('.tooltip-flowPlimit').addClass('hide');
		}else{
			$this.parents('.flowContentLis').find('.tooltip-flowPlimit').removeClass('hide');
			return;
		}
	}else{
		$this.parents('.flowContentLis').find('.tooltip-flowPlimit').removeClass('hide');
		return;
	}
});
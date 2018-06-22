"use strict";
layui.use(['element', 'form', 'layedit', 'laydate', 'upload'], function() {
	//购买商品设置/编辑
	var form = layui.form(),
		layer = layui.layer,
		laydate = layui.laydate;
	$ = layui.jquery;	
	
	var curGoodsImg = "",		//单个点击商品列表图
		goodsId = "",			//保存到草稿箱后会生成id;
		merchantId = "",		//商户id
		_url = window.location.href,
		productId = _url.split("productId=")[1];		//推荐信息
	
	//保存数据
	$(".setMessage").on("click", function() {
		saveUpFn('save');
		//ajaxSave(data);//调用保存方法
	});
	//保存调用ajax
	function ajaxSave(datas,urls){
		$.ajax({
			type: "post",
			dataType: "json",
			url: urls,
			data: datas,
			beforeSend:beforeSend(),
			success: function(json) {
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
					return false;
				}
			},
			error: function() {
				layer.msg('保存失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				return false;
			}
		});//ajax请求
	}
	//上架
	$(".slaves").on("click", function() {
		saveUpFn('slaves');	
		//ajaxSlave(data);//调用上架方法
	})
	//上架ajax方法
	function ajaxSlave(datas,urls){
		$.ajax({
			type: "post",
			dataType: "json",
			url: urls,
			data: datas,
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
							return false;
						}
					})
				}else{
					layer.msg(json.message, {
						time: 1000, //1s后自动关闭
						icon: 2
					});
					return false;
				}
			},
			error: function() {
				layer.msg('操作失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				
			}
		});//ajax请求
	}
	//保存&上架提取方法
	function saveUpFn(type){//type 区分保存/上架
		var saleBase = $(".saleBase").val();
		var changeCode = $(".changeCode").val();
		var specialGoods = $('.selSpecialBtn').find('.layui-form-checkbox').hasClass('layui-form-checked');//看是否勾选了特价商品
		var reg = new RegExp("^[0-9]*$");	
		var retail_price = $(".retail_price").attr("data-price");
		var goodsTag = $('.goodsLabel').val()||'';//商品标签
		if(!saleBase || !reg.test(saleBase)){
			$(".tooltip-saleBase").removeClass('hide');
			return;
		}
		if(!changeCode || !reg.test(changeCode)){
			$(".tooltip-changeCode").removeClass('hide');
			return;
		}
		var data = {
			"productId":productId,
			"base":saleBase
		};
		if(goodsTag){//添加商品标签
			var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{0,4}$/;
			if(reg.test(goodsTag)){
				$('.tooltip-btnsLabel').addClass('hide');
				data.tag = goodsTag;
			}else{
				$('.tooltip-btnsLabel').removeClass('hide');
				return false;
			}
		}
		if(specialGoods){//是否选择了特价商品
			data.specialOfferFlag = true;
		}else{
			data.specialOfferFlag = false;
		}
		if($(".setMessage").attr("data-ruleId")){
			data.ruleId = $(".setMessage").attr("data-ruleId");
			if(getQueryString('online')){
				var $urls = "/admin/product/on/sale/edit.do";//线上编辑
			}else{
				var $urls = "/operation/opMerMan/updategoodSet";//二次编辑
			}
		}else{
			var $urls = "/operation/opMerMan/goodSet";//初次设置
		}
		if(Number(changeCode)/100 < Number(retail_price)){
			layer.confirm('该积分少于零售价，是否设置？', {
				btn: ['确认', '取消'] //按钮
			}, function(index) {
				layer.close(index);
				data.exchangePoints = changeCode;
				if(type == 'save'){
					ajaxSave(data,$urls);
				}else{
					ajaxSlave(data,$urls);
				}
			}, function(){
				if(!getQueryString('online')){
					$(".changeCode").val("");
				  	return;
				}
			})
		}else{
			data.exchangePoints = changeCode;
			if(type == 'save'){
				ajaxSave(data,$urls);
			}else{
				ajaxSlave(data,$urls);
			}
		}
	};
});
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
//兑换积分校验
$('.changeCode').blur(function() { 
	var changeCode = $(this).val();
	 var reg = new RegExp("^[0-9]*$");
	if(!changeCode || !reg.test(changeCode)) {
		$(this).parent().parent().find(".layui-tooltip").removeClass('hide');
	} else {
		$(this).parent().parent().find(".layui-tooltip").addClass('hide');
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
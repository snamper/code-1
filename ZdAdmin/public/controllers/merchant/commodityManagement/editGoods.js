"use strict";
layui.use(['element', 'form', 'layedit', 'laydate', 'upload'], function() {
	$($('.firstPage .course_nr2 li')[0]).find('.shiji').slideDown();
	var form = layui.form(),
		layer = layui.layer,
		laydate = layui.laydate;
	$ = layui.jquery;
	var _url = window.location.href,
		goodsId = _url.split("?productId=")[1],
		goodsCateList1 = [],
		goodsCateList = [];
	var curGoodsImg = "",		//单个点击商品列表图
		merchantId = $(".selectChoose").attr("data-id");
	//下一页
	$(".nextPage").on("click", function() {
		var $nextPage = $(this).attr("data-nextPage");
		
		if($nextPage == 2) {
			saveFirstMessage()
		} else if($nextPage == 3) {
			saveSecMessage()
		}
	})
	//上一步
	$(".prePage").on("click", function() {
		var $prePage = $(this).attr("data-prePage");
		$('.course_nr2 li').find('.shiji').slideUp();
		if($prePage == 1 || $(".goods_type").attr("data-productAdAttr") != 1) { //返回第一步
			$(".firstPage").removeClass("hide").siblings().addClass("hide")
			$($('.firstPage .course_nr2 li')[0]).find('.shiji').slideDown();
		} else if($prePage == 2) { //返回第二步
			$(".secondPage").removeClass("hide").siblings().addClass("hide")
			$($('.secondPage .course_nr2 li')[1]).find('.shiji').slideDown();
		}
	})
	//上传事件传递
	$("#asImportCode").click(function(){	//商品列表     
		 $(".uploadLogo").trigger("click");
	});
	$("#asImportDetail").click(function(){	//商品详情  
		 $(".goodsDetail").trigger("click");
	});

	//更新单个图片
	$("body").delegate(".goodsDetailImg","click",function(){
		$(".goodsDetail").trigger("click");
		 curGoodsImg = $(this).attr("src");	//记录要替换的原路径
	});
	//判断图片多少张
	if($('.goodsImgShow').find('li').length && $('.goodsImgShow').find('li').length > 3) {
		onOffShowImgBtn();
	} else {
		$('.hoverClickBtn').addClass('hide');
	}
	//商品列表上传
	$(".uploadLogo").change(function(){
		var fs = new FormData();
		fs.append("resultType",1);
		fs.append("imageFile",$(".uploadLogo")[0].files[0]);
		var layLoad = layer.load(2,{
				shade: 0.6
			});//加载等待
		if($(".uploadLogo")[0].files[0]){
		 	$.ajax({
				url:'/admin/file/image/upload.do', //上传接口	
				type:"post",
				dataType:"json",
				data:fs,
				processData: false,  // 告诉jQuery不要去处理发送的数据
				contentType: false,
				cache: false,              
				success:function(json){	
					layer.close(layLoad)
					if(json.message == "成功"){
						$("#uploadLogoShow").attr("src",json.data.httpsPath)
						$("#uploadLogoShow").attr("data-url",json.data.httpsPath)
						$(".tooltip-uploadLogo").hide()
						layer.msg("上传成功");
					}else{
						layer.msg(json.message+"，请重新上传！");
					}
				}
	    	});		 	
		}		
	})
	var goodsDetailImgList = [];
	if($("#goodsImgShow").attr("data-list")){
		var goodsImgList = $("#goodsImgShow li img")
		for(var i = 0; i < goodsImgList.length; i++){
			var message = {
				imageOrder:$($(goodsImgList)[i]).attr("data-imageOrder"),
				imageUrl:$($(goodsImgList)[i]).attr("src")
			};
			goodsDetailImgList.push(message)
		}
		console.log(goodsDetailImgList)
	}
	//渲染商品详情图列表
	var showGoodsDetailList = function() {
		var html = "";
		for(var i = 0; i < goodsDetailImgList.length; i++){
			html += '<li class="uploadImgItem left" >' +
						'<img src='+goodsDetailImgList[i].imageUrl+' alt="" class="uploadImage goodsDetailImg"/>' +
						'<div style="margin-top: 5px;">'+
							'<input type="text" class="goods_Img" style="float: left;width: 60px;" value='+goodsDetailImgList[i].imageOrder+' >'+
							'<a class="layui-btn layui-btn-mini layui-btn-danger delGoodsImg" data-index='+i+' style="float: left;margin-left: 10px;">删除</a>'+
						'</div>'+
						'<span class="layui-tooltip tooltip-imageOrder hide" style="line-height: 20px;margin-left: 10px;">只能输入数字</span>'+
					'</li>'				
		}
		$("#goodsImgShow").empty().append(html)
		if($('.goodsImgShow').find('li').length > 3) {
			onOffShowImgBtn();
		} else {
			$('.hoverClickBtn').addClass('hide');
		}
	}
	//删除商品图片
	$(document).on("click",".delGoodsImg",function(){
		var index = $(this).attr("data-index")
		console.log(goodsDetailImgList)
		goodsDetailImgList.splice(index,1)
		console.log(goodsDetailImgList)
		showGoodsDetailList()
		$(".goodsDetail").val("")
	});
	//商品详情图上传
	$(".goodsDetail").change(function(){
		if(goodsDetailImgList.length >= 5 && !curGoodsImg){
			layer.msg("商品详情图最多上传5张！");
			return;
		}
		var fs = new FormData();
		fs.append("imageFile",$(".goodsDetail")[0].files[0]);
		
		if($(".goodsDetail")[0].files[0]){
			var layLoad = layer.load(2,{
				shade: 0.6
			});//加载等待
		 	$.ajax({
				url:'/admin/file/image/upload.do', //上传接口	
				type:"post",
				dataType:"json",
				data:fs,
				processData: false,  // 告诉jQuery不要去处理发送的数据
				contentType: false,
				cache: false,              
				success:function(json){	
					$(".goodsDetail").val("")
					layer.close(layLoad)
					if(json.message == "成功"){
						var imgData = json.data.httpsPath;
						if(curGoodsImg){
							for(var i = 0; i < goodsDetailImgList.length; i++){
								if(goodsDetailImgList[i].httpsPath == curGoodsImg){
									var message = {
										imageOrder:"",
										imageUrl:json.data.httpsPath
									}
									goodsDetailImgList.splice(i,1,message);
									curGoodsImg = ""
								}
							}
						}else{
							var message = {
								imageOrder:"",
								imageUrl:json.data.httpsPath
							}
							goodsDetailImgList.push(message)
						}
						$(".tooltip-goodsDetail").hide()
						showGoodsDetailList()
						layer.msg("上传成功");
					}else{
						layer.msg(json.message+"，请重新上传！");
					}
				}
	    	});		 	
		}		
	})
	
	//获取所有商户
	var getALLTenant = function() {
		$.ajax({
			url:'/merchant/cmdMan/getTenant', //上传接口	
			type:"post",
			dataType:"json",        
			success:function(json){		
				if(json.message == "成功"){
					var html = '<option value="">选择商户</option>';
					for(var i = 0; i < json.data.length; i++){
						if(merchantId == json.data[i].id){
							html += '<option selected="true" value=' + json.data[i].id + '>' + json.data[i].short_name + '</option>'
						}else{
							html += '<option value=' + json.data[i].id + '>' + json.data[i].short_name + '</option>'
						}
					}
					$(".selectChoose").empty().append(html)
					form.render('select')
				}
			}
    	});		 	
	}
	getALLTenant()
	//商户选择
	form.on('select(short_name)', function(data){
		merchantId = data.value;
		$(".tooltip-short_name").hide()
	});
	//商品分类选择
	var productSortId = $(".goods_cate").attr("data-id"),
		productSortId2 = $(".goods_cate_second").attr("data-id");
	form.on('select(goods_cate)', function(data){
		productSortId = data.value;
//		alert(productSortId)
		productSortId2 = "";
		var html1 = '<option value="">请选择二级分类</option>';
		console.log(goodsCateList1,productSortId)
		for(var n = 0; n < goodsCateList1.length; n++){
			if(goodsCateList1[n].sortType == 2 && goodsCateList1[n].fid == productSortId){
				html1 += '<option value='+ goodsCateList1[n].id +'>'+ goodsCateList1[n].sortName +'</option>'
			}
		}
			
		$(".goods_cate_second").empty().append(html1);
		form.render('select');
		$(".tooltip-goods_cate").hide()
		$(".goods_cate").attr("data-id",productSortId)
	});
	form.on('select(goods_cate_second)', function(data){
		productSortId2 = data.value;
		$(".goods_cate_second").attr("data-id",productSortId2)
	});
	//广告商品属性选择
	var productAdAttr = $(".goods_type").attr("data-productAdAttr")
	form.on('select(goods_type)', function(data){
		productAdAttr = data.value;
	});
	//是否允许高风险用户购买
	var risk = $(".risk").attr("data-risk");
	form.on('radio(risk)', function(data){
		risk = data.value;
	});
	//是否需要兑换码
	var hasExchangeCode = $(".hasExchangeCode").attr("data-hasExchangeCode")
	form.on('radio(hasExchangeCode)', function(data){
		hasExchangeCode = data.value;
	});
	//保存基本信息
	var saveFirstMessage = function() {
		var detailImageStr = "",goodsTag = "", mrssage="";
		if($(".uploadImgItem") && $(".uploadImgItem").length > 0 && productAdAttr != 3){
			goodsDetailImgList = []
			for(var i = 0; i < $(".uploadImgItem").length; i++){
				goodsDetailImgList.push({
					imageOrder:$($(".uploadImgItem")[i]).find("input").val(),
					imageUrl:$($(".uploadImgItem")[i]).find("img").attr("src")
				})
				if(!$($(".uploadImgItem")[i]).find("input").check().notNull()){
					$($(".uploadImgItem")[i]).find(".tooltip-imageOrder").hide()
				}else{
					if(!$($(".uploadImgItem")[i]).find("input").check().isNum()){
						message = "只能输入数字"
						$($(".uploadImgItem")[i]).find(".tooltip-imageOrder").html(message).show()
						return
					}else{
						if(!$($(".uploadImgItem")[i]).find("input").check().integer()){
							message = "只能输入整数"
							$($(".uploadImgItem")[i]).find(".tooltip-imageOrder").html(message).show()
							return
						}
					}
				}
			}
		}
		
		
		var data = {
			"id":goodsId,
			"merchantId":merchantId,
			"fullName":$(".fullName").val(),
			"listImage":$("#uploadLogoShow").attr("data-url"),
			"productAdAttr":productAdAttr,
			"productSortId":productSortId,
			"riskBuyAllowed":risk,
			"productDescribe":$(".productDescribe").val(),
		}
		if(productSortId2)  data.productSortId2 = productSortId2;
		if(productSortId2 && !productSortId) {
			$(".tooltip-goods_cate").show()
			return;
		}
		if(productAdAttr != 3) data.detailImages = goodsDetailImgList
		if(!data.merchantId){
			layer.msg("请选择商户！");
			return;
		}
		if(!$(".fullName").check().number(1,15)){
			$(".tooltip-fullName").show()
			return;
		}
//		if(pattern.test($(".goodsTag").val())){
//		    $(".tooltip-goodsTag").show()
//		    return;
//		}
		if(!data.listImage){
			$(".tooltip-uploadLogo").show()
			return;
		}
		if(productAdAttr != 3 && !data.detailImages){
			$(".tooltip-goodsDetail").show()
			return;
		}
		if(!$(".productDescribe").check().number(0,300)){
			$(".tooltip-productDescribe").show()
			return;
		}
		$.ajax({
			type: "post",
			dataType: "json",
			contentType: "application/json",
			url: "/admin/product/info/edit.do",
			data: JSON.stringify(data),
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 500, //1s后自动关闭
						icon: 1
					},function(){
						if(productAdAttr == 1){
							$('.course_nr2 li').find('.shiji').slideUp();
							$(".secondPage").removeClass("hide").siblings().addClass("hide")
							$($('.secondPage .course_nr2 li')[1]).find('.shiji').slideDown();
						}else{
							$('.course_nr2 li').find('.shiji').slideUp();
							$(".thirdPage").removeClass("hide").siblings().addClass("hide")
							$($('.thirdPage .course_nr2 li')[2]).find('.shiji').slideDown();
						}
						
					});
				}else{
					layer.msg(json.message)
					$(".firstPage").removeClass("hide").siblings().addClass("hide")
					$($('.firstPage .course_nr2 li')[0]).find('.shiji').slideDown();
				}
			},
			error: function() {
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	}

	 
	//设置进货信息
	var saveSecMessage = function() {
		var retailPrice = $(".retailPrice").val()	//零售价
		var costPrice = $(".costPrice").val();	//成本价

		if(!$(".retailPrice").check().number(0,9) || !$(".retailPrice").check().isNum() || !retailPrice){
			$(".tooltip-retailPrice").show();
			return;
		}
		if(costPrice && retailPrice){
			if(Number(costPrice) > Number(retailPrice)){
				layer.confirm('零售价小于成本价，是否设置？', {
					btn: ['确认', '取消'] //按钮
				}, function() {
					saveSecondMessage()
				}, function(index){
				  	return;
				})
			}else{
				saveSecondMessage()
			}
		}
	}
	var saveSecondMessage = function() {
		var retailPrice = $(".retailPrice").val()	//零售价
		var costPrice = $(".costPrice").val();	//成本价
		
		if(!$(".retailPrice").check().number(0,9) || !$(".retailPrice").check().isNum() || !retailPrice){
			$(".tooltip-retailPrice").show();
			return;
		}
		var fs = new FormData();
		fs.append("id",goodsId);
		fs.append("costPrice",costPrice);
		fs.append("retailPrice",retailPrice);
		
	 	$.ajax({
			url:'/admin/product/info/set/stock/edit.do', //上传接口	
			type:"post",
			dataType:"json",
			data:fs,
			processData: false,  // 告诉jQuery不要去处理发送的数据
			contentType: false,
			cache: false,              
			success:function(json){		
				if(json.message == "成功"){
					$('.course_nr2 li').find('.shiji').slideUp();
					$(".thirdPage").removeClass("hide").siblings().addClass("hide")
					$($('.thirdPage .course_nr2 li')[2]).find('.shiji').slideDown();
					layer.msg("保存成功");
				}else if(json.code == 2){
//					layer.msg(json.data);
					$(".tooltip-importCode").show()
					$(".importSuccess").hide()
					$(".secondPage").removeClass("hide").siblings().addClass("hide")
					$($('.secondPage .course_nr2 li')[1]).find('.shiji').slideDown();
				}
			},
			error:function(json){
			}
    	});		
	}
	//监听兑换方式
	var exchangeMethods = $(".exchangeMethods").attr("data-exchangeMethods"),	//兑换方式 
		dataTransfer = $(".showByH5").attr("data-dataTransfer"),		//数据传输形式
		accountType = $(".showByAPI").attr("data-accountType"),		//账号类型 
		exchangeUrl = $(".exchangeUrl").attr("value");		//兑换链接
	form.on('radio(exchangeMethods)', function(data) {
		exchangeMethods = data.value;
		$(".showByH5Link").hide()
		if(exchangeMethods == 2){						//H5
			$(".showByH5").show();
			$(".showByAPI").hide();
			$(".showByH5Link").show()
		}else if(exchangeMethods == 3){					//API
			$(".showByAPI").show();
			$(".showByH5").hide();
		}else{
			$(".showByH5").hide();
			$(".showByAPI").hide();
			$(".showByH5Link").hide()
		}
		$(".layui-exchangeMethods").hide()
	})
	//监听H5链接形式
//	form.on('radio(exchangeH5)', function(data) {
//		dataTransfer = data.value;
//		$(".layui-exchangeH5").hide()
//	})
	//监听商家账号类型
	form.on('radio(exchangeAPI)', function(data) {
		accountType = data.value;
		$(".layui-exchangeAPI").hide()
	})
	//兑换方式
	$(".saveGoodsMessage").on("click", function() {
		if(productAdAttr == 1){
			var data = {
				"productAdAttr":1,
				"id":goodsId,
				"usefulTime":$("#LAY_demorange_s").val(),
				"announcements":$(".announcements").val(),
				"useFlow":$(".useFlow").val(),
				"statement":$(".statement").val(),
				"numberPurchasedIn30Days":$(".numberPurchasedIn30Days").val(),
				"purchaseSucceedsMsg":$(".purchaseSucceedsMsg").val(),
				"exchangeMethods":exchangeMethods
			}
		}else{
			var data = {
				"productAdAttr":2,
				"id":goodsId,
				"usefulTime":$("#LAY_demorange_s").val(),
				"announcements":$(".announcements").val(),
				"useFlow":$(".useFlow").val(),
				"statement":$(".statement").val(),
				"numberPurchasedIn30Days":$(".numberPurchasedIn30Days").val(),
				"purchaseSucceedsMsg":$(".purchaseSucceedsMsg").val(),
				"exchangeMethods":exchangeMethods
			}
		}
		if(productAdAttr == 1){
			if(!exchangeMethods){		//兑换方式
				$(".layui-exchangeMethods").show()
				return;
			}
//			else if(exchangeMethods == 2 && !dataTransfer){	//H5形式,但没有H5链接形式
//				$(".layui-exchangeH5").show()
//				return;
//			}
			else if(exchangeMethods == 3 && !accountType){		//API形式,但没有商家账号类型
				$(".layui-exchangeAPI").show()
				return;
			}else if(exchangeMethods == 2 && !$(".exchangeUrl").val()){	//H5形式,但没有H5链接
				$(".layui-exchangeUrl").show()
				return;
			}
			if(exchangeMethods == 2){
				data.dataTransfer = 2;
				data.hasExchangeCode = hasExchangeCode;
				data.exchangeUrl = $(".exchangeUrl").val();
			}
			if(exchangeMethods == 3){
				data.accountType = accountType;
			}
			if(!$('#LAY_demorange_s').check().date("DATETIME.FULL")) {	
				$(".layui-time").show();
				return;
			} 
			if(!$(".numberPurchasedIn30Days").check().isNum() || !$(".numberPurchasedIn30Days").check().notNull()) {
				$('.layui-numberPurchasedIn30Days').show();
				return;
			}
			if(!$(".purchaseSucceedsMsg").check().number(1,300)) {
				$('.tooltip-purchaseSucceedsMsg').show();
				return
			} 
		}
		
		if(!$(".announcements").check().number(1,300)) {
			$('.tooltip-announcements').show();
			return;
		} 
		if(!$(".useFlow").check().number(1,300)) {
			$('.tooltip-usepro').show();
			return;
		} 
		if(!$(".statement").check().number(1,300)) {
			$('.tooltip-lawInfo').show();
			return;
		}
		
		
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/product/info/exchange.do",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/merchant/cmdMan";
					});
				}else{
					layer.msg(json.message)
				}
			},
			error: function() {
				layer.msg('保存失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				
			}
		})
	})
	var start = {
		min: laydate.now(),
		istime: true,
		format: 'YYYY-MM-DD hh:mm:ss',

	};
	//兑换方式（充值商品）
	$(".saveRecharge").on("click", function() {
		$('.numberPurchasedIn30Days1').blur(function() { //30天购买次数
			if(!$(".numberPurchasedIn30Days1").check().isNum() || !$(".numberPurchasedIn30Days1").check().notNull()) {
				$('.layui-numberPurchasedIn30Days1').show();
			} else {
				$('.layui-numberPurchasedIn30Days1').hide();
			}
		});
		if(!$(".rechargeValue").check().number(1,300)) {
			$('.tooltip-rechargeValue').show();
			return;
		} 
		if(!$(".flowRate").check().number(1,300)) {
			$('.tooltip-flowRate').show();
			return;
		}
		var data = {
			"productAdAttr":3,
			"id":goodsId,
			"numberPurchasedIn30Days":$(".numberPurchasedIn30Days1").val(),
			"prepaidRefillMsg":$(".rechargeValue").val(),
			"flowRechargeMsg":$(".flowRate").val()
		}
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/product/info/exchange.do",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/merchant/cmdMan";
					});
				}else{
					layer.msg(json.message)
				}
			},
			error: function() {
				layer.msg('保存失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				
			}
		})
	})
	//商品提交审核
	$(".submitRecharge").on("click", function() {
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$('.numberPurchasedIn30Days1').blur(function() { //30天购买次数
				if(!$(".numberPurchasedIn30Days1").check().isNum() || !$(".numberPurchasedIn30Days1").check().notNull()) {
					$('.layui-numberPurchasedIn30Days1').show();
				} else {
					$('.layui-numberPurchasedIn30Days1').hide();
				}
			});
			if(!$(".rechargeValue").check().number(1,300)) {
				$('.tooltip-rechargeValue').show();
				return;
			} 
			if(!$(".flowRate").check().number(1,300)) {
				$('.tooltip-flowRate').show();
				return;
			}
			var data = {
				"productAdAttr":3,
				"id":goodsId,
				"numberPurchasedIn30Days":$(".numberPurchasedIn30Days1").val(),
				"prepaidRefillMsg":$(".rechargeValue").val(),
				"flowRechargeMsg":$(".flowRate").val()
			}
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/product/info/exchange.do",
				data: data,
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						$.ajax({
							type: "post",
							dataType: "json",
							url: "/merchant/cmdMan/submit",
							data: {
								"id":goodsId
							},
							beforeSend:beforeSend(),
							success: function(json) {
								if(json.message == "成功") {
									layer.msg('提交成功！', {
										time: 1000, //1s后自动关闭
										icon: 1
									},function(){
										window.location.href = "/merchant/cmdMan"
									});
								}else{
									layer.msg(json.message, {
										time: 1500, //1s后自动关闭
										icon: 2
									})
								}
							},
							error: function() {
								layer.msg('提交失败！', {
									time: 1500, //1s后自动关闭
									icon: 2
								});
							}
						})
						
					}else{
						layer.msg(json.message, {
							time: 1500, //1s后自动关闭
							icon: 2
						})
					}
				},
				error: function() {
					layer.msg('提交失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	//获取分类
	var getCateList = function () {
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/product/sort/list.do?pageNo=1&pageSize=100000000",
			beforeSend:beforeSend(),
			success: function(json) {
				console.log(json)
				if(json.message = '成功'){
					goodsCateList = json.data.datas;
					var flag = false;
					if(!goodsCateList || goodsCateList.length <= 0) return;
					var html = '<option value="">请选择一级分类</option>',
						html1 = '<option value="">请选择二级分类</option>'
						
					for(var i = 0; i < goodsCateList.length; i++){
						if($(".goods_cate").attr("data-id") && $(".goods_cate").attr("data-id") == goodsCateList[i].id && goodsCateList[i].sortType == 1){
							html += '<option selected="selected" value='+ goodsCateList[i].id +'>'+ goodsCateList[i].sortName +'</option>'
						}else if(goodsCateList[i].sortType == 1) html += '<option value='+ goodsCateList[i].id +'>'+ goodsCateList[i].sortName +'</option>'
						if(goodsCateList[i].sortType == 2) goodsCateList1.push(goodsCateList[i]);
					}
					for(var n = 0; n < goodsCateList.length; n++){
						if(goodsCateList[n].fid == $(".goods_cate").attr("data-id")){
							if($(".goods_cate_second").attr("data-id") && $(".goods_cate_second").attr("data-id") == goodsCateList[n].id && goodsCateList[n].sortType == 2)
								html1 += '<option selected="selected" value='+ goodsCateList[n].id +'>'+ goodsCateList[n].sortName +'</option>'
							else html1 += '<option value='+ goodsCateList[n].id +'>'+ goodsCateList[n].sortName +'</option>'
						}
						 	
					}
					
					
					$(".goods_cate").empty().append(html);
					$(".goods_cate_second").empty().append(html1);
					form.render('select');
				}
			},
			error:function() {
				
			}
		})
		
	}
	getCateList()
	//判断是否显示左右移动的按钮
	function onOffShowImgBtn1 (){//商品预览详情图切换按钮
		var moveNum = 0;
		$('#previewImg').css('left',0);
		var $moveOffset = $('.goods_view_content').width();
		var timer = setInterval(function (){
			moveNum++;			
			var $liLength = $('#previewImg').find('li').length;
			if(moveNum < $liLength){
				$('#previewImg').css('left',-$moveOffset*moveNum);
			}else{
				moveNum = 0;
				$('#previewImg').css('left',0);
			}
		},2500);
	};
	//商品预览
	$(".openGoodsView").on("click", function() {
		$(".coverScreen").show();
		$(".adverAppView").show();
		$(".view_title h1").html($(".fullName").val());								//商品标题
		$(".view_code i").html("0")													//兑换积分(未到设置页面，没有兑换积分)
		$(".view_times i").html("0")												//已售数量(未到设置页面，没有已售基数)
		$(".view_money i").html($(".retailPrice").val())							//售价
		$(".view_changeCode i").html("0");											//兑换积分
//		$(".goode_view_img img").attr("src",$("#uploadLogoShow").attr("data-url"))	//商品列表图

		var detailImagesStr = ""
		for(var i=0;i<$(".uploadImage").length;i++){
			detailImagesStr += '<li class="pvImgShow left">' +
				'<img src="'+ $($(".uploadImage")[i]).attr("src") +'" class="uploadImage1"/>'
			'</li>';
		}
		$('#previewImg').html(detailImagesStr);
		var previewImgWidth = $('.pvImgShow').width() * $(".uploadImage").length;
		$('#previewImg').width(previewImgWidth);
		if($('#previewImg').find('li').length && $('#previewImg').find('li').length > 1){
//			alert("2")
			onOffShowImgBtn1();
		}else{
			$('#previewImg').css('left',0);
		}
		
		$(".useFulTime").html($("#LAY_demorange_s").val())		//使用有效期
		$(".goode_flow").html($(".useFlow").val())	//使用流程
		$(".goods_law").html($(".statement").val())		//法律声明
		$(".note_message").html($(".announcements").val())	//注意事项
//		if(json.data.productDescribe){	//商品介绍
//			$(".goode_introduce").html($(".productDescribe").val());
//		}else{
//			$(".goode_introduce").html("无");
//		}
})
	
	$(".closeAppView").on("click", function() {
		$(".coverScreen").hide();
		$(".adverAppView").hide();
	})
	if($(".goods_type").attr("data-productAdAttr") == 1){
		document.getElementById('LAY_demorange_s').onclick = function() {
			start.elem = this;
			laydate(start);
		}
	}


	if($('.goodsImgShow').find('li').length && $('.goodsImgShow').find('li').length > 3) {
		onOffShowImgBtn();
	} else {
		$('.hoverClickBtn').addClass('hide');
	}
	//判断是否显示左右移动的按钮
	function onOffShowImgBtn() { //商品详情图切换按钮
		$('.hoverClickBtn').removeClass('hide');
		var moveNum = 0;
		var $moveOffset = $('.uploadImgItem').width() + 20;
		var $liLength = $('.goodsImgShow').find('li').length + 1;
		$('.hoverClickBtnRight').on('click', function() {
			moveNum++;
			if(moveNum <= $liLength % 4) {
				$('.goodsImgShow').css('left', -$moveOffset * moveNum);
			} else if(moveNum > 3) {
				moveNum = 3;
			}
		})
		$('.hoverClickBtnLeft').on('click', function() {
			moveNum--;
			if(moveNum >= 0) {
				$('.goodsImgShow').css('left', -$moveOffset * moveNum);
			} else if(moveNum < 0) {
				moveNum = 0;
			}
		})
	};
	form.on('select(merchantId)', function(data) { //获取下拉列表选中值，并存储到其父元素中
		$('.tooltip-shortName').addClass('hide');
		$(".layui-select-title").attr("data-id", data.value)
			.attr("data-name", data.elem[data.elem.selectedIndex].text);
	});

	
	//输入框正则验证
//	$(".goodsTag").on("blur", function() {
//		var pattern = new RegExp("[`~!@#$^&*()=|{}':;'\\[\\].<>/?~！@#￥%……&*（）——|{}【】‘；：”“'。、？]") ;
//		if(pattern.test($(".goodsTag").val())){
//		    $(".tooltip-goodsTag").show()
//		}else{
//			$(".tooltip-goodsTag").hide()
//		}
//	})
	$(document).on("blur",".goods_Img",function(){
		var message = ""
		if(!$(this).check().notNull()){
			$(this).parent().parent().find(".tooltip-imageOrder").hide()
		}else{
			if(!$(this).check().isNum()){
				message = "只能输入数字"
				$(this).parent().parent().find(".tooltip-imageOrder").html(message).show()
			}else{
				if(!$(this).check().integer()){
					message = "只能输入整数"
					$(this).parent().parent().find(".tooltip-imageOrder").html(message).show()
				}else{
					$(this).parent().parent().find(".tooltip-imageOrder").hide()
				}
				
				
			}
		}
	})
	$(".fullName").on("blur",function() {
		if(!$(".fullName").check().number(1,15)){
			$(".tooltip-fullName").show()
		}else{
			$(".tooltip-fullName").hide()
		}
	})
	$(".productDescribe").on("blur", function() {
		if(!$(".productDescribe").check().number(0,300)){
			$(".tooltip-productDescribe").show()
		}else{
			$(".tooltip-productDescribe").hide()
		}
	})
	$('.costPrice').blur(function() { //商品总价
		if(!$(".costPrice").check().number(1,9) || !$(".productNum").check().isNum()){
			$('.layui-tooltip-costPrice').show();
		}else{
			$('.layui-tooltip-costPrice').hide();
		}
	});
	$(".retailPrice").blur(function() {	//零售价
		if(!$(".retailPrice").check().number(1,9) || !$(".retailPrice").check().isNum()){
			$('.tooltip-retailPrice').removeClass('hide');
			$(".tooltip-retailPrice1").addClass('hide');
		}else{
			$('.tooltip-retailPrice').addClass('hide');
		}
	})

	$('#LAY_demorange_s').blur(function() { //验证有效期
		if($('#LAY_demorange_s').check().date("DATETIME.FULL")) {	
			$('.layui-time').hide();
		} else {
			$('.layui-time').show();
		}
	});
	$('.announcements').blur(function() { //验证注意事项文本
		if(!$(".announcements").check().number(1,300)) {
			$('.tooltip-announcements').show();
		} else {
			$('.tooltip-announcements').hide();
		}
	});
	$('.useFlow').blur(function() { //验证使用流程文本
		if(!$(".useFlow").check().number(1,300)) {
			$('.tooltip-usepro').show();
		} else {
			$('.tooltip-usepro').hide();
		}
	});
	$('.statement').blur(function() { //验证法律声明
		if(!$(".statement").check().number(1,300)) {
			$('.tooltip-lawInfo').show();
		} else {
			$('.tooltip-lawInfo').hide();
		}
	});
	$('.numberPurchasedIn30Days').blur(function() { //30天购买次数
		if(!$(".numberPurchasedIn30Days").check().isNum() || !$(".numberPurchasedIn30Days").check().notNull()) {
			$('.layui-numberPurchasedIn30Days').show();
		} else {
			$('.layui-numberPurchasedIn30Days').hide();
		}
	});
	$('.numberPurchasedIn30Days1').blur(function() { //30天购买次数
		if(!$(".numberPurchasedIn30Days1").check().isNum() || !$(".numberPurchasedIn30Days1").check().notNull()) {
			$('.layui-numberPurchasedIn30Days1').show();
		} else {
			$('.layui-numberPurchasedIn30Days1').hide();
		}
	});
	$('.purchaseSucceedsMsg').blur(function() { //验证法律声明
		if(!$(".purchaseSucceedsMsg").check().number(1,300)) {
			$('.tooltip-purchaseSucceedsMsg').show();
		} else {
			$('.tooltip-purchaseSucceedsMsg').hide();
		}
	});
	$('.rechargeValue').blur(function() { //话费充值说明
		if(!$(".rechargeValue").check().number(1,300)) {
			$('.tooltip-rechargeValue').show();
		} else {
			$('.tooltip-rechargeValue').hide();
		}
	});
	$('.flowRate').blur(function() { //流量充值说明
		if(!$(".flowRate").check().number(1,300)) {
			$('.tooltip-flowRate').show();
		} else {
			$('.tooltip-flowRate').hide();
		}
	});
});
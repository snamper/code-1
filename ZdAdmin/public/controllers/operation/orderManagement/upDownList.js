"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	var status = $(".chooseType").attr("data-status");	//商品状态
	
	//切换查询状态
	$(".chooseType>li").on("click", function() {
		status = $(this).attr("data-status")
		$(".chooseType").attr("data-status",status);
		search();
	})//切换查询状态
	
	//切换商品属性查询(特价商品&全部商品)
	form.on('select(goodsStatus)', function(data){
		if(data.value == '0'){
			$('.selectStatus').attr('data-stats', '');
		}else{
			$('.selectStatus').attr('data-stats', data.value);
		}
	});
	
	//查询
	var search = function() {
		status = $(".chooseType").attr("data-status")
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间
		var specialOfferFlag = $('.selectStatus').attr('data-stats')||'';//商品属性状态
		if(specialOfferFlag == '1'){
			var specialOfferFlag = true;
		}
		var risksStatus = $('.selRisksStatus').find('.layui-form-checkbox').hasClass('layui-form-checked')?0:'';//高风险禁兑商品是够勾选
		var shortName = $("#shortName").val()
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?specialOfferFlag="+escape(specialOfferFlag)+"&status="+escape(status)+"&shortName="+ escape(shortName) +"&pSize="+
		escape(pageSize)+"&pNo="+escape(pageNo)+"&stDate="+escape($starTimes)+"&enDate="+escape($endTimes)+"&riskBuyAllowed="+escape(risksStatus);
	}
	$('#searchBtn').on('click', function (){//查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		$("#paging").attr("data-page-no",1);
		search();
	});		
	
	$(".slaves").on("click", function() {
		var data = {
			"status":$(this).attr("data-status"),
			"productId":$(this).attr("data-id"),
		}
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/operation/opMerMan/slaves",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					status = $(".chooseType").find(".layui-this").attr("data-status")
					if(data.status == 4){	//上架
						var message = "上架成功";
						$(".chooseType").attr("data-status",status)
					}else{					//下架
						var message = "下架成功"
						$(".chooseType").attr("data-status",4)
					}
					layer.msg(message, {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.reload();
					});
				}else{
					layer.msg(json.message, {
						time: 1000, //1s后自动关闭
						icon: 2
					})
				}
			},
			error: function() {
				layer.msg('操作失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		});
	})
	//商品预览
	$(".openGoodsView").on("click", function() {
		var goodsId = $(this).attr("data-id")
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/product/info/detail.do",
			data: {
				productId:goodsId
			},
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					$(".view_title h1").html(json.data.fullName);	//商品标题
					$(".view_code i").html(json.data.productRule.exchangePoints)	//兑换积分
					$(".view_times i").html(json.data.soldNumber)	//已售数量
					$(".view_money i").html(json.data.retailPrice)		//售价
					$(".view_changeCode i").html(json.data.exchange_points);	//兑换积分
					
					var detailImagesStr = '';//预览封面图
					var dataImgLen = json.data.detailImages;
					for(var i=0;i<dataImgLen.length;i++){
						detailImagesStr += '<li class="pvImgShow left">' +
							'<img src="'+ dataImgLen[i].imageUrl +'" class="uploadImage"/>'
						'</li>';
					}
					$('#previewImg').html(detailImagesStr);
					var previewImgWidth = $('.pvImgShow').width() * dataImgLen.length;
					$('#previewImg').width(previewImgWidth);
					if($('#previewImg').find('li').length && $('#previewImg').find('li').length > 1){
//						console.log($('#previewImg').find('li').length)
						onOffShowImgBtn();
					}else{
						$('#previewImg').css('left',0);
					}
					for(var i = 0; i < json.data.productExtendedDetailList.length; i++){
						if(json.data.productExtendedDetailList[i].attrDicName == "usefulTime"){		//使用有效期
							$(".useFulTime").html(json.data.productExtendedDetailList[i].detailDesc)
						}else if(json.data.productExtendedDetailList[i].attrDicName == "useFlow"){		//使用流程
							$(".goode_flow").html(json.data.productExtendedDetailList[i].detailDesc)
						}else if(json.data.productExtendedDetailList[i].attrDicName == "statement"){	//法律声明
							$(".goods_law").html(json.data.productExtendedDetailList[i].detailDesc)
						}else if(json.data.productExtendedDetailList[i].attrDicName == "announcements"){	//注意事项
							$(".note_message").html(json.data.productExtendedDetailList[i].detailDesc)
						}
					}
					$(".coverScreen").show();
					$(".adverAppView").show();
				}
			}
		})
	})
	$(".closeAppView").on("click", function() {
		$(".coverScreen").hide();
		$(".adverAppView").hide();
	})
	//判断是否显示左右移动的按钮
	function onOffShowImgBtn (){//商品预览详情图切换按钮
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
			status = $(".chooseType").attr("data-status");
			var $starTimes = getQueryString('stDate') || '';//开始时间
			var $endTimes = getQueryString('enDate') || '';//截止时间
			var specialOfferFlag = $('.selectStatus').attr('data-stats')||'';//商品属性状态
			if(specialOfferFlag == '1'){
				var specialOfferFlag = true;
			}
			var risksStatus = $('.selRisksStatus').find('.layui-form-checkbox').hasClass('layui-form-checked')?0:'';//高风险禁兑商品是够勾选
			var shortName = getQueryString('shortName') || '';
			var pageNo = obj.curr;
			var pageSize = $("#paging").attr("data-page-size");
			if(!first) {
				var layLoad = layer.load(2,{
					shade: 0.6
				});//加载等待
				window.location.search="?specialOfferFlag="+escape(specialOfferFlag)+"&status="+escape(status)+"&shortName="+ escape(shortName) +"&pSize="+
				escape(pageSize)+"&pNo="+escape(pageNo)+"&stDate="+escape($starTimes)+"&enDate="+escape($endTimes)+"&riskBuyAllowed="+escape(risksStatus);
			};
		}
	});	
});
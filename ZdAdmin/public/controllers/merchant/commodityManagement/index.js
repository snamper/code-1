"use strict";
layui.use(['element', 'paging', 'laydate','form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form()
	var status = 0;	//草稿箱状态	
	var productAdAttr = 0;
	//切换查询状态
	$(".chooseType>li").on("click", function() {
		status = $(this).attr("data-status")
		if(status == 5){	//全部的时候传空
			status = ""
		}
		$(".chooseType").attr("data-status",status)
		$("#paging").attr("data-page-no",1)
		search()
	})
	
	form.on('select(productAdAttr)', function(data){
		productAdAttr = data.value;
		$(".productAdAttr").attr("data-productAdAttr",data.value)
	})
	//查询
	var search = function() {
		status = $(".chooseType").attr("data-status")
		productAdAttr = $(".productAdAttr").attr("data-productAdAttr")
		if(!status) status = ""
		if(!productAdAttr) productAdAttr = ""
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间
		var fullName = $(".fullName").val();
		if(!fullName){
			fullName = ""
		}
		var merchantFullName = $(".merchantFullName").val();
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?productState="+status+"&productAdAttr="+productAdAttr+"&fullName="+
			escape(fullName)+"&merchantFullName="+escape(merchantFullName)+"&startTime="+escape($starTimes)+"&endTime="+escape($endTimes)+"&pageNo="+1+"&pageSize="+escape(pageSize);
	}
	$('.queryGoods').on('click', function (){//查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		$("#paging").attr("data-page-no",1)
		search()
	});		
	var goodsId = "";
	$(".importCode").click(function(){	//兑换码
		$(this).parent().find(".uploadFile").trigger("click");
		goodsId = $(this).attr("data-id")
	});
	$(".uploadFile").change(function(){
		
		var fs = new FormData();
		fs.append("uploadFile",$(this)[0].files[0]);
		fs.append("id",goodsId);
		if($(this)[0].files[0]){
			var layLoad = ""
		 	$.ajax({
				url:'/admin/product/info/import/exchange/code.do', //上传接口	
				type:"post",
				dataType:"json",
				data:fs,
				processData: false,  // 告诉jQuery不要去处理发送的数据
				contentType: false,
				cache: false,  
				beforeSend:function(){
					layLoad = layer.load(2,{
						shade: 0.6
					});//加载等待
				},
				success:function(json){		
					console.log(json)
					layer.close(layLoad)
					if(json.message == "成功"){
						layer.msg('兑换码导入成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							search()
						})
					}else{
						layer.msg('兑换码导入失败');
					}
				},
				error: function() {
					layer.close(layLoad)
					layer.msg('导入失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					})
					
				}
	    	});		 	
		}		
	})
	//删除
	$(".deleteGoods").on("click", function() {
		var goodsId = $(this).attr("data-id")
		layer.confirm('您确定要删除该商品吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/merchant/cmdMan/deleteGoods",
				data: {
					"id":goodsId
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('删除成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});
					}
				},
				error: function() {
					layer.msg('删除失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	
	//删除兑换码
	$('.delCodeBtns').on('click',function (){
		var $this = $(this);
		var $goodsId = $this.attr('data-id');
		layer.confirm('您确定要删除兑换码吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/product/info/exchange/code/drop.do",
				data: {
					"id":$goodsId
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('删除成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							search();
						});
					}else{
						layer.msg(json.message, {
							time: 1500, //1s后自动关闭
							icon: 2
						})
					}
				},
				error: function() {
					layer.msg('删除失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		});
	})
	
	//商品提交审核
	$(".submitGoods").on("click", function() {
		var advertId = $(this).attr("data-id")
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/product/info/submit.do",
				data: {
					"id":advertId
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('提交成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							search()
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
		})
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
					$(".coverScreen").show();
					$(".adverAppView").show();
					$(".view_title h1").html(json.data.fullName);	//商品标题
					$(".view_code i").html(json.data.exchange_points)	//兑换积分
					$(".view_times i").html(json.data.sold_base_num)	//已售数量
					$(".view_money i").html(json.data.retailPrice)		//售价
					$(".view_changeCode i").html(json.data.exchange_points);	//兑换积分
					$(".goode_view_img img").attr("src",json.data.listImage)	//商品列表图
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
				}
			}
		})
	})
	$(".closeAppView").on("click", function() {
		$(".coverScreen").hide();
		$(".adverAppView").hide();
	})
	//初始化日期组件
	var opt = {
		sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01'//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				var data = {
					"productState":getQueryString("productState") || 0,
					"productAdAttr":getQueryString("productAdAttr") || "",
					"fullName":getQueryString("fullName") || "",
					"merchantFullName":getQueryString("merchantFullName") || "",
					"pageNo":getQueryString("pageNo") || 1,
					"pageSize":getQueryString("pageSize") || 10,
					"startTime":getQueryString("startTime") || "",
					"endTime":getQueryString("endTime") || ""
				}
				window.location.search="?productState="+data.productState+"&productAdAttr="+escape(data.productAdAttr)+"&fullName="+
					escape(data.fullName)+"&merchantFullName="+escape(data.merchantFullName)+"&startTime="+escape(data.startTime)+"&pageNo="+
					obj.curr+"&pageSize="+escape(data.pageSize)+"&endTime="+escape(data.endTime);
			
			};
		}
	});	
	//当前时间
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    var getMinutes = date.getMinutes();
	    var getSeconds = date.getSeconds();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    if (getMinutes >= 1 && getMinutes <= 9) {
	        getMinutes = "0" + getMinutes;
	    }
	    if (getSeconds >= 0 && getSeconds <= 9) {
	        getSeconds = "0" + getSeconds;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + getMinutes
	            + seperator2 + getSeconds;
	    return currentdate;
	};
});
"use strict";

layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	var productState = $(".chooseType").attr("data-productState"),
		productAdAttr = $(".productAdAttr").attr("data-type");
	//切换查询状态
	$(".chooseType>li").on("click", function() {
		productState = $(this).attr("data-productState")
		$(".chooseType").attr("data-productState",productState)
		$("#paging").attr("data-page-no",1)
		search()
	})
	form.on('select(type)', function(data){
		productAdAttr = data.value;
		$(".productAdAttr").attr("data-type",data.value)
	})
	//查询
	var search = function() {
		productAdAttr = $(".productAdAttr").attr("data-type")
		if(!productAdAttr) productAdAttr = ""
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间
		var fullName = $(".fullName").val();
		var merchantFullName = $(".merchantFullName").val();
		if(!fullName){
			fullName = ""
		}
		var merchantFullName = $(".merchantFullName").val();
		if(!merchantFullName){
			merchantFullName = ""
		}

		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?productState="+productState+"&productAdAttr="+productAdAttr+"&fullName="+
			escape(fullName)+"&merchantFullName="+escape(merchantFullName)+"&startTime="+escape($starTimes)+"&endTime="+escape($endTimes)+"&pageNo="+1+"&pageSize="+escape(pageSize);
	}
	$('.searchData').on('click', function (){//订单查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		$("#paging").attr("data-page-no",1)
		search()
	});		
	//删除
	$(".deleteAdvert").on("click", function() {
		var advertId = $(this).attr("data-id")
		layer.confirm('您确定要删除该广告吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/advertising/advertManage/deleteAdvert",
				data: {
					"id":advertId
				},
				beforeSend:beforeSend(),
				success: function(json) {
					console.log(json)
					if(json.message == "成功") {
						layer.msg('删除成功！', {
							time: 1500, //1s后自动关闭
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
	//提交
	$(".submitAdvert").on("click", function(){
		var advertId = $(this).attr("data-id")
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/advertising/advertManage/submitAdvert",
				data: {
					"id":advertId
				},
				beforeSend:beforeSend(),
				success: function(json) {
					console.log(json)
					if(json.message == "成功") {
						layer.msg('提交成功！', {
							time: 1500, //1s后自动关闭
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
	//初始化日期组件
	var opt = {
		sMax: getQueryString("endDate") ? getQueryString("endDate") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("startDate") ? getQueryString("startDate") : '2017-01-01'//结束日期的最小值
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
				"productState":getQueryString("productState") || "",
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
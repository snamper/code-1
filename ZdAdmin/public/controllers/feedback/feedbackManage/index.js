"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form(); //加载form模块
	
	
	$('.searchData').on('click', function (){ //查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间
		var name = $(".name").val()
		
		var data = {
			start_time: $starTimes,
			end_time: $endTimes,
			name: name,
			pageNo:1,
			pageSize:$("#paging").attr("data-page-size")
		};
		if(layLoad){
			layer.close(layLoad);//清除加载
		}
		window.location.search="?startTime="+escape(data.start_time)+"&endTime="+escape(data.end_time)+"&name="+escape(data.name)+"&pageNo="+escape(data.pageNo)+"&pageSize="+escape(data.pageSize);
	});	
	
	//删除
	$(".deleteAdver").on("click", function(){
		var _this = this;
		layer.confirm('您确定要删除吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/client/advertiserManage/delete",
				data:{
					"advId":$(_this).attr("data-id"),
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('删除成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							window.location.search = "";
						});
						
						
					}
				},error: function(){
					layer.msg('删除失败！', {
						time: 1500, //1s后自动关闭
						icon: 1
					});
				}
			})
				
		})
	})
	
	//分页模块Math.ceil		
	var pageNo = $("#paging").attr('data-page-no') ? $("#paging").attr('data-page-no') : "1";
	var pageSize = $("#paging").attr('data-page-size') ? $("#paging").attr('data-page-size') : "10";
	var pages = Math.ceil($("#paging").attr('data-page') / pageSize);
	var paging = layui.laypage({
		pages: pages, //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: pageNo, //当前页
		groups: pageSize, //连续分页数
		jump: function(obj, first) {
			//得到了当前页，用于向服务端请求对应数据
			//var curr = obj.curr;
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
			if(!first) {
				var $starTimes = getQueryString("startTime") || "";//开始时间
				var $endTimes = getQueryString("endTime") || "";//截止时间
				var name = getQueryString("name") || ""
				var data = {
					start_time: $starTimes,
					end_time: $endTimes,
					name: name,
					pageNo:$("#paging").attr("data-page-no"),
					pageSize:$("#paging").attr("data-page-size")
				};
				window.location.search="?startTime="+escape(data.start_time)+"&endTime="+escape(data.end_time)+"&name="+escape(data.name)+"&pageNo="+escape(obj.curr)+"&pageSize="+escape(data.pageSize);
			}
		}
	});
	
	//初始化日期组件
	var opt = {
		sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01'//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
	
	
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
"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form()
	var taskType = $(".taskType").attr("data-taskType")
	//选择类型
	form.on('select(taskType)', function(data){
		console.log(data.value)
		$(".taskType").attr("data-taskType",data.value)
		taskType = data.value
	})
	//查询
	var search = function() {
//		var taskType = $(".taskType").attr("data-taskType")
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间
		var taskId = $(".taskId").val();
		if(!taskId){
			taskId = ""
		}
		if(!taskType){
			taskType = ""
		}
		var pageNo =  $("#paging").attr("data-page-no")
		var merchantFullName = $(".merchantFullName").val();
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?taskType="+taskType+"&id="+
			escape(taskId)+"&startTime="+escape($starTimes)+"&endTime="+escape($endTimes)+"&pageNo="+escape(pageNo)+"&pageSize="+escape(pageSize);
		$(".taskType").attr("data-taskType",taskType)
	}
	$('#searchBtn').on('click', function (){//查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		$("#paging").attr("data-page-no",1)
		search()
	});		
	//启用禁用
	$(".disabelTask").on("click", function() {
		var status = $(this).attr("data-status");
		var taskId = $(this).attr("data-id")
		var message = "";
		var url = ""
		if(status == 0){	//去禁用
			message = "您确定要禁用该任务吗？";
			url = "/operation/taskManagement/disable"
		}else{				//去启用
			message = "您确定要启用该任务吗？";
			url = "/operation/taskManagement/enable"
		}
		layer.confirm(message, {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: url,
				data: {
					"id":taskId
				},
				beforeSend:beforeSend(),
				success: function(json) {
					console.log(json)
					
					if(json.message == "成功") {
						if(status == 0){	//去禁用
							message = "禁用成功";
						}else{				//去启用
							message = "启用成功";
						}
						layer.msg(message, {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});
					}
				},
				error: function() {
					layer.msg('状态修改失败！', {
						time: 1000, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
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
				 $("#paging").attr("data-page-no",obj.curr);
				 jumpPage("pageSize=10&pageNo="+obj.curr);
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
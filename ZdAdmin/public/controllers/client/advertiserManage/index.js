"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form(); //加载form模块
	var advType = "",        //广告主类型
		status = ""			//广告主状态
	
	//选择广告主类型
	form.on('select(type)', function(data){
		advType = data.value;
		$(".adverType").attr("data-type",advType)
	})
	//选择广告主状态
	form.on('select(status)', function(data){
		status = data.value;
		$(".Adverstatus").attr("data-status",status)
	})
	
	$('.queryAdvertiser').on('click', function (){ //查询
		$("#paging").attr("data-page-no",1)
		search()
		
	});	
	var search = function() {
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间
		var $oTypes = $("#merchantId").val();
		
		var data = {
			status:$(".Adverstatus").attr("data-status"),
			advType:$(".adverType").attr("data-type"),
			stDate: $starTimes,
			enDate: $endTimes,
			short_name: $oTypes,
			pNo:$("#paging").attr("data-page-no"),
			pSize:$("#paging").attr("data-page-size")
		};
		window.location.search="?stDate="+escape(data.stDate)+"&status="+status+"&advType="+
			escape(data.advType)+"&enDate="+escape(data.enDate)+"&shortName="+escape(data.short_name)+"&pNo="+escape(data.pNo)+"&pSize="+escape(data.pSize);
	}
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
							search()
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
	//提交审核
	$(".submit").on("click", function() {
		var _this = this;
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/client/advertiserManage/submit",
				data:{
					"id":$(_this).attr("data-id"),
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('提交成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});
					}
				},error: function(){
					layer.msg('提交失败！', {
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
			if(!first) {
				var data = {
				"status":getQueryString("status") || "",
				"advType":getQueryString("advType") || "",
				"shortName":getQueryString("shortName") || "",
				"pNo":getQueryString("pNo") || 1,
				"pSize":getQueryString("pageSize") || 10,
				"stDate":getQueryString("stDate") || "",
				"enDate":getQueryString("enDate") || ""
			}
			window.location.search="?advType="+escape(data.advType)+"&status="+escape(data.status)+
				"&shortName="+escape(data.shortName)+"&stDate="+escape(data.stDate)+"&pNo="+
				obj.curr+"&pSize="+escape(data.pSize)+"&enDate="+escape(data.enDate);
			
			};
		}
	});
	
	//初始化日期组件
	var opt = {
		sMax: getQueryString("enDate") ? getQueryString("enDate") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("stDate") ? getQueryString("stDate") : '2017-01-01'//结束日期的最小值
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
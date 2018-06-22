"use strict";
layui.use(['element', 'paging', 'laydate'], function() {
	$ = layui.jquery;

	var search = function() {
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间
		var versionCode =  $(".versionCode").val()
		if(!versionCode){
			versionCode = ""
		}
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?startTime="+escape($starTimes)+"&versionCode="+escape(versionCode)+"&endTime="+escape($endTimes)+"&pageNo="+pageNo+"&pageSize="+escape(pageSize);
	}
	
	//分页模块Math.ceil		
	var pageNo = $("#paging").attr('data-page-no') ? $("#paging").attr('data-page-no') : "1";
	var pageSize = $("#paging").attr('data-page-size') ? $("#paging").attr('data-page-size') : "10";
	var paging = layui.laypage({
		pages: $("#paging").attr('data-page'), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: pageNo, //当前页
		groups: pageSize, //连续分页数
		jump: function(obj, first) {
			//得到了当前页，用于向服务端请求对应数据
			if(!first) {
				$("#paging").attr("data-page-no",obj.curr);
				search()
			}
		}
	});

	$('.queryUser').on('click', function() { //查询
		$("#paging").attr("data-page-no",1);
		search()
	});
	
	//下架
	$('.downVersion').on('click', function() {
		var _this = $(this);
		var data = {
			"appVersionId":$(this).attr("data-id"),
			"status":0	//下架
		}
		layer.confirm('您确定要下架吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/system/versionManage/downVersion",
				data: data,
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('下架成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});
					}
				},
				error: function() {
					layer.msg('下架失败！', {
						time: 1000, //1s后自动关闭
						icon: 2
					});
				},
			});
		})
	})
	
	//初始化日期组件
	var opt = {
		sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01'//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
});


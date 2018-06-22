"use strict";
layui.use(['element', 'paging', 'laydate'], function() {
	$ = layui.jquery;

	var search = function() {
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间
		var userName =  $(".userName").val()
		if(!userName){
			userName = ""
		}
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?startTime="+escape($starTimes)+"&userName="+escape(userName)+"&endTime="+escape($endTimes)+"&pageNo="+pageNo+"&pageSize="+escape(pageSize);
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
	
	//启用or禁用用户
	$('#userForm').delegate('.disabledUser', 'click', function() {
		var _this = $(this);
		var messsage = "";
		if(_this.attr("data-resource") == 0){	//去禁用
			messsage = "您确定要禁用该用户吗？"
		}else{									//去启用
			messsage = "您确定要启用该用户吗？"
		}
		layer.confirm(messsage, {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/system/userManage/desableUser",
				data: {
					"type":_this.attr("data-resource"),
					"userId":_this.attr("data-id")
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						if(_this.attr("data-resource") == 0){	//去禁用
							layer.msg('禁用成功！', {
								time: 1000, //1s后自动关闭
								icon: 1
							},function(){
								search()
							});
						}else{									//去启用
							layer.msg('启用成功！', {
								time: 1000, //1s后自动关闭
								icon: 1
							},function(){
								search()
							});
						}
					}
				},
				error: function() {
					layer.msg('状态改变失败！', {
						time: 1000, //1s后自动关闭
						icon: 2
					});
				},
			});
		})
	})
	//删除按钮
	$('#userForm').delegate('.deleteUser', 'click', function() {
		var _this = $(this);
		layer.confirm('您确定要删除该用户吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/system/userManage/delUser",
				data: {
					"userId":_this.attr("data-id")
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
				},
				error: function() {
					layer.msg('删除失败！', {
						time: 1500, //1s后自动关闭
						icon: 1
					},function(){
						search()
					});
				},
			});

		});
	});
	//初始化日期组件
	var opt = {
		sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01'//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
});


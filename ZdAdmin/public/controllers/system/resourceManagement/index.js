"use strict";
layui.use(['element', 'paging'], function() {
	$ = layui.jquery;
	
	var search = function() {
		var $queryByResourceName = $('.queryByResourceName').val(); //资源名
		var data = {
			menuName: $queryByResourceName,
			pageNo: $("#paging").attr('data-page-no') ? $("#paging").attr('data-page-no') : "1",
			pageSize: getQueryString("pageSize") ? getQueryString("pageSize") : "10",
		};
		window.location.search="?menuName="+
			escape(data.menuName)+"&pageNo="+escape(data.pageNo)+"&pageSize="+escape(pageSize);
	}
	
	$('.queryResource').on('click', function() { //查询
		$("#paging").attr('data-page-no',1)
		search()
	});
	//监听回车键
	document.onkeydown=function(event){
		
	    var e = event || window.event || arguments.callee.caller.arguments[0];
	              
	     if(e && e.keyCode==13){ // enter 键
	     
         	if($('.queryByResourceName').val()){
				search()
         	}
    	}
	}
	//禁用、启用、删除资源
	$('#resourceForm').delegate('.disabledResource', 'click', function() {

		var _this = $(this);
		layer.confirm('您确定要改变该资源状态吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
				$.ajax({
					type: "post",
					dataType: "json",
					url: "/system/resourceManage/disableReource",
					data:{
						"menuId":$(_this).attr("data-id"),
						"status":$(_this).attr("data-source"),
						"type":$(_this).attr("data-type"),
					},
					beforeSend:beforeSend(),
					success: function(json) {
						if(json.message == "成功") {
							if($(_this).attr("data-source") == 1){
								layer.msg('启用成功！', {
									time: 1000, //1s后自动关闭
									icon: 1
								},function(){
									search()
								});
							}else{
								layer.msg('禁用成功！', {
									time: 1000, //1s后自动关闭
									icon: 1
								},function(){
									search()
								});
							}
						}
					},error: function(){
						layer.msg('状态修改失败！', {
							time: 1000, //1s后自动关闭
							icon: 1
						});
					}
				})
				
		})
	})
	//删除按钮
	$('#resourceForm').delegate('.deleteResource', 'click', function() {
		var _this = $(this);
		layer.confirm('您确定要删除该资源吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/system/resourceManage/delReource",
				data:{
					"menuId":$(_this).attr("data-id"),
					"status":2
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
						icon: 1
					});
				},
			});

		});
	});
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
				$("#paging").attr('data-page-no', obj.curr)
				search()
//				window.location.href = "/system/resourceManage?pageNo=" + obj.curr + "&pageSize=" + pageSize;
			}
		}
	});
});

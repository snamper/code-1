"use strict";
layui.use(['element', 'paging', 'tree'], function() {
	$ = layui.jquery;
	$('.queryRole').on('click', function() { //查询
		var $queryByRoleName = $('.queryByRoleName').val(); //角色名
		
		$('.tooltip-hints').addClass('hide');				
		var data = {
			name: $queryByRoleName,
			pageNo: getQueryString("pageNo") ? getQueryString("pageNo") : "1",
			pageSize: getQueryString("pageSize") ? getQueryString("pageSize") : "10",
		};
		ajaxData(data, reloadHtml);
		
	});
	$('.queryByRoleName').on('change', function() {
		$('.tooltip-hints').addClass('hide');
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
		     var data = {
				 name:$(".queryByRoleName").val(),
				 pageNo:obj.curr,
				 pageSize:$("#paging").attr("data-page-size"),
			 };	
			if(!first) {
				window.location.href = "/system/roleManage?pageNo=" + obj.curr + "&pageSize=" + pageSize+"&name=" +data.name;
			}
		}
	});
});
var ajaxData = function(data, callback) {
	//发送数据请求
	$.ajax({
		 type:"post",
		 dataType:"json",
		 url:"/system/roleManage",
		 data:data,
		 beforeSend:beforeSend(),
		 success:callback,
	 }); 
	//url保存当前状态;
	var urlData = {
		name: data.roleName ? data.roleName : null,
		pageNo: data.pageNo ? data.pageNo : null,
		pageSize: data.pageSize ? data.pageSize : null,
	};
	window.location.search = "?name=" +
		escape(data.name) + "&pageNo=" +
		1 + "&pageSize=" + escape(data.pageSize);
};
var reloadHtml = function(json) {
	var html = "";
	for(var i = 0; i < json.data.datas.length; i++) {
		html += '<tr>' +
			'<td>' + json.data.datas[i].name + '</td>' +
			'<td>' + json.data.datas[i].create_time + '</td>' +
			'<td>共有' + json.data.datas[i].num + '个用户关联</td>' +
			'<td><a href="./roleManage/setUser?roleId='+json.data.datas[i].role_id +' class="layui-btn layui-btn">设置用户</a><a href="./roleManage/editRole?roleId='+json.data.datas[i].role_id +' class="layui-btn">编辑角色</a></td>' +
			'</tr>';
	};
	$("#htmlWrap").empty()
		.append(html);
	//重新设置翻页组件;
	$("#paging").empty();
	var paging = layui.laypage({
		pages: json.data.totalPage, //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: json.data.pageNo, //当前页
		groups: json.data.pageSize, //连续分页数		 
	}); 
};

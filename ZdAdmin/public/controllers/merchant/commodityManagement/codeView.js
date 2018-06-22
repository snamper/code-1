"use strict";

layui.use(['element', 'paging', 'laydate'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var productId = $(".code").attr("data-id");
	//查询
	var search = function() {
		var code = $(".code").val()
		if(!code){
			code = ""
		}
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?productId="+escape(productId)+"&code="+
			escape(code)+"&pageNo="+escape(pageNo)+"&pageSize="+escape(pageSize);
	}
	$('#search').on('click', function (){//订单查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		$("#paging").attr("data-page-no",1)
		search()
	});		
	//改售出状态
	$(".changeType").on("click", function() {
		var id = $(this).attr("data-id")
		layer.confirm('您确定要改变售出状态吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "get",
				dataType: "json",
				url: "/admin/product/code/update.do",
				data: {
					"id":id
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('状态更改成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});
					}
				},
				error: function() {
					layer.msg('状态更改失败！', {
						time: 1000, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			
			if(!first) {
				$("#paging").attr("data-page-no",obj.curr);
				search()
			};
		}
	});

});
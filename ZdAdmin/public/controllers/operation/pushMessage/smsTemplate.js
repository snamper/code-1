"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form(); //加载form模块
	
	//打开模板弹窗
	var promptBox = ""
	$(".openSms").on("click", function(){
		var id = $(this).attr("data-id");
		var message = $(this).attr("data-item")
		if(id){
			var title = "修改模板";
			message = JSON.parse(message);
			$(".name").val(message.model_name);
			$(".content").val(message.model_info);
			$(".tempalteId").val(message.model_id)
			$(".saveTemplate").attr("data-id",id)
		}else {
			var title = "新建模板"
			$(".name").val('');
			$(".content").val('');
			$(".tempalteId").val('')
		}
		promptBox = layer.open({
			type: 1,
			skin: 'layui-layer-molv', //样式类名
			closeBtn: 1, //不显示关闭按钮
			anim: 1,
			shade: 0,
			area: ['700px', '400px'], //宽高
			title: [title, 'text-align: center; font-size: 16px;'],
			content: $('#template')
		});
	})
	//新建or修改模板
	$(".saveTemplate").on("click", function(){
		var id = $(".saveTemplate").attr("data-id");
		var data = {
			modelName:$(".name").val(),
			modelId:$(".tempalteId").val(),
			modelInfo:$(".content").val()
		}
		if(!$(".name").val() || !$(".name").check().number(1,20)){
			$('.tooltip-name').show()
			return;
		}
		if(!$(".content").val() || !$(".content").check().number(1,50)){
			$('.tooltip-content').show()
			return;
		}
		if(!$('.tempalteId').check().notNull() || !$('.tempalteId').check().isNum() || $('.tempalteId').val() < 0 || $('.tempalteId').val().legnth < 6){
			$('.tooltip-tempalteId').html("请输入6位纯数字").removeClass("hide").show();
			return;
		}
		if(!id)
			var url = "/admin/message/model/create.do"
		else{
			var url = "/admin/message/model/update.do"
			data.id = id;
		}
		layer.confirm('您确定要保存吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: url,
				data:data,
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('保存成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});
					}else{
						layer.msg(json.message, {
							time: 1500, //1s后自动关闭
							icon: 2
						});
						$('.tooltip-tempalteId').html(json.message).show();
					}
				},error: function(){
					layer.msg('保存失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	//模板删除
	$(".delModal").on("click", function() {
		var id = $(this).attr("data-id")
		layer.confirm('您确定要删除该模板吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: '/admin/message/model/delete.do',
				data:{
					modelId:id
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
					}else{
						layer.msg(json.data, {
							time: 1500, //1s后自动关闭
							icon: 2
						});
					}
				},error: function(){
					layer.msg('删除失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	$("#searchBtn").on("click", function() {
		$("#paging").attr("data-page-no",1);
		search()
	})
	var search = function() {
		var pageNo = $("#paging").attr("data-page-no");
		var modelName = $('.modelName').val();
		var pageSize = $("#paging").attr("data-page-size");
		
		window.location.search="?modelName="+escape(modelName)+"&pageNo="+escape(pageNo)+"&pageSize="+escape(pageSize);
	}

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
			if(!first) {
				var data = {
					"modelName":getQueryString("modelName") || "",
					"pageNo":getQueryString("pageNo") || 1,
					"pageSize":getQueryString("pageSize") || 10
				}
				window.location.search="?modelName="+data.modelName+"&pageNo="+obj.curr+"&pageSize="+data.pageSize
			
			};
		}
	});
	
	$(".name").on("blur", function(){
		if(!$(".name").val() || !$(".name").check().number(1,20))
			$('.tooltip-name').show()
		else
			$('.tooltip-name').hide()
	})
	$(".content").on("blur", function(){
		if(!$(".content").val() || !$(".content").check().number(1,50))
			$('.tooltip-content').show()
		else
			$('.tooltip-content').hide()
	})
	$(".tempalteId").on("blur", function(){
		if(!$('.tempalteId').check().notNull() || !$('.tempalteId').check().isNum() || $('.tempalteId').val() < 0 || $('.tempalteId').val().legnth < 6)
			$('.tooltip-tempalteId').html(请输入6位纯数字).show()
		else
			$('.tooltip-tempalteId').hide()
	})
	
});
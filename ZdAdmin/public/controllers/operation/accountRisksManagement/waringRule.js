
"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form()
	var mailType = 1; //运营
	form.on("radio(mailType)",function(data){
		mailType = data.value;
	})
	
	//查询
	var search = function() {
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?pNo="+pageNo+"&pSize="+escape(pageSize);
	}
	$(".openBox").on("click", function() {
		var promptBox = layer.open({
			type: 1,
			skin: 'layui-layer-molv', //样式类名
			closeBtn: 1, //不显示关闭按钮
			anim: 1,
			shade: 0,
			area: ['500px', '300px'], //宽高
			title: ['新增联系人', 'text-align: center; font-size: 16px;'],
			content: $('#addRules')
		});
	})
	
	//删除
	$(".delete").on("click", function() {
		var id = $(this).attr("data-id")
		layer.confirm('您确定要删除该联系人吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/sys/alert/mail/delete.do",
				data: {
					"id":id
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
					}else{
						layer.msg(json.data, {
							time: 1500, //1s后自动关闭
							icon: 2
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
	//保存规则
	$(".save").on("click", function(){
		var data = {
			id: $($(".timeSlot")[$(this).attr("data-index")]).attr("data-id"),
			alertType:$($(".timeSlot")[$(this).attr("data-index")]).attr("data-alertType"),
			timeSlot:$($(".timeSlot")[$(this).attr("data-index")]).val(),
			alertLimit:$($(".alertLimit")[$(this).attr("data-index")]).val()
		}
		if(!$($(".timeSlot")[$(this).attr("data-index")]).check().notNull() || !$($(".timeSlot")[$(this).attr("data-index")]).check().isNum() || $($(".timeSlot")[$(this).attr("data-index")]).val().indexOf(".") > 0){
			$(this).parent().find(".tooltip-tips").show()
			return
		}
		if(!$($(".alertLimit")[$(this).attr("data-index")]).check().notNull() || !$($(".alertLimit")[$(this).attr("data-index")]).check().isNum() || $($(".alertLimit")[$(this).attr("data-index")]).val().indexOf(".") > 0){
			$(this).parent().find(".tooltip-tips").show()
			return
		}
		console.log(data)
		layer.confirm('您确定要保存吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/sys/alert/base/update.do",
				data: data,
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
						layer.msg(json.data, {
							time: 1500, //1s后自动关闭
							icon: 2
						});
					}
				},
				error: function() {
					layer.msg('保存失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	//增加联系人
	$(".addRule").on("click", function(){
		var data = {
			mailType:mailType,
			email:$(".email").val()
		}
		if(!$(".email").check().email()){
			$(".tooltip-email").show()
			return;
		}
		console.log(data)
		layer.confirm('您确定要保存吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/sys/alert/mail/add.do",
				data: data,
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
						layer.msg(
							json.message,{
							time: 1500, //1s后自动关闭
							icon: 2
						});
					}
				},
				error: function() {
					layer.msg('保存失败！', {
						time: 1500, //1s后自动关闭
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
	
	$(".email").on("blur", function() {
		if(!$(".email").check().email())
			$(".tooltip-email").show()
		else
			$(".tooltip-email").hide()
	})
	$(".timeSlot").on("blur", function() {
		if(!$(this).check().notNull() || !$(this).check().isNum() || $(this).val().indexOf(".") > 0)
			$(this).parent().parent().find(".tooltip-tips").show()
		else
			$(this).parent().parent().find(".tooltip-tips").hide()
	})
	$(".alertLimit").on("blur", function() {
		if(!$(this).check().notNull() || !$(this).check().isNum() || $(this).val().indexOf(".") > 0)
			$(this).parent().parent().find(".tooltip-tips").show()
		else
			$(this).parent().parent().find(".tooltip-tips").hide()
	})
});
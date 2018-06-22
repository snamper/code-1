"use strict";

layui.use(['element', 'paging', 'laydate'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	
	//查询
	var search = function() {
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?pageNo="+pageNo+"&pageSize="+escape(pageSize);
	}	
	//打开弹窗
	var promptBox = "",
		advertId = "",
		showWeight = "";
	$(".editSort").on("click", function() {
		$(".coverScreen").show()
		advertId = $(this).attr("data-id");
		var showWeight = $(this).attr("data-showWeight");
		$(".showWeight").val(showWeight)
		promptBox = layer.open({
			type: 1,
			skin: 'layui-layer-molv', //样式类名
			closeBtn: 1, //不显示关闭按钮
			anim: 1,
			shade: 0,
			area: ['600px', '200px'], //宽高
			title: [$(this).attr("data-name"), 'text-align: center; font-size: 16px;'],
			content: $('#setBox'),
			cancel: function(index, layero){ 
			 	$(".coverScreen").hide()
			} 
		});
	})
	$(".showWeight").on("blur", function() {
		var message = ""
		if(!$(".showWeight").check().notNull()){
			message = "请输入曝光权重"
			$(".tooltip-showWeight").show()
		}else{
			if(!$(".showWeight").check().isNum()){
				message = "只能输入数字"
				$(".tooltip-showWeight").html(message).show()
			}else{
				if($(".showWeight").val() < 0){
					message = "只能输入正数"
					$(".tooltip-showWeight").html(message).show()
				}else{
					$(".tooltip-showWeight").hide()
				}
			}
		}
	})
	//保存编辑
	$(".saveChannel").on("click", function(){
		var message = ""
		if(!$(".showWeight").check().notNull()){
			message = "请输入曝光权重"
			$(".tooltip-showWeight").show()
			return;
		}else{
			if(!$(".showWeight").check().isNum()){
				message = "只能输入数字"
				$(".tooltip-showWeight").html(message).show()
				return;
			}else{
				if($(".showWeight").val() < 0){
					message = "只能输入正数"
					$(".tooltip-showWeight").html(message).show()
					return;
				}
			}
		}
		layer.confirm('您确定要保存吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/third/ad/channel/config/update.do",
				data: {
					"id":advertId,
					"showWeight":$(".showWeight").val()
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('保存成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							$(".coverScreen").hide()
							window.location.href = "/advertising/dspAdver/dspAdverExposure"
						});
					}else{
						layer.msg(json.message)
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
	//应用配置
	$(".saveData").on("click", function(){
		layer.confirm('您确定要使用该应用配置吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/third/ad/channel/config/apply.do",
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('配置成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
	//						window.location.href = "/advertising/dspAdver/dspAdverExposure"
						});
					}else{
						layer.msg(json.message)
					}
				},
				error: function() {
					layer.msg('配置失败！', {
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
				$("#paging").attr("data-page-no",obj.curr)
				search()
			};
		}
	});
	
	
});
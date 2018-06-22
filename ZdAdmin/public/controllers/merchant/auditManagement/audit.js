"use strict";
layui.use(['element', 'paging', 'laydate'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var closeBox = "";
	var source = ""
	//审核通过
	$(".audit").on("click", function() {
		var goodsId = $(this).attr("data-id");
		source = $(this).attr("data-type")
		var message = "";
		if(source == "审核通过"){
			message = "确定审核通过?"
		}else{
			message = "确定审核不通过?"
		}
		layer.confirm(message, {
			btn: ['确认', '取消'] //按钮
		}, function(index) {
			if(source == "审核失败"){
				layer.close(index)
				closeBox = layer.open({
					type: 1,
					skin: 'layui-layer-molv', //样式类名
					closeBtn: 1, //不显示关闭按钮
					anim: 1,
					shade: 0,
					area: ['40%', '280px'], //宽高
					title: ['失败原因', 'text-align: center; font-size: 16px;'],
					content: $('#failCause')
				});
			}else{				//审核通过
				$.ajax({
					type: "post",
					dataType: "json",
					url: "/merchant/audit/success",
					data: {
						"id":goodsId
					},
					beforeSend:beforeSend(),
					success: function(json) {
						console.log(json)
						if(json.message == "成功") {
							layer.msg('提交成功！', {
								time: 1000, //1s后自动关闭
								icon: 1
							},function(){
								window.location.href = "/merchant/audit"
							});
						}else{
							ayer.msg(json.message)
						}
					},
					error: function() {
						layer.msg('提交失败！', {
							time: 1500, //1s后自动关闭
							icon: 2
						});
					}
				})
			}
		})
	})
	//提交审核失败请求
	$(".failSubmit").on("click", function() {
		if(!$(".failCause").val()){
			layer.msg('请填写失败原因！');
			return;
		}
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/merchant/audit/fail",
			data: {
				"id":$(this).attr("data-id"),
				"failedReason":$(".failCause").val()
			},
			beforeSend:beforeSend(),
			success: function(json) {
				console.log(json)
				if(json.message == "成功") {
					layer.msg('提交成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/merchant/audit"
					});
				}else{
					ayer.msg(json.message)
				}
			},
			error: function() {
				layer.msg('提交失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	})
	
});
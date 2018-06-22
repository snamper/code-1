"use strict";
layui.use(['element', 'paging', 'laydate'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var closeBox = "";
	var source = "",advertId;
	//审核通过
	$(".audit").on("click", function() {
		advertId = $(this).attr("data-id");
		source = $(this).attr("data-type")
		var message = ""
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
			}else{
				request(source)
			}
		})
	})
	//提交审核失败请求
	$(".failSubmit").on("click", function() {
		if(!$(".failCause").val()){
			layer.msg('请填写失败原因！');
			return;
		}
		request(source)
	})
	
	//广告审核请求
	var request = function() {
		var data = {
			"adId":advertId,
		}
		if(source == "审核通过"){	//审核通过操作
			data.afterStatus = "-1";
			
		}else{						//审核不通过操作
			data.afterStatus = "-2";
			data.remark = $(".failCause").val()
		}
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/advertising/audit/examine",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('提交成功！', {
						time: 1500, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/advertising/audit"
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
	
});
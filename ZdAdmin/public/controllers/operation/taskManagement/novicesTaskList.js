"use strict";
//新手任务列表
layui.use(['element', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form();
});
//启用禁用
$(".disabelTask").on("click", function() {
	var status = $(this).attr("data-status");
	var taskName = $(this).parents('tr').find('.taskNames').attr('data-mark');//记录任务的代号
	var tipMes = "";
	if(status == 0){	//去禁用
		tipMes = "是否确认禁用此项任务？";
		var $sta = 1;//传入操作状态[启用/禁用]
	}else{				//去启用
		tipMes = "是否确认启用此项任务？";
		var $sta = 0;//传入操作状态[启用/禁用]
	}
	layer.confirm(tipMes, {
		btn: ['确认', '取消'] //按钮
	}, function() {
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/task/newhand/renew.do",
			data: {
				"status":$sta,
				"type":taskName
			},
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					if(status == 0){	//去禁用
						tipMes = "禁用成功";
					}else{				//去启用
						tipMes = "启用成功";
					}
					layer.msg(tipMes, {
						time: 1000, //1s后自动关闭
						icon: 1
					});
					window.location.reload();
				}
			},
			error: function() {
				layer.msg('状态修改失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
			}
		})
	})
})
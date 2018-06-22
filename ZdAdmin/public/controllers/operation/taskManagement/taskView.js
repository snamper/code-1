"use strict";
layui.use(['element', 'laydate', 'upload', 'form' ], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	var taskType = $(".taskType").attr("data-taskType"),
		adverId = "",
		_url = window.location.href,
		taskId = _url.split("?id=")[1];
	if(taskType == 1 || taskType == 2 || taskType == 3){
		adverId = $(".selectAdver").attr("data-selectAdver");
	}
	//获取广告列表
	var getAdverList = function() {
		var selectedAdver = $(".selectAdver").attr("data-selectAdver")
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/operation/taskManagement/getAdverList",
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					var html = '<span>';
					var adverList = json.data.datas;
					for(var i = 0; i < adverList.length; i++){
						if(selectedAdver == adverList[i].id){
							html += adverList[i].name + '</span>';
						}
					}
					$(".selectAdver").empty().append(html);
				}
			},error: function(){
				layer.msg('获取广告列表失败！', {
					time: 1500, //1s后自动关闭
					icon: 1
				});
			}
		})
	}
	getAdverList()


});
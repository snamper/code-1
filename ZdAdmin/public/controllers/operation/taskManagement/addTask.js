"use strict";
layui.use(['element', 'laydate', 'upload', 'form' ], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	var taskType = 1,
		adverId = ""
	//选择类型
	form.on('radio', function(data){
		taskType = data.value
		if(taskType == 1 || taskType == 2 || taskType == 3){	//诱导类任务
			$(".inducedAdver").show()
			$(".everydayAdver").hide()
			$(".elseAdver").hide()
		}else if(taskType == 4 || taskType == 5 || taskType == 6){	//日常类任务
			$(".inducedAdver").hide()
			$(".everydayAdver").show()
			$(".elseAdver").hide()
		}else{														//其他
			$(".inducedAdver").hide()
			$(".everydayAdver").show()
//			$(".elseAdver").show()
		}
	})
	//选择广告
	form.on('select', function(data){
		adverId = data.value
	})
	//保存
	$('.saveAdd').on('click', function (){
		var message = ""
		if(!$(".taskName").check().number(1,200)){
			$(".tooltip-taskName").show()
			return;
		}
		if(!$(".taskOrder").check().notNull()){
			message = "请输入排序"
			$('.tooltip-taskOrder').empty().html(message).show()
			return;
		}else if(!$(".taskOrder").check().isNum()){
			message = "只能输入数字"
			$('.tooltip-taskOrder').empty().html(message).show()
			return;
		}
		if(!$(".point").check().notNull()){
			message = "请输入排序"
			$('.tooltip-point').empty().html(message).show()
			return;
		}else if(!$(".point").check().isNum()){
			message = "只能输入数字"
			$('.tooltip-point').empty().html(message).show()
			return;
		}
		if(!$("#LAY_demorange_s").val() || !$("#LAY_demorange_e").val()){
			$('.tooltip-taskTime ').show()
			return;
		}
		if(!$(".dayMaxTimes").check().isNum()){
			message = "只能输入数字"
			$('.tooltip-dayMaxTimes').empty().html(message).show()
			return;
		}
		if(!$(".allMaxTimes").check().isNum()){
			message = "只能输入数字"
			$('.tooltip-allMaxTimes').empty().html(message).show()
			return;
		}
		
		if((taskType == 1 || taskType == 2 || taskType == 3) && !adverId){
			$(".tooltip-adver").show();
			return;
		}
		if(taskType == 4 || taskType == 5 || taskType == 6 ||　taskType == 7 || taskType == 8 || taskType == 9){
			if(!$(".compliteTimes").check().notNull()){
				message = "请输入所需数量"
				$('.tooltip-compliteTimes').empty().html(message).show()
				return;
			}else if(!$(".compliteTimes").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-compliteTimes').empty().html(message).show()
				return;
			}
		}
		if(!$(".remarks").check().number(0,200)){
			$(".tooltip-remarks").show()
			return;
		}
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		var data = {
			"adId":adverId,
			"compliteTimes":$(".compliteTimes").val(),
			"taskType": taskType,
			"taskName": $(".taskName").val(),
			"taskOrder": $(".taskOrder").val(),
			"point": $(".point").val(),
			"taskActiveTime": $("#LAY_demorange_s").val(),
			"taskCloseTime": $("#LAY_demorange_e").val(),
			"dayMaxTimes": $(".dayMaxTimes").val(),
			"allMaxTimes": $(".allMaxTimes").val(),
			"remarks": String($(".remarks").val())
		}

		console.log(data)
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/task/add.do",
			data:data,
			beforeSend:beforeSend(),
			success: function(json) {
				layer.close(layLoad);//清除加载
				console.log(json)
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/operation/taskManagement";
					});
					
				}else{
					layer.msg(json.message)
				}
			},error: function(){
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 1
				});
				layer.close(layLoad);//清除加载
			}
		})
		
	});		
	
	var start = {
		min: laydate.now(),
//		max: laydate.now(),
		istime: true,
		format: 'YYYY-MM-DD hh:mm:ss',
		choose: function(datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
			end.start = datas //将结束日的初始值设定为开始日
		}
	};
	
	var end = {
		min: '2017-01-01 23:59:59',
		istime: true,
		format: 'YYYY-MM-DD hh:mm:ss',
		choose: function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	
	document.getElementById('LAY_demorange_s').onclick = function() {
		start.elem = this;
		laydate(start);
	}
	document.getElementById('LAY_demorange_e').onclick = function() {
		end.elem = this
		laydate(end);
	}
	//验证
	$('.taskName').blur(function(){
		var message = ""
		if(!$(".taskName").check().number(1,200)){
			$(".tooltip-taskName").show()
		}else{
			$(".tooltip-taskName").hide()
		}
	});
	
	$('.taskOrder').blur(function(){
		var message = ""
		
		if(!$(".taskOrder").check().notNull()){
			message = "请输入排序"
			$('.tooltip-taskOrder').empty().html(message).show()
		}else{
			
			if(!$(".taskOrder").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-taskOrder').empty().html(message).show()
			}else{
				$(".tooltip-taskOrder").hide()
			}
		}
	});
	$('.point').blur(function(){
		var message = "";
		
		if(!$(".point").check().notNull()){
			message = "请输入奖励积分";
			$('.tooltip-point').empty().html(message).show();
		}else{
			if(!$(".point").check().isNum()){
				message = "只能输入数字";
				$('.tooltip-point').empty().html(message).show();
			}else{
				$(".tooltip-point").hide();
			}
		}
	});
	$('.dayMaxTimes').blur(function(){
		var message = "";
		if(!$(".dayMaxTimes").check().isNum()){
			message = "只能输入数字";
			$('.tooltip-dayMaxTimes').empty().html(message).show();
		}else{
			$(".tooltip-dayMaxTimes").hide();
		}
	});
	$('.allMaxTimes').blur(function(){
		var message = ""
		if(!$(".allMaxTimes").check().isNum()){
			message = "只能输入数字"
			$('.tooltip-allMaxTimes').empty().html(message).show()
		}else{
			$(".tooltip-allMaxTimes").hide()
		}
	});
	$('.compliteTimes').blur(function(){
		var message = ""
		if(!$(".compliteTimes").check().notNull()){
			message = "请输入完成所需事件数量"
			$('.tooltip-compliteTimes').empty().html(message).show()
		}else{
			if(!$(".compliteTimes").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-compliteTimes').empty().html(message).show()
			}else{
				$(".tooltip-compliteTimes").hide()
			}
		}
	});
	$(".remarks").blur(function(){
		if(!$(".remarks").check().number(0,200)){
			$(".tooltip-remarks").show()
		}else{
			$(".tooltip-remarks").hide()
		}
	})
	
	
	

});
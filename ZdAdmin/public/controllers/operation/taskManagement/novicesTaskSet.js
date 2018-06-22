"use strict";
//任务管理-新手任务设置/编辑
layui.use(['element', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form();
	
});

//调整奖励积分（+-）  
$('.cutTasksBtn').on('click',function (){//-
	var $this = $(this);
	var $intVal = Number($this.parents('.adPoints').find('.tasksNumInpt').val());
	if($intVal == 0){
		layer.msg('限制0-1000的整数！');
		return false;
	}else{
		$this.parents('.adPoints').find('.tasksNumInpt').val($intVal-1);
	}
});
$('.addTasksBtn').on('click',function (){//+
	var $this = $(this);
	var $intVal = Number($this.parents('.adPoints').find('.tasksNumInpt').val());
	if($intVal == 1000){
		layer.msg('限制0-1000的整数！');
		return false;
	}else{
		$this.parents('.adPoints').find('.tasksNumInpt').val($intVal+1);
	}
});

//保存设置按钮跳转
var contFlag = true;//内容
var pointFlag = true;//积分
var $taskTbody = $('#taskTbody');
var $taskCont = $('.taskCont');
var $pointAward = $('.tasksNumInpt');
var taskContReg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/;//内容验证条件（1-20个汉字）
var pointAwardReg = /^(?!00)(?:[0-9]{1,3}|1000)$/;//积分奖励验证条件(0-1000)
$('.saveTaskSetBtn').on('click',function (){
	var taskContLen = $taskCont.length;//内容输入框的length
	for(var i=0;i<taskContLen;i++){
		if(!taskContReg.test($taskCont.eq(i).val())){
			contFlag = false;
			$taskCont.eq(i).addClass('taskContBorder');
		}else{
			$taskCont.eq(i).removeClass('taskContBorder');
		}
	}
	if(!$taskTbody.find('.taskCont').hasClass('taskContBorder')){
		contFlag = true;
	}
	var pointAwardLen = $pointAward.length;//奖励积分输入框的length
	for(var i=0;i<pointAwardLen;i++){
		if(!pointAwardReg.test($pointAward.eq(i).val())){
			pointFlag = false;
			$pointAward.eq(i).addClass('taskPointBorder');
		}else{
			$pointAward.eq(i).removeClass('taskPointBorder');
		}
	}
	if(!$taskTbody.find('.tasksNumInpt').hasClass('taskPointBorder')){
		pointFlag = true;
	}
	if(!contFlag){
		layer.msg('填写信息有误！');
		return false;
	}else if(!pointFlag){
		layer.msg('填写信息有误！');
		return false;
	}else{   
		var $tr1 = $('#taskTbody').find('tr').eq(0);
		var $tr2 = $('#taskTbody').find('tr').eq(1);
		var $tr3 = $('#taskTbody').find('tr').eq(2);
		var $tr4 = $('#taskTbody').find('tr').eq(3);
		var $tr5 = $('#taskTbody').find('tr').eq(4);
		var data = {
			"infoTxt": $tr1.find('.taskCont').val(),//完善资料内容
			"infoScore":$tr1.find('.tasksNumInpt').val(),//完善资料积分
			"socialTxt":$tr2.find('.taskCont').val(),//社交账号内容
			"socialScore":$tr2.find('.tasksNumInpt').val(),//社交账号积分
			"favorTxt":$tr3.find('.taskCont').val(),//我喜欢的内容
			"favorScore":$tr3.find('.tasksNumInpt').val(),//我喜欢的积分
			"inviteTxt":$tr4.find('.taskCont').val(),//邀请好友内容
			"inviteScore":$tr4.find('.tasksNumInpt').val(),//邀请好友积分
			"lessonTxt":$tr5.find('.taskCont').val(),//新手课堂内容
			"lessonScore":$tr5.find('.tasksNumInpt').val(),//新手课堂积分
		};
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/task/newhand/addInfo.do",
			data:data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/operation/taskManagement/novicesTaskList";
					});
				}else{
					layer.msg(json.message, {
						time: 1000, //1s后自动关闭
						icon: 2
					});
					return false;
				}
			},
			error: function(error) {
				layer.msg('保存失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				return false;
			}
		});//ajax请求
	}
});
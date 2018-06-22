"use strict";
//任务管理-签到任务设置/编辑
var layLoad; 
layui.use(['element', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form();
	
});

//调整奖励积分（+-）  
$('.cutPointsBtn').on('click',function (){//-
	var $this = $(this);
	var $intVal = Number($this.parents('.adPoints').find('.pointsNumInpt').val());
	if($intVal < 1){
		$this.parents('.adPoints').find('.pointsNumInpt').val('1');
		layer.msg('限制1-1000的整数！');
		return false;
	}else{
		$this.parents('.adPoints').find('.pointsNumInpt').val($intVal-1);
	}
});
$('.addPointsBtn').on('click',function (){//+
	var $this = $(this);
	var $intVal = Number($this.parents('.adPoints').find('.pointsNumInpt').val());
	if($intVal > 1000){
		$this.parents('.adPoints').find('.pointsNumInpt').val('1000');
		layer.msg('限制1-1000的整数！');
		return false;
	}else{
		$this.parents('.adPoints').find('.pointsNumInpt').val($intVal+1);
	}
});
//调整抽奖次数（+-）  
$('.cutLottosBtn').on('click',function (){//-
	var $this = $(this);
	var $intVal = Number($this.parents('.adLottos').find('.lottosNumInpt').val());
	if($intVal < 0){
		$this.parents('.adLottos').find('.lottosNumInpt').val('0');
		layer.msg('限制0-6的整数！');
		return false;
	}else{
		$this.parents('.adLottos').find('.lottosNumInpt').val($intVal-1);
	}
});
$('.addLottosBtn').on('click',function (){//+
	var $this = $(this);
	var $intVal = Number($this.parents('.adLottos').find('.lottosNumInpt').val());
	if($intVal > 6){
		$this.parents('.adLottos').find('.lottosNumInpt').val('6');
		layer.msg('限制0-6的整数！');
		return false;
	}else{
		$this.parents('.adLottos').find('.lottosNumInpt').val($intVal+1);
	}
});

//保存设置按钮跳转
var pointFlag = true;//积分
var lottoFlag = true;//抽奖
var pointAwardReg = /^(?!00)(?:[0-9]{1,3}|1000)$/;//积分奖励验证条件(1-1000)
var lottoReg = /^([0-6]|6)$/;//抽奖次数验证条件（1-6）
$('.saveTaskSetBtn').on('click',function (){
	var pointAwardLen = $('.pointsNumInpt').length;//奖励积分输入框的length
	for(var i=0;i<pointAwardLen;i++){
		if(!pointAwardReg.test($('.pointsNumInpt').eq(i).val())){//积分验证失败
			pointFlag = false;
			$('.pointsNumInpt').eq(i).addClass('taskPointBorder');
		}else{
			if(Number($('.pointsNumInpt').eq(i).val()) > 0 && Number($('.pointsNumInpt').eq(i).val()) <= 1000){//积分符合要求范围
				if(i == 0 && Number($('.pointsNumInpt').eq(i).val()) <= 1000){
					$('.pointsNumInpt').eq(i).removeClass('taskPointBorder');
				}else if(i >= 1 && Number($('.pointsNumInpt').eq(i).val()) >= Number($('.pointsNumInpt').eq(i-1).val())){
					$('.pointsNumInpt').eq(i).removeClass('taskPointBorder');
				}else{
					pointFlag = false;
					$('.pointsNumInpt').eq(i).addClass('taskPointBorder');
				}
			}else{//不符合要求范围
				pointFlag = false;
				$('.pointsNumInpt').eq(i).addClass('taskPointBorder');
			}
		}
	}
	if(!$('#taskTbody').find('.pointsNumInpt').hasClass('taskPointBorder')){
		pointFlag = true;
	}
	var lottosNumInptLen = $('.lottosNumInpt').length;//抽奖次数输入框的length
	for(var i=0;i<lottosNumInptLen;i++){
		if(!lottoReg.test($('.lottosNumInpt').eq(i).val())){
			lottoFlag = false;
			$('.lottosNumInpt').eq(i).addClass('taskContBorder');
		}else{
			if(i == 0 && Number($('.lottosNumInpt').eq(i).val()) <= 6){
				$('.lottosNumInpt').eq(i).removeClass('taskContBorder');
			}else if(i >= 1 && Number($('.lottosNumInpt').eq(i).val()) >= Number($('.lottosNumInpt').eq(i-1).val())){
				$('.lottosNumInpt').eq(i).removeClass('taskContBorder');
			}else{
				lottoFlag = false;
				$('.lottosNumInpt').eq(i).addClass('taskContBorder');
			}
		}
	}
	if(!$('#taskTbody').find('.lottosNumInpt').hasClass('taskContBorder')){
		lottoFlag = true;
	}
	if(!lottoFlag){
		layer.msg('填写信息有误！');
		return false;
	}else if(!pointFlag){
		layer.msg('填写信息有误！');
		return false;
	}else{
		var $editorId = $('.editorId');//获取编辑状态下的id
		var $pointsNumInpt = $('.pointsNumInpt');//获取编辑状态下的奖励积分
		var $lottosNumInpt = $('.lottosNumInpt');//获取编辑状态下的抽奖次数
		var checkedJson = {};//包装数据的对象
		var checkedItem = [];//包装数据的值
		for(var i=0;i<7;i++){
			var checkLis = {};//某一天的设置
			if($editorId.length){
				checkLis.id = $editorId.eq(i).attr('data-id');
			}
			checkLis.signDay = $editorId.eq(i).html();
			checkLis.signScore = $pointsNumInpt.eq(i).val();
			checkLis.drawLimit = $lottosNumInpt.eq(i).val();
			checkedItem.push(checkLis);
		}
		checkedJson.taskSignList = checkedItem;
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/task/sign/list/batchUpdate.do",
			data:JSON.stringify(checkedJson),
			contentType : "application/json",
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					});
					window.location.href = "/operation/taskManagement/checkTaskList";
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
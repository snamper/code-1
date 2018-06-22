"use strict";
layui.use(['element', 'form'], function(){
	//设置邀请风险
	var $ = layui.jquery;
	var form = layui.form();
});

$('.timeRisksNumInpt').blur(function (){//时间范围输入框失焦事件
	var $this = $(this);
	var $val = $this.val();
	if($val && $this.check().integer() && Number($val) > 0){
		$('.tooltip-times').addClass('hide');
	}else{
		$('.tooltip-times').removeClass('hide');
		return;
	}
});

$('.invitRisksNumInpt').blur(function (){//邀请数量输入框失焦事件
	var $this = $(this);
	var $val = $this.val();
	if($val && $this.check().integer() && Number($val) > 0){
		$('.tooltip-invits').addClass('hide');
	}else{
		$('.tooltip-invits').removeClass('hide');
		return;
	}
});

//调整时间范围值（+-）  
$('.setTimeBox').find('.cutRisksBtn').on('click',function (){//-
	var $this = $(this);
	var $intVal = Number($('.timeRisksNumInpt').val());
	if($intVal <= 1 || !$intVal){
		layer.msg('请输入大于0的整数！');
		return;
	}else{
		$('.timeRisksNumInpt').val($intVal-1);
	}
});
$('.setTimeBox').find('.addRisksBtn').on('click',function (){//+
	var $this = $(this);
	var $intVal = Number($('.timeRisksNumInpt').val());
	$('.timeRisksNumInpt').val($intVal+1);
});
//调整邀请数量值(+-)
$('.setInvitBox').find('.cutRisksBtn').on('click',function (){//-
	var $this = $(this);
	var $intVal = Number($('.invitRisksNumInpt').val());
	if($intVal <= 1 || !$intVal){
		layer.msg('请输入大于0的整数！');
		return;
	}else{
		$('.invitRisksNumInpt').val($intVal-1);
	}
});
$('.setInvitBox').find('.addRisksBtn').on('click',function (){//+
	var $this = $(this);
	var $intVal = Number($('.invitRisksNumInpt').val());
	$('.invitRisksNumInpt').val($intVal+1);
});

//保存设置按钮跳转
$('.invitationRiskBtn').on('click',function (){
	var data = {};
	var $setTimeVal = $('.timeRisksNumInpt').val();//获取时间范围值
	var $setInvitVal = $('.invitRisksNumInpt').val();//获取邀请数量值
	if($setTimeVal && $('.timeRisksNumInpt').check().integer() && Number($setTimeVal) > 0){
		$('.tooltip-times').addClass('hide');
		data.timeRange = $setTimeVal;
	}else{
		$('.tooltip-times').removeClass('hide');
		return;
	}
	if($setInvitVal && $('.invitRisksNumInpt').check().integer() && Number($setInvitVal) > 0){
		$('.tooltip-invits').addClass('hide');
		data.inviteAmount = $setInvitVal;
	}else{
		$('.tooltip-invits').removeClass('hide');
		return;
	}
	
	var $dealStyle1 = $('.dealStyle').find('.layui-form-checkbox').eq(0).hasClass('layui-form-checked');//标记为高风险用户
	var $dealStyle2 = $('.dealStyle').find('.layui-form-checkbox').eq(1).hasClass('layui-form-checked');//封停账号
	if($dealStyle1 && $dealStyle2){//勾选2个选项
		$('.tooltip-deals').addClass('hide');
		data.dealMethod = '3';
	}else if($dealStyle1 && !$dealStyle2){
		$('.tooltip-deals').addClass('hide');
		data.dealMethod = '1';
	}else if(!$dealStyle1 && $dealStyle2){
		$('.tooltip-deals').addClass('hide');
		data.dealMethod = '2';
	}else{//没有选择任何处理方式
		$('.tooltip-deals').removeClass('hide');
		return;
	}
	
	$.ajax({
		type: "post",
		dataType: "json",
		url: "/admin/invite/friend/limit/config.do",
		data:data,
		beforeSend:beforeSend(),
		success: function(json) {
			if(json.message == "成功") {
				layer.msg('保存成功！', {
					time: 1000, //1s后自动关闭
					icon: 1
				});
			}else{
				layer.msg(json.message, {
					time: 1000, //1s后自动关闭
					icon: 2
				});
			}
		},
		error: function(error) {
			layer.msg('保存失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
		}
	});//ajax请求
});
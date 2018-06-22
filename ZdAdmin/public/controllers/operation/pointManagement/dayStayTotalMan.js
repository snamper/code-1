"use strict";
//运营管理-每日停留积分管理
var layLoad;
layui.use(['element', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form();
	
	//更改配置按钮弹窗
	$('.editorConfigBtn').on('click', function (){
		var $stayPoint = $('.stayPonits').html()||0;//积分值
		popupTagFn($stayPoint);
	});
	//添加/修改标签弹窗
	function popupTagFn($stayPoint){
		layer.open({
		    type: 1,
		    title: '更改配置',
		    skin: 'layui-layer-molv', //加上边框
		    area: ['500px', '200px'], //宽高
		    content: '<div class="tagBox">' +
            		'<div class="tagText">' +
            			'<span class="titleTip" style="width:20%;display:inline-block;">配置参数：</span>' +
            			'<input type="text" value="'+ $stayPoint +'" name="tagName" class="layui-input newTagName" style="width:70%;display:inline-block;" lay-verify="text" autocomplete="off">' +
            		'</div>' +
            		'<div class="handelBox">' +
            			'<a href="javascript:;" class="layui-btn saveTagBtn" style="margin-right:35px;">确定</a>' +
            		'</div>' +
            	'</div>'
		});
	}
	
});

//新建/修改标签弹窗保存按钮
$('body').delegate('.saveTagBtn','click',function (){
	var $this = $(this);
	var $newPointsVal = $this.parents('.tagBox').find('.newTagName').val()||''; 
	var reg = /^[0-9]*$/;
	if(!reg.test($newPointsVal)){
		layer.msg('请输入大于等于0的整数！', {
			time: 1000, //1s后自动关闭
			icon: 2
		});
		return false;
	}else{
		layer.closeAll();
		$('.stayPonits').html($newPointsVal);
	}
});
//应用配置按钮
$('.useConfigBtn').on('click',function (){
	var $this = $(this);
	var getPoints = $('.stayPonits').html();
	$.ajax({
		type: "post",
		dataType: "json",
		url: '/admin/small/clock/setting.do',
		data: {"awardPoint": getPoints},
		beforeSend:beforeSend(),
		success: function(json) {
			if(json.message == "成功") {
				layer.msg('该配置应用成功！', {
					time: 1000, //1s后自动关闭
					icon: 1
				});
			}
		},
		error: function() {
			layer.msg('操作失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			return false;
		}
	});//ajax
});
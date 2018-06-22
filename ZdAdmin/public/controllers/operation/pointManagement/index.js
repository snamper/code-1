"use strict";
layui.use(['element','form'], function(){
	var $ = layui.jquery;
	var form = layui.form();
	var layer = layui.layer;
	//切换A积分模型
	form.on('radio(modelType)', function(data){
		var $val = $(data.elem).attr('value');
		if($val == '1'){
			$('.modelTableBox').removeClass('hide');
			$('.customModelBox').addClass('hide');
			$('#changeSubBtn').attr('data-type','1');
		}else{
			$('.customModelBox').removeClass('hide');
			$('.modelTableBox').addClass('hide');
			$('#changeSubBtn').attr('data-type','2');
		}
	});
});
//新建分段
$('.addModelBtn').on('click',function (){
	var $loopIndex = Number($('.addModelItem').find('tr:last').find('td:first').html()) + 1?Number($('.addModelItem').find('tr:last').find('td:first').html()) + 1:1;
	var addStr = '<tr>' +
		'<td>'+ $loopIndex +'</td>' +
		'<td><input type="text" class="editorText pointText" placeholder="A积分比例(整数)" value=""/></td>' +
		'<td><input type="text" class="editorText timeText" placeholder="获取间隔(整数)" value=""/></td>' +
		'<td><a class="layui-btn delModelBtn" href="javascript:;">删除</a></td>' +
	'</tr>';
	$('.addModelItem').append(addStr);
});

//删除分段
$("body").delegate('.delModelBtn','click',function (){
	var $this = $(this);
	$('.addModelItem').find($this.parents('tr')).remove();
});

//新建分段A积分比例失焦事件
$("body").delegate('.pointText','blur',function (){
	var $this = $(this);
	var reg = /^(?:\d?\d|99)$/;
	var ratioStr = $this.val();
	if(ratioStr){
		if(ratioStr == 0 || !reg.test(ratioStr)){
			layer.msg('分段A积分比例不能超过100！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			$this.val('');
		}
	}
});

//新建分段时间间隔失焦事件
$("body").delegate('.timeText','blur',function (){
	var $this = $(this);
	var reg = /^(?:\d?\d|120)$/;
	var symbolStr = $this.val();
	if(symbolStr){
		if($this.val().indexOf('H') != -1 || $this.val().indexOf('h') != -1){//用户输入的时候自带H/h
			symbolStr = symbolStr.substring(0,symbolStr.length-1);
		}
		if(symbolStr == 0 || !reg.test(symbolStr)){
			layer.msg('获取间隔为1-120！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			$this.val('');
		}else{
			$this.val(symbolStr + 'H');
		}
	}
});

//变更提交
$('#changeSubBtn').on('click',function (){
	var $this = $(this);
	var $dataType = $this.attr('data-type')?$this.attr('data-type'):'1';
	if($dataType == '1'){
		var data = {
			"modelType":'1',
			"serialNumStr":1,
			"pointProportionStr":'100',
			"timeIntervalStr":'--'
		}
	}else{//提交变更自定义模型
		var $editorTextLen = $('.editorText').length;
		var textNull = true;
		for(var i=0;i<$editorTextLen/2;i++){
			if(!$('.editorText').eq(i).val()){
				textNull = false;
			}
		}
		if(!textNull){
			layer.msg('变更失败，新建分段值不能为空！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
		}else{
			var $pointText = '', $timeText = '', $serialNumStr = '';
			for(var i=0;i<$editorTextLen/2;i++){
				$pointText += $('.pointText').eq(i).val() + ':';
				$timeText += $('.timeText').eq(i).val() + ':';
				$serialNumStr += i + ':';
			}
			$pointText = $pointText.substring(0,$pointText.length-1);
			$timeText = $timeText.substring(0,$timeText.length-1);
			$serialNumStr = $serialNumStr.substring(0,$serialNumStr.length-1);
			var data = {
				"modelType":'2',
				"serialNumStr":$serialNumStr,
				"pointProportionStr":$pointText,
				"timeIntervalStr":$timeText
			}
		}
	}
	$.ajax({
		type: "post",
		dataType: "json",
		url: "/operation/pointMan/changeModel",
		data: data,
		beforeSend:beforeSend(),
		success: function(json) {
			if(json.message == "成功") {
				layer.msg('变更成功！', {
					time: 1500, //1s后自动关闭
					icon: 1
				},function(){
					window.location.href = "/operation/pointMan";
				});
			}else{
				layer.msg(json.message, {
					time: 1500, //1s后自动关闭
					icon: 2
				})
			}
		},
		error: function() {
			layer.msg('变更失败！', {
				time: 1500, //1s后自动关闭
				icon: 2
			});
		}
	})//ajax
});
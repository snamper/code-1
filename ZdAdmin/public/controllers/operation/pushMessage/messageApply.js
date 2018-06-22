"use strict";
layui.use(['element', 'laydate', 'form' ], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	var opt1 = 1,
		opt2 = 1,
		opt3 = 1
	//选择类型
	form.on('radio(opt1)', function(data){
		opt1 = data.value;
		$($(".message_line")[0]).attr("data-disabled",opt1)
	})
	form.on('radio(opt2)', function(data){
		opt2 = data.value;
		$($(".message_line")[1]).attr("data-disabled",opt2)
	})
	form.on('radio(opt3)', function(data){
		opt3 = data.value;
		$($(".message_line")[2]).attr("data-disabled",opt3)
	})
	
	
	//保存
	$('.saveAdd').on('click', function (){
		var data = {};
		var tMsgLettersList = []
		for(var i = 0; i < $(".message_line").length; i++){
			var message = {
				id:$($(".message_line")[i]).attr("data-id"),
				name:$($(".title")[i]).val(),
				content:$($(".content")[i]).val(),
				disabled:$($(".message_line")[i]).attr("data-disabled")
			};
			if(!$($(".message_line")[i]).attr("data-disabled")) message.disabled = 0;
			if(!$($(".title")[i]).val() || !$($(".title")[i]).check().number(1,20)){
				$($('.message_line .tooltip-title')[i]).show()
				return;
			}
			if(!$($(".content")[i]).val() || !$($(".content")[i]).check().number(1,50)){
				$($('.message_line .tooltip-content')[i]).show()
				return;
			}
			if($(".time").attr("data-id") == $($(".message_line")[i]).attr("data-id")){
				message.invalidMinute = $(".time").val()
			}
			tMsgLettersList.push(message)
		}
		if(!$('.time').check().notNull() || !$('.time').check().isNum() || $('.time').val() < 0){
			$('.tooltip-time').removeClass("hide");
			return;
		}
//		tMsgLettersList = JSON.stringify(tMsgLettersList);
		data.tMsgLettersList = tMsgLettersList;
		console.log(data);
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/msg/letter/system/edit.do",
			data:JSON.stringify(data),
			contentType: 'application/json',
			beforeSend:beforeSend(),
			success: function(json) {
				layer.close(layLoad);//清除加载
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1500, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/operation/pushMessage/message";
					});
					
				}else{
					layer.msg(json.message)
				}
			},error: function(){
				layer.close(layLoad);//清除加载
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
		
	});		
	//验证
	$('.time').blur(function(){
		if(!$(this).check().notNull() || !$(this).check().isNum() || $(this).val() < 0)
			$('.tooltip-time').removeClass("hide")
		else
			$('.tooltip-time').addClass("hide")
	});
	$('.title').blur(function(){
		if(!$(this).check().number(1,20) )
			$(this).parent().parent().find('.tooltip-title').show()
		else
			$(this).parent().parent().find('.tooltip-title').hide()
	});
	$('.content').blur(function(){
		if(!$(this).check().number(1,50) )
			$(this).parent().parent().find('.tooltip-content').show()
		else
			$(this).parent().parent().find('.tooltip-content').hide()
	});
	
	

});
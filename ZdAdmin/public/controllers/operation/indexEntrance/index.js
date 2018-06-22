"use strict";
var promptBox = ""
var positionId = "",
	position = "";

$(".adjust").on("click", function() {
	var layLoad = "",
		that = this
	$.ajax({
		url:'/admin/resource/entrance/list.do', //上传接口	
		type:"get",
		dataType:"json",
		beforeSend:function(){
			layLoad = layer.load(2,{
				shade: 0.6
			});//加载等待
		},success:function(json){	
			layer.close(layLoad)
			
			if($(".layui-table").attr("data-list"))	var list = JSON.parse($(".layui-table").attr("data-list"));
			if(list.length != json.data.length) {
				layer.confirm('当前数据已经改变，请先刷新当前页面！', {
					btn: ['确认', '取消'] //按钮
				}, function() {
					window.location.href = "/operation/indexEntrance"
				},function(){
					
				})
			}else{
				position = $(that).attr("data-position");
				positionId = $(that).attr("data-id")
				openBox(position,positionId)
			}
		},error:function(){
			layer.close(layLoad)
		}
	})
	
	
})
var openBox = function(position,positionId) {
	for(var i = 0; i < $(".position option").length; i++){
		if(position == $($(".position option")[i]).attr("value")){
			$($(".position option")[i]).attr("selected","selected").siblings().removeAttr("selected")
		}	
	}
	
	$(".position").val(position)
	promptBox = layer.open({
		type: 1,
		skin: 'layui-layer-molv', //样式类名
		closeBtn: 1, //不显示关闭按钮
		anim: 1,
		shade: 0,
		area: ['400px', '300px'], //宽高
		title: ['调整资源入口', 'text-align: center; font-size: 16px;'],
		content: $('#adjustBox')
	});	
}
var changePosition = function(value){
	position = value;
}
$(".savePosition").on("click", function() {
	layer.confirm('您确定要保存吗？', {
		btn: ['确认', '取消'] //按钮
	}, function() {
		var data = {
			id:positionId,
			position:position
		}
		var layLoad = ""
		$.ajax({
			url:'/admin/resource/entrance/list.do', //上传接口	
			type:"get",
			dataType:"json",
			beforeSend:function(){
				layLoad = layer.load(2,{
					shade: 0.6
				});//加载等待
			},success:function(json){	
				layer.close(layLoad)
				
				if($(".layui-table").attr("data-list"))	var list = JSON.parse($(".layui-table").attr("data-list"));
				if(list.length != json.data.length) {
					layer.confirm('当前数据已经改变，请先刷新当前页面！', {
						btn: ['确认', '取消'] //按钮
					}, function() {
						window.location.href = "/operation/indexEntrance"
					},function(){
						
					})
				}else{
					saveMessage(data)
				}
			},error:function(){
				layer.close(layLoad)
			}
		})
		
    },function(){
		
	})
})
var saveMessage = function(data) {
	var layLoad = "";
	$.ajax({
		url:'/admin/resource/entrance/position/update.do', //上传接口	
		type:"post",
		dataType:"json", 
		data:data,
		beforeSend:function(){
			layLoad = layer.load(2,{
				shade: 0.6
			});//加载等待
		},
		success:function(json){	
			layer.close(layLoad)
			if(json.message == "成功"){
				layer.msg('保存成功！', {
					time: 1000, //1s后自动关闭
					icon: 1
				}, function(){
					window.location.href = "/operation/indexEntrance"
				});
			}else{
				layer.msg(json.message, {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		},
		error:function(){
			layer.close(layLoad)
			layer.msg('保存失败！', {
				time: 1500, //1s后自动关闭
				icon: 2
			});
		}
	});	
}
$(".apply").on("click", function() {
	layer.confirm('您确定要使用该配置吗？', {
		btn: ['确认', '取消'] //按钮
	}, function() {
		var layLoad = ""
		$.ajax({
			url:'/admin/resource/entrance/apply.do', //上传接口	
			type:"post",
			dataType:"json", 
			beforeSend:function(){
				layLoad = layer.load(2,{
					shade: 0.6
				});//加载等待
			},
			success:function(json){	
				layer.close(layLoad)
				if(json.message == "成功"){
					layer.msg('配置成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					}, function(){
						window.location.href = "/operation/indexEntrance"
					});
				}else{
					layer.msg(json.message, {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			},
			error:function(){
				layer.close(layLoad)
				layer.msg('配置失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
    	});	
	},function(){
		
	})
})

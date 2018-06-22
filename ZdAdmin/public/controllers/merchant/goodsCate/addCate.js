"use strict";
layui.use(['element', 'form'], function() {
	var form = layui.form(); //加载form模块
	var cateType = 1,		//分类类型
		firstCate = "",		//一级分类id
		status = 1;
	//分类类型
	form.on('radio(cateType)',function(data){
		console.log(data)
		cateType = data.value
		if(cateType == 1){
			$(".ifShowPar").hide()
		}else{
			$(".ifShowPar").show()
		}
	})
	//状态
	form.on('radio(status)',function(data){
		status = data.value;
	})
	//监听一级分类
	form.on('select(parentCate)', function(data){
		firstCate = data.value;
		$(".tooltip-cateType").hide()
	})
	
	
	
	//监听提交按钮
	$(".saveCate").on("click", function(){

		if(!$(".name").check().notNull() || $(".name").val().length > 4){
			$(".tooltip-name").show()
			return;
		}
		if(cateType == 2 && !firstCate){
			$(".tooltip-cateType").html("请输入大于0的正整数！").show()
			return;
		}
		if(!$(".sort").check().notNull() || !$(".sort").check().isNum() || $(".sort").val().indexOf(".") >= 0 || $(".sort").val() <= 0){
			$(".tooltip-sort").html("请输入大于0的正整数！").show()
			return;
		}
		
		
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
		
			var data = {
				"sortName":$(".name").val(),
				"sortType":cateType,
				"sortOrder":$(".sort").val(),
				"enabled":status
			}
			if(cateType == 2) data.fid = firstCate;	
			console.log(data)
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/product/sort/add.do",
				data: data,
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('新增成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							window.location.href = "/merchant/goodsCate"
						});
					}else{
						layer.msg(json.message, {
							time: 1500, //1s后自动关闭
							icon: 2
						});
					}
				},
				error: function() {
					layer.msg('新增资源失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	});
	
	//校验
	$(".name").on("blur", function() {			//资源名称
		if(!$(".name").check().notNull() || $(".name").val().length > 4){
			$(".tooltip-name").show()
		}else{
			$(".tooltip-name").hide()
		}
	})
	$(".sort").on("blur", function() {					//url
		var message = ""
		if(!$(this).check().notNull()){
			message = "请输入排序号"
			$(this).parent().parent().find(".tooltip-sort").html(message).show()
		}else{
			if(!$(this).check().isNum()){
				message = "只能输入数字"
				$(this).parent().parent().find(".tooltip-sort").html(message).show()
			}else{
				if($(this).val().indexOf(".") >= 0 || $(this).val() <= 0){
					message = "只能输入大于0的正整数"
					$(this).parent().parent().find(".tooltip-sort").html(message).show()
				}else
					$(this).parent().parent().find(".tooltip-sort").hide()
			}
		}
	})
	
})
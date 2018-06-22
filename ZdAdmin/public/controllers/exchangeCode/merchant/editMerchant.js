"use strict";
layui.use(['element', 'laydate', 'upload', 'form' ], function(){
	var $ = layui.jquery;
	var form = layui.form();
	var type = $(".section").attr("type");
	
	form.on('radio(status)', function(data) {
		type = data.value;
	})
	//上传事件传递
	$("#asImportCode").click(function(){	//视频封面     
		 $(".uploadLogo").trigger("click");
	});
	
	
	//视频封面上传
	$(".uploadLogo").change(function(){
		var fs = new FormData();
		fs.append("imageFile",$(".uploadLogo")[0].files[0]);
		if($(".uploadLogo")[0].files[0]){
			var layLoad = ""
		 	$.ajax({
				url:'/admin/file/image/upload.do', //上传接口	
				type:"post",
				dataType:"json",
				data:fs,
				processData: false,  // 告诉jQuery不要去处理发送的数据
				contentType: false,
				cache: false,     
				beforeSend:function(){
					layLoad = layer.load(2,{
						shade: 0.6
					});//加载等待
				},
				success:function(json){		
					layer.close(layLoad)
					if(json.message == "成功"){
						$("#uploadLogoShow").attr("src",json.data.httpsPath)
						$("#uploadLogoShow").attr("data-url",json.data.httpsPath)
						$(".tooltip-image").hide()
						layer.msg("上传成功");
					}else{
						layer.msg(json.message+"，请重新上传！");
					}
				}
	    	});		 	
		}		
	})
	
	
	//提交
	$(".saveMessage").on("click", function() {
		
		var data = {
			"pointName":$('.pointName').val(),
			"clientId":$(".merchantCode").val(),					
			"name":$(".merchantName").val(),
			"selfProportion":$(".proportionown").val(),
			"platformProportion":$(".proportionmerchant").val(),
			"instructions":$(".describe").val(),
			"logo":$("#uploadLogoShow").attr("data-url"),
			"exchangeUrl":$(".jumpLink").val(),
			"type":type,
			id:$(".section").attr("data-id")
		};
		
		console.log(data)
		
		if(!$('.merchantCode').val()){
			$(".tooltip-merchantCode").show()
			return;
		}
		if(!$('.merchantName').val()){
			$(".tooltip-merchantName").show()
			return
		}
		if(!$('.pointName').val() || !$('.pointName').check().number(1,10)){
			$(".tooltip-pointName").show()
			return
		}
		if(!$(".describe").val() || $(".describe").val().length > 500){
			$(".tooltip-describe").show()
			return;
		}
		var message = ""
		if(!$(".proportionown").val()){
			message = "请输入兑换比例";
			$(".tooltip-proportion").html(message).show()
			return;
		}else{
			if(!$('.proportionown').check().isNum()){
				message = "只能输入数字，可支持小数点";
				$(".tooltip-proportion").html(message).show()
				return;
			}
		}
	
		if(!$(".jumpLink").check().http() && $(".jumpLink").val()){
			$(".tooltip-jumpLink").show()
			return;
		}
	
		if(!$(".proportionmerchant").val()){
			message = "请输入兑换比例"
			$(".tooltip-proportion").html(message).show()
			return;
		}else{
			if(!$('.proportionmerchant').check().isNum()){
				message = "只能输入数字，可支持小数点"
				$(".tooltip-proportion").html(message).show()
				return;
			}
		}
		
//		return
		$.ajax({
			type: "post",
			dataType: "json",
			contentType: "application/json",
			url: "/admin/business/platform/swap/ubplatformdinstructions.do",
			data: JSON.stringify(data),
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/exchangeCode/platform"
					});
				}else{
					layer.msg(json.message)
				}
				
			},
			error: function() {
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	})
	
	//校验
	$(".merchantCode").on("blur", function() {
		if(!$('.merchantCode').val()){
			$(".tooltip-merchantCode").show()
		}else
			$(".tooltip-name").hide()
	})
	$(".merchantName").on("blur", function() {
		if(!$('.merchantName').val() || !$('.merchantName').check().number(1,10)){
			$(".tooltip-merchantName").show()
		}else
			$(".tooltip-merchantName").hide()
	})
	
	$(".describe").on("blur", function() {
		if(!$(".describe").val() || $(".describe").val().length > 500){
			$(".tooltip-describe").show()
		}else{
			$(".tooltip-describe").hide()
		}
	})
	$(".proportionown").on("blur", function() {
		var message = ""
		if(!$(".proportionown").val()){
			message = "请输入兑换比例"
			$(".tooltip-proportion").html(message).show()
		}else{
			if(!$('.proportionown').check().isNum()){
				message = "只能输入数字，可支持小数点"
				$(".tooltip-proportion").html(message).show()
			}else{
				$(".tooltip-proportion").hide()
			}
			
		}
	})
	$(".jumpLink").on("blur", function() {
		if(!$(".jumpLink").check().http() && $(".jumpLink").val()){
			$(".tooltip-jumpLink").show()
		}else{
			$(".tooltip-jumpLink").hide()
		}
	})
	$(".proportionmerchant").on("blur", function() {
		var message = ""
		if(!$(".proportionmerchant").val()){
			message = "请输入兑换比例"
			$(".tooltip-proportion").html(message).show()
		}else{
			if(!$('.proportionmerchant').check().isNum()){
				message = "只能输入数字，可支持小数点"
				$(".tooltip-proportion").html(message).show()
			}else{
				$(".tooltip-proportion").hide()
			}
			
		}
	})
	
	
});
"use strict";
layui.use(['element', 'laydate', 'upload', 'form' ], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	var type = 1,
		shortNameFlag = true,
		fullNameFlag = true;
	var _url = window.location.href,
		sourceUrl = _url.split("?source=")[1]
	//选择类型
	form.on('radio', function(data){
		type = data.value;
	})
	//上传事件传递
	$("#importAdverLogo").click(function(){	//视频封面     
		 $(".uploadAdverLogo").trigger("click");
	});
	//视频封面上传
	$(".uploadAdverLogo").change(function(){
		var fs = new FormData();
		if($("#uploadLogoShow").attr("data-url")){
			fs.append("oldPath",$("#uploadLogoShow").attr("data-url"));
		}
		fs.append("imageFile",$(".uploadAdverLogo")[0].files[0]);
		if($(".uploadAdverLogo")[0].files[0]){
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
						layer.msg("上传成功");
					}else{
						layer.msg(json.message+"，请重新上传！");
					}
				}
	    	});		 	
		}		
	})
	
	//保存
	$('.saveEdit').on('click', function (){
		
		var shortName = $(".shortName").val(); //广告主简称
		var fullName = $(".fullName").val(); 	//广告主简称
		var introduce = $(".introduce").val();  	//广告主
		var logo = $("#uploadLogoShow").attr("data-url")
		if(!$(".shortName").check().number(1,8)){
			message = "请输入8字内广告主名称"
			$('.tooltip-shortName').empty().html(message).show()
			return;
		}
		if(!$(".shortName").check().specialChar()){
			message = "广告主名称不能有特殊字符"
			$('.tooltip-shortName').empty().html(message).show()
			return;
		}
		if(!$(".fullName").check().number(1,15)){
			message = "请输入15字内广告主名称"
			$('.tooltip-fullName').empty().html(message).show()
			return;
		}
		if(!$(".fullName").check().specialChar()){
			message = "广告主名称不能有特殊字符"
			$('.tooltip-fullName').empty().html(message).show()
			return
		}
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		var data = {
			"advId":window.location.href.split("?advId=")[1],
			"type": type,
			"shortName": shortName,
			"fullName": fullName,
		}
		if(logo){
			data.logo = logo;
		}
		if(introduce){
			data.introduce = introduce;
		}
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/client/advertiserManage/updateAdver",
			data:data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1500, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/client/advertiserManage";
					});
					
				}else{
					layer.msg(json.message)
				}
			},error: function(){
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
		if(layLoad){
			layer.close(layLoad);//清除加载
		}
		
	});		
	//返回
	$(".backPre").on("click", function() {
		if(sourceUrl){
			window.location.href = sourceUrl
		}else{
			window.location.href = '/client/advertiserManage'
		}
	})
	//验证
	$('.fullName').blur(function(){
		var message = ""
		if(!$(".fullName").check().number(1,15)){
			message = "请输入15字内广告主名称"
			$('.tooltip-fullName').empty().html(message).show()
		}else{
			$('.tooltip-fullName').hide()
			if(!$(".fullName").check().specialChar()){
				message = "广告主名称不能有特殊字符"
				$('.tooltip-fullName').empty().html(message).show()
			}else{
				$('.tooltip-fullName').hide()
			}
		}
	});
	$('.shortName').blur(function(){
		var message = ""
		if(!$(".shortName").check().number(1,8)){
			message = "请输入8字内广告主名称"
			$('.tooltip-shortName').empty().html(message).show()
		}else{
			$('.tooltip-shortName').hide()
			if(!$(".shortName").check().specialChar()){
				message = "广告主名称不能有特殊字符"
				$('.tooltip-shortName').empty().html(message).show()
			}else{
				$('.tooltip-shortName').hide()
			}
		}
	});
	
	

});
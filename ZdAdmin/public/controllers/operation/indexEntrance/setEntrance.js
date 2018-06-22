"use strict";
layui.use(['element', 'form'], function() {
	$($('.firstPage .course_nr2 li')[0]).find('.shiji').slideDown();
	var form = layui.form(),
		layer = layui.layer,
		laydate = layui.laydate;
	$ = layui.jquery;
	

	//上传事件传递
	$(".uploadImgBtn").click(function(){	
		var id = $(this).attr("attr-id");
		for(var i = 0; i < $(".uploadImg").length; i++){
			if(id == $($(".uploadImg")[i]).attr("attr-id")){
				$($(".uploadImg")[i]).trigger("click");
			}
		}
	});
	
	$(".imgShow img").click(function(){   
		var id = $(this).attr("attr-id");
		for(var i = 0; i < $(".uploadImg").length; i++){
			if(id == $($(".uploadImg")[i]).attr("attr-id")){
				$($(".uploadImg")[i]).trigger("click");
			}
		}
	});
	
	var entransList = $(".layui-form").attr("data-list");
	if(entransList) entransList = JSON.parse(entransList);
	else return;
	for(var i = 0; i < entransList.length; i++){
		form.on('radio(status'+i+')',function(data){
			var item = data.value.split("/");
			for(var n = 0; n < entransList.length; n++){
				if(entransList[n].id == item[1]){
					var message = entransList[n];
					message.status = item[0];
					if(item[0] == 2){	//禁用
						message.position = "";
						for(var j = 0; j < entransList.length; j++){
							if(entransList[j].position && j > n) entransList[j].position -= 1; 
						}
						entransList.splice(n,1);
						entransList.push(message)
					}else{				//启用
						for(var j = 0; j < entransList.length; j++){
							if(!entransList[j].position){
								entransList.splice(n,1);
								if(j > n) j--;
								if(n<entransList.length) n--;
								message.position = j+1;
								entransList.splice(j,0,message);
//								console.log(entransList)
								return;
							}
						}
					}
				}
			}
		})
	}
	$(".uploadImg").on("change", function(){
		$(this).parent().find(".uploadImgBtn").hide();
		var fileObj = $(this)[0];
		var windowURL = window.URL || window.webkitURL;
		var dataURL;  
		if (fileObj && fileObj.files && fileObj.files[0]) {  
            dataURL = windowURL.createObjectURL(fileObj.files[0]);  
            $(this).parent().find(".imgShow img").attr('src', dataURL).parent().show();  
            $(this).parent().parent().parent().find(".tooltip-tips").empty().hide();
        } else {  
            dataURL = $file.val();  
            var imgObj = document.getElementById("preview");  
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";  
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;  
        }  
	})
	var uploadIndex = 0; //上传次数
	var layLoad = "";
	var uploadImages = function() {
		var fs = new FormData();
		
		if($($(".uploadImg")[uploadIndex])[0].files[0]){
			fs.append("imageFile",$($(".uploadImg")[uploadIndex])[0].files[0]);
			if($($(".imgShow img")[uploadIndex]).attr("attr-url"))	//原始的src路径
				fs.append("oldPath",$($(".imgShow img")[uploadIndex]).attr("attr-url"));
		}else{
			uploadIndex ++;
			if(uploadIndex < entransList.length) uploadImages();
			else {
				if(layer) layer.close(layLoad)
				saveMessage()
				return entransList;
			}
			return;
		}
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
				if(json.message == "成功"){
					var id = $($(".uploadImg")[uploadIndex]).attr("attr-id");
					for(var i = 0; i < entransList.length; i++){
						if(id == entransList[i].id)
							entransList[i].iconUrl = json.data.httpsPath
					}
					uploadIndex ++;
					if(uploadIndex < entransList.length) uploadImages();
					else {
						saveMessage()
						layer.close(layLoad)
						return entransList;
					}
				}else{
					layer.close(layLoad)
					layer.msg(json.message+"，请重新上传！");
				}
			}
    	});	
	}
	var saveMessage = function() {
		var data = {resourceEntranceList:[]},resourceEntranceList = [];
		for(var i = 0; i < entransList.length; i++){
			var message = {
				id:entransList[i].id,
				position:entransList[i].position,
				resourceName:entransList[i].resourceName,
				iconUrl:entransList[i].iconUrl,  
				status:entransList[i].status
			}
			for(var n = 0; n < $(".name").length; n++){
				if(entransList[i].id == $($(".name")[n]).attr("attr-id")){
					message.customName = $($(".name")[n]).val();
				}
			}
			resourceEntranceList.push(message)
		}
		data.resourceEntranceList = JSON.stringify(resourceEntranceList);
		$.ajax({
			url:'/admin/resource/entrance/config/save.do', //上传接口	
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
	$(".save").on("click", function() {
		var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
		for(var i = 0; i < $(".name").length; i++){
			if($($(".name")[i]).val() &&( !reg.test($($(".name")[i]).val()) || !$($(".name")[i]).check().number(1,4))){		//有过有名称但是格式不正确
				$($(".tooltip-tips")[i]).empty().html("自定义名称最多可输入4个汉字").show()
				return;
			}
		}
		for(var i = 0; i < $(".imgShow img").length; i++){
			if(!$($(".imgShow img")[i]).attr("src")){
				for(var n = 0; n < entransList.length; n++){
					if(entransList[n].id == $($(".imgShow img")[i]).attr("attr-id") && entransList[n].status == 1){	//如果启用状态才判断
						$($(".tooltip-tips")[i]).empty().html("请选择图片").show()
						return;
					}
				}
				
			}
		}
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			uploadImages()
		},function(){
			
		})
	})
	
	
	$(".name").blur(function() {	//零售价
		var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
		if($(this).val() && (!reg.test($(this).val()) || !$(this).check().number(1,4)))
			$(this).parent().parent().find('.tooltip-tips').empty().html("自定义名称最多可输入4个汉字").show();
		else
			$(this).parent().parent().find('.tooltip-tips').empty().hide();
	})

	
});
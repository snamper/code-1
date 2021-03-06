"use strict";
layui.use(['element', 'form', 'upload'], function() {
	var form = layui.form(),
		layer = layui.layer,
		laydate = layui.laydate;
	$ = layui.jquery;
	var type = $(".updatetype").attr("data-type");	
	var _url = window.location.href,
		versionId = _url.split("appVersionId=")[1]
	//上传事件传递
	$("#asImportCode").click(function(){	//商品列表     
		 $(".uploadLogo").trigger("click");
	});
	$("#uploadLogoShow").click(function(){	//商品列表     
		 $(".uploadLogo").trigger("click");
	});
	$("#ImportupBag").click(function(){	//商品列表     
		 $(".uploadBag").trigger("click");
	});
	//更新单个图片
	$("body").delegate(".goodsDetailImg","click",function(){
		$(".goodsDetail").trigger("click");
		 curGoodsImg = $(this).attr("src");	//记录要替换的原路径
	});
	form.on('radio', function(data){
		type = data.value;
	})
	//logo上传
	$(".uploadLogo").change(function(){
		var fs = new FormData();
		if($("#uploadLogoShow").attr("data-url")){
			fs.append("oldPath",$("#uploadLogoShow").attr("src"));
		}
		fs.append("imageFile",$(".uploadLogo")[0].files[0]);
		if($(".uploadLogo")[0].files[0]){
		 	$.ajax({
				url:'/admin/file/image/upload.do', //上传接口	
				type:"post",
				dataType:"json",
				data:fs,
				processData: false,  // 告诉jQuery不要去处理发送的数据
				contentType: false,
				cache: false,              
				success:function(json){		
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
	var flag = false;		//用来标识是否更换版本
	//版本上传
	 $(".uploadBag").change(function(){
	 	flag = true;
	 	layer.msg("选择文件成功！");
	 })
	//保存版本
	$(".saveVersion").on("click", function() {
		var fs = new FormData();
		fs.append("versionCode",$(".versionCode").val());
		fs.append("logo",$("#uploadLogoShow").attr("data-url"));
		fs.append("content",$(".content").val());
		fs.append("downloadUrl",$(".uploadBag").attr("data-url"));
		
		fs.append("type",type);
		if(flag){
			fs.append("packageFile",$(".uploadBag")[0].files[0]);
			fs.append("packageName",$(".uploadBag")[0].files[0].name);
		}
		fs.append("id",versionId)
		if(!$(".versionCode").val()){
			layer.msg("请输入版本号！");
			return;
		}
		if(!$("#uploadLogoShow").attr("data-url")){
			layer.msg("请上传应用LOGO！");
			return;
		}
		var layLoad = ""
		$.ajax({
			url: "/admin/app/version/update.do",
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
			
			success: function(json) {
				layer.close(layLoad)
				if(json.message == "成功") {
					layer.msg('修改成功！', {	
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href="/system/versionManage";
					});
					
				}else{
					layer.msg(json.message)
				}
			},
			error: function() {
				layer.close(layLoad)
				layer.msg('修改失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	})

});
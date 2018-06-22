"use strict";
layui.use(['element'],function(){
	var $ = layui.jquery;
	
});
//数据提交
var commitData = function(){
	if($("#tenantInfo").val() && !$("#tenantInfo").check().number(1,200)){
		layer.msg('超出限制字数，请重新编辑(200字以内)！', {
			time: 2500, //1s后自动关闭
			icon: 2
		});
		return false;
	}
	if($("#shortName").check().number(1,8) && $("#full_name").check().number(1,15) && $('#uploadImg').attr('src')){
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		 var data = new FormData();
		 data.append("fileName",$("#addTenants")[0].files[0].name);
		 data.append("file",$("#addTenants")[0].files[0]);
		 data.append("fullName",$("#full_name").val());
		 data.append("shortName",$("#shortName").val());
		 data.append("introduce",$("#tenantInfo").val()||'');
		 if($('.layui-form-radio').eq(0).hasClass('layui-form-radioed')){
		 	data.append("deliverWay",'1');
		 }else if($('.layui-form-radio').eq(1).hasClass('layui-form-radioed')){
		 	data.append("deliverWay",'2');
		 }
		 if($('.layui-form-radio').eq(2).hasClass('layui-form-radioed')){
		 	data.append("salesWay",'1');
		 }else if($('.layui-form-radio').eq(3).hasClass('layui-form-radioed')){
		 	data.append("salesWay",'2');
		 }
		 $.ajax({
			 url:'/admin/merchant/create.do', //上传接口	
			 type:"post",
			 dataType:"json",
			 data:data,
			 processData: false,  // 告诉jQuery不要去处理发送的数据
			 contentType: false,
			 cache: false,              
			 success:function(json){
			 	layer.close(layLoad);//清除加 载
			     if(json.message == "成功"){
			         window.location.href="/client/tenantManagement/tenantList";
			     }else{
					 layer.msg(json.message+"，请重新上传！");
				 }
			 },
			 error: function (error){
			 	layer.msg("操作失败！");
			 	return false;
			 }
		 });
	 }else{
	 	if(!$('#shortName').val()){
	 		$('.tooltip-shortName').removeClass('hide');
	 		return false;
	 	}else if(!$('#full_name').val()){
	 		$('.tooltip-tenantFullName').removeClass('hide');
	 		return false;
	 	}else if(!$('#uploadImg').attr('src')){
	 		$('.tooltip-tenantLogo').removeClass('hide');
	 		return false;
	 	}
	 }
};

//新建商户页面的返回操作
$('#tenantsBackBtn').on('click', function (){
	layer.confirm('返回后数据不保存，确认返回？', {
		btn: ['确认', '取消'] //按钮
	}, function() {
		window.location.href="/client/tenantManagement/tenantList";
	});
});

//选取图片操作;
$("#addTenants").change(function(){
	var fr = new FileReader();
//	 console.log($(this)[0].files[0].name);
	if(fr){
		if($(this)[0].files[0]){
			fr.readAsDataURL($(this)[0].files[0]);
		    fr.onloadend = function(e) {  
	            $("#uploadImg")[0].src = e.target.result;
	        }; 
		}
	}else{
		 alert("您的浏览器不支持FileReader！");
	}	
})

//输入框验证
$('#shortName').blur(function (){//1-8个字
	if($("#shortName").check().number(1,8)){
		$('.tooltip-shortName').addClass('hide');
	}else{
		$('.tooltip-shortName').removeClass('hide');
	}
});
$('#full_name').blur(function (){//1-15个字
	if($("#full_name").check().number(1,15)){
		$('.tooltip-tenantFullName').addClass('hide');
	}else{
		$('.tooltip-tenantFullName').removeClass('hide');
	}
});
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
	if($("#shortName").check().number(1,8) && $("#fullName").check().number(1,15) && $('#imgShow').attr('src')){
		 var data = new FormData();
		 var file,logo;
		 if($("#addTenants")[0].files[0]){
			 logo = $("#addTenants")[0].files[0].name;
			 file = $("#addTenants")[0].files[0];
			 data.append("file",file);
			 data.append("logo",logo);
		 }else{
		 	data.append("logo",$('#imgShow').attr('src'));
		 }
		 data.append("merchantId",$("#addTenants").attr("data-id"));
		 data.append("shortName",$("#shortName").val());
		 data.append("fullName",$("#fullName").val());
		 data.append("introduce",$("#tenantInfo").val()||'');
		 if($('.layui-form-radio').eq(0).hasClass('layui-form-radioed')){
		 	data.append("salesWay",'1');
		 }else if($('.layui-form-radio').eq(1).hasClass('layui-form-radioed')){
		 	data.append("salesWay",'2');
		 }
		 $.ajax({
			 url:'/admin/merchant/update.do', //上传接口	
			 type:"post",
			 dataType:"json",
			 data:data,
			 processData: false, 
			 contentType: false,
			 cache: false,              
			 success:function(json){
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
	 	}else if(!$('#fullName').val()){
	 		$('.tooltip-tenantFullName').removeClass('hide');
	 		return false;
	 	}
	}
};

//编辑商户页面的返回操作
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
	 if(fr){
		if($(this)[0].files[0]){
			fr.readAsDataURL($(this)[0].files[0]);
		    fr.onloadend = function(e) {  
	            $("#imgShow")[0].src = e.target.result;
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
$('#fullName').blur(function (){//1-15个字
	if($("#fullName").check().number(1,15)){
		$('.tooltip-tenantFullName').addClass('hide');
	}else{
		$('.tooltip-tenantFullName').removeClass('hide');
	}
});
"use strict";
layui.use(['element', 'upload'], function(){
//设置商户推荐编辑页面
	$ = layui.jquery;	
    //选取图片操作;
     $("#addTenants").change(function(){
	     var fr = new FileReader();
	     if(fr){
	     	if($(this)[0].files[0]){
				fr.readAsDataURL($(this)[0].files[0]);
			    fr.onloadend = function(e) {  
		            $("#manCoverImg")[0].src = e.target.result;
		        }; 
			} 
	     }else{
		     alert("您的浏览器不支持FileReader！");
	     }	  	 
     });
});
//数据提交
 var commitData = function(type){
     var data = new FormData();
	 if($("#addTenants")[0].files[0]){
		 data.append("homeImage",$("#addTenants")[0].files[0].name);
         data.append("file",$("#addTenants")[0].files[0]);
	 }else{
	 	if($('#manCoverImg').attr('src')){
	 		data.append("homeImage",$('#manCoverImg').attr('src'));
	 	}else{
	 		layer.msg("请上传商户封面图！");
		 	return false;
	 	}
	 }		     
     data.append("merchantId",$("#merchantId").attr("data-id"));
	 data.append("status",type);
	 if($('#label').val()){
	 	if($('#label').check().number(1,4)){
	 		data.append("label",$('#label').val());
	 	}else{
 			$('.tooltip-manLabel').removeClass('hide');
 			return false;
	 	}
	 }
	 if(!$('.platWayBox').find('.layui-form-checked').length){//验证显示平台的选择
	 	layer.msg("请选择显示平台！");
	 	return false;
	 }else{
	 	if($('.platWayBox').find('.layui-form-checked').length == 1){
	 		if($('.platWayBox').find('.layui-form-checked').find('span').html() == 'ios'){
	 			data.append("phoneType",2);
	 		}else{
	 			data.append("phoneType",1);
	 		}
	 	}else{
	 		data.append("phoneType",0);
	 	}
	 }
	 if(getQueryString('online')){
		var $urls = "/admin/merchant/online/edit.do";
	}else{
		var $urls = "/admin/merchant/beset/new.do";
	}
     $.ajax({
	     url:$urls,
	     type:"post",
	     dataType:"json",
	     data:data,
	     processData: false, 
	     contentType: false,
	     cache: false,              
	     success:function(json){
	     	if(type == 0){
	     		//online：在售商品直接编辑商户(只有保存按钮，没有上架按钮)
				if(getQueryString('online')){
					window.location.href = "/operation/merManagement/mersReferMan";
				}else{
					window.location.href = "/operation/merManagement/offUpShelf";
				}
	     	}else{
	     		if(json.message == "成功"){				
		            window.location.href="/operation/merManagement/offUpShelf";
		        }else{
				    layer.msg(json.message);
				    return false;
			    }
	     	}
	     },
		 error: function (error){
		 	layer.msg("操作失败！");
		 	return false;
		 }
     });
 };

  //标签验证
 $('#label').blur(function(event) {
 	var $label = $('#label').val();
 	if($label && $('#label').check().number(1,4)){
		$('.tooltip-manLabel').addClass('hide');
	}else if($label && !$('#label').check().number(1,4)){
		$('.tooltip-manLabel').removeClass('hide');
		return false;
	}else{
		$('.tooltip-manLabel').addClass('hide');		
	}
 });
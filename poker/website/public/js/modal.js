/***首页弹窗及滚动控制*****************
*******v1.0************************
*****************************/
"use strict"
var useLange = true;
var modalAlert = {	
	 add:function(lang){	
         var domText = '<div';	
         
			 domText += ' class="modalAlertWrap">'+
		     '<div class="modalAlertLayout"></div>'+
	         '<div class="modalAlert">'+
		     '<div class="modalLoading"><div class="modalLoadingLay"></div><div lang-text="messageInfo" class="modalLoadingText">邮件发送中。。。</div></div>'+
		     '<p class="modalAlertTitle" lang-text="message">Send message</p>'+
		     '<div class="modalAlertContent">'+
             '<div class="control-group form-inline" style="margin-top:20px;">'+
                 '<label class="control-label" lang-text="name">Name</label>'+
                 '<div class="controls inline-block">'+
                     '<input type="text" id="cusName" data-filter="0" lang-text="namePlaceHolder" placeholder="Please enter your name">'+
                 '</div>'+
             '</div>'+
			 '<div class="control-group form-inline">'+
                 '<label class="control-label" lang-text="phone">Telephone</label>'+
                 '<div class="controls inline-block">'+
                     '<input type="text" id="cusPhone" lang-text="phonePlaceHolder" data-filter="0" placeholder="Please enter your phone">'+
                 '</div>'+
             '</div>'+
			 '<div class="control-group form-inline">'+
                 '<label class="control-label" lang-text="eMail">Email</label>'+
                 '<div class="controls inline-block">'+
                     '<input type="text" id="cusMail" data-filter="0" lang-text="emailPlaceHolder" placeholder="Please enter your e-mail">'+
                 '</div>'+
             '</div>'+
			 '<div class="control-group form-inline">'+
                 '<label class="control-label left" lang-text="messageBoard" >Message Board</label>'+
                 '<div class="controls inline-block">'+
                     '<textarea class="alertTextarea" name="" id="cusText" cols="30" rows="10"></textarea>'+
                 '</div>'+
             '</div>'+
			 '<div class="control-group form-inline alertBtnBox" style="text-align:center">'+
			     '<button class="btn btn-primary" lang-text="send" onclick=sendMail()>Send</button>'+
			     '<button class="btn btn-danger" style="margin-left:20px;" onclick="modalAlert.hide()" lang-text="cancel">Cancel</button>'+
			 '</div>'+
		     '</div>'+
		     '<div class="modalAlertExit" onclick="modalAlert.hide()">X</div>'+
		     '</div>'+
             '</div>';		 
		 
			 $("body").append(domText);
		  	if(lang.html()=="联系我们"){
				setLang("sm_cn");
				useLange = false;
			}else if(lang.html()=="Contact Us"){
				setLang("en_us");
				useLange = true;
			}else{
				return console.log("undefined language!")
			} 
	 },
	 hide:function(){
		 $(".modalAlertWrap").fadeOut("fast",function(){
			 $(".modalAlertWrap").remove();
		 });
	 },
	 show:function(lang){        	 
		 this.add(lang);
		 $(".modalAlertWrap").fadeIn();
		 $(".modalAlert").animate({top:100});
	 },	
 	 
};
//判断某个集合是否属于某数组；
var isInArray = function(arr,arrs){   //arr:集合，arrs：数组
	 for(var i = 0;i<arrs.length;i++){
		 if(arr===arrs[i]){
			 return true;
		 }
	 };
	 return false;
};
var navOn = function(e){  //滚动导航切换;
	 e.addClass("navActive") 
	  .attr("data-on","on");
	 $("title").text(e.text()+"--天悦互动");
	 e.parent("li").siblings("li").find("a").removeClass("navActive")
		                                    .removeAttr("data-on");
	 console.log(e.text())										
};
//过滤器
var filterText = function(type,$ele){
	 switch(type){
		 case "name": //姓名		 
		 if(!$ele.val()){
			 $ele.parent().find(".errorTips").remove();
			 $ele.parent().append('<p class="errorTips" lang-text="empty">输入不能为空！</p>');
			 $ele.attr('data-filter',"0");
		 }else if($ele.val().length > 15){
			 $ele.parent().find(".errorTips").remove();
			 $ele.parent().append('<p class="errorTips" lang-text="nameInfo">您输入的名字超过15个字符！</p>');
			 $ele.attr('data-filter',"0");
		 }else{
			 $ele.attr('data-filter',"1");
			 $ele.parent().find(".errorTips").remove();
		 }
		 break;
		 case "phone": //电话
         var phone = !(/^1[34578]\d{9}$/.test($ele.val()));		 //座机正则
         var tel = !(/^0\d{2,3}-?\d{7,8}$/.test($ele.val()));     //手机正则		        		 
		 if(!$ele.val()){
			 $ele.parent().find(".errorTips").remove();
			 $ele.parent().append('<p class="errorTips" lang-text="empty">输入不能为空！</p>');
		 }else if(tel&&phone){
			 $ele.parent().find(".errorTips").remove();
			 $ele.attr('data-filter',"0");
			 $ele.parent().append('<p class="errorTips" lang-text="phoneInfo">电话有误，请重新输入！</p>');
		 }else{
			 $ele.attr('data-filter',"1");
			 $ele.parent().find(".errorTips").remove();
		 }
		 break;
		 case "email": //邮箱        		 
		 if(!$ele.val()){
			 $ele.parent().find(".errorTips").remove();
			 $ele.parent().append('<p class="errorTips" lang-text="empty">输入不能为空！</p>');
		 }else if(!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test($ele.val())){
			 $ele.parent().find(".errorTips").remove();
			 $ele.attr('data-filter',"0");
			 $ele.parent().append('<p class="errorTips" lang-text="emailInfo">邮箱有误，请重新输入！</p>');
		 }else{
			 $ele.attr('data-filter',"1");
			 $ele.parent().find(".errorTips").remove();
		 }
		 break;
		 default:
		 break;
	 }
	 if(useLange){
	 	setLang("en_us");
	 }else{
	 	setLang("sm_cn");
	 }
	
};
//邮件提交
var sendMail = function(){	
	 var tips = $(".modalAlertContent").find('[data-filter="0"]');
	 if(tips.length>0){   //过滤未通过	     
		 $("#cusName").trigger("blur");
		 $("#cusPhone").trigger("blur");
		 $("#cusMail").trigger("blur");
	 }else{  //验证通过,发送请求;
		 var data = {
			 name:$("#cusName").val(),
			 phone:$("#cusPhone").val(),
			 mail:$("#cusMail").val(),
			 msg:$("#cusText").val()
		 };
		 $.ajax({
			 type:"post",
			 dataType:"json",
			 url:"/",
			 data:data,
			 success:function(data){
                 if(data.msg=="success"){
					 $(".modalLoading").find(".modalLoadingText").text("邮件发送成功！");				     	
				 }else{
					 $(".modalLoading").find(".modalLoadingText").text(data.msg);
				 };	
				 setTimeout(function(){
					 $(".modalAlertWrap").remove();
				 },500);
			 },
			 beforeSend:function(){
				 $(".modalLoading").show();
			 },
			 erroe:function(error){
				 console.log(error);
			 }
		 });
	 }
};
$(function(){	 	 
	 //邮件弹窗文本过滤	 
	 $("body").delegate("#cusName","blur",function(){
		 var $this = $(this);
         filterText("name",$this);
     });
	 $("body").delegate("#cusPhone","blur",function(){
		 var $this = $(this);
         filterText("phone",$this);
     });
	 $("body").delegate("#cusMail","blur",function(){
		 var $this = $(this);
         filterText("email",$this);
     });		 
});


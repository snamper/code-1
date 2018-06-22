"use strict";
var isNavClick = false;
function homeClass(){
	$(".page1_content").find(".p1").removeClass("fadeInRight animated infinte")
	$(".page1_content").find(".p2").removeClass("fadeInLeft animated infinte")
	$(".page1_content").addClass("hide")
//		$(".home").css("border-bottom","none");
}
function playerClass(){
	$(".h3").removeClass("flipInY animated infinte")
	$(".page2_content").find(".title1").removeClass("fadeInRight animated infinte")
	$(".page2_content").find(".title").removeClass("fadeInLeft animated infinte")
	$(".page2_content").addClass("hide")
}

function developerClass(){
	$(".page3_content").find("h3").removeClass("fadeInDown animated infinte")
	$(".page3_content").find(".p1").removeClass("rotateInDownLeft animated infinte")
	$(".page3_content").find(".p2").removeClass("rotateInDownLeft animated infinte")
	$(".page3_content").addClass("hide")
}
function operatorClass(){
	$(".page4_content").find("h3").removeClass("fadeInUp animated infinte")
	$(".page4_content").find(".p1").removeClass("rotateInDownRight animated infinte")
	$(".page4_content").find(".p2").removeClass("rotateInDownRight animated infinte")
	$(".page4_content").addClass("hide")
}
function paperClass(){
	$(".page5_content").find("h3").removeClass("pulse animated infinte")
	$(".page5_content").addClass("hide")
}
function goToByScroll(id){
	 isNavClick = true;
	 var topHeight = $("#"+id).offset().top;
     $('html,body').animate({scrollTop: topHeight},10,function(){
     	isNavClick = false;
     });
     document.cookie="name="+id;
}
var largeLoadeIndex = 0;
function addIndex(){
	largeLoadeIndex++;
	if(largeLoadeIndex > 19){  //show content
		 return loadingClosed();	
	}else{
		 return false;
	} 
}
var loadingClosed = function(){
	 $("body").removeClass("body_init");
	 if(getCookie("name")){
		$("."+getCookie("name")).addClass("nav_active");
		goToByScroll(getCookie("name"))
	 }else{
		$(".home").addClass("nav_active");
	 }
	 $(".loading").fadeOut(100);
}
function getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg)) {
			return unescape(arr[2]);
		} else {
			return null;
		}
}
$(function(){		
	//点击事件
	$(".a1").click(function(){
		$(".info").removeClass("hide")
	})
	$(".a2").click(function(){
		$(".info").removeClass("hide")
	})
	$(".close").click(function(){
		$(".info").addClass("hide")
	})
	
	$(".nav_link").delegate("li","click",function(){
		$(this).find("a").addClass("nav_active");
		//$(".home").addClass("nav_active");
		$(this).siblings().find("a").removeClass("nav_active")
		// alert("3333")
	})
	
	var m1 = 0;     // 滚动的值
	window.onscroll = function(){
		var h1 = $(".page1").height();
		if(isNavClick){
			return;
		}
		m1 = document.documentElement.scrollTop || document.body.scrollTop;
		m1 = Math.ceil(m1)
	    if( m1<0.7*h1){
    		$(".home").parent().siblings().find("a").removeClass("nav_active");
	    	$(".home").addClass("nav_active");	    	
	    	document.cookie="name=home";    	
    	}
	    if(m1>=0.7*h1 && m1<1.7*h1){
    		$(".player").parent().siblings().find("a").removeClass("nav_active");
	    	$(".player").addClass("nav_active");	    	
	    	document.cookie="name=player";    	
	    }
	    if(m1>=1.7*h1 && m1<2.7*h1){
	    	$(".developer").parent().siblings().find("a").removeClass("nav_active");
	    	$(".developer").addClass("nav_active");
	    	document.cookie="name=developer";    	
	    }
	    if(m1>=2.7*h1 && m1<3.7*h1){
	    	$(".operator").parent().siblings().find("a").removeClass("nav_active");
	    	$(".operator").addClass("nav_active");
	    	document.cookie="name=operator";	    	
	    }
	    if(m1>=3.7*h1 && m1<4.5*h1){
	    	$(".paper").parent().siblings().find("a").removeClass("nav_active");
	    	$(".paper").addClass("nav_active");	    				
	    }
	}
	if(getCookie("language") == "cn"){
		 setLang("sm_cn");
		 $(".nav_link").removeClass("set_en").addClass("set_cn");
		 $(".changeLan").css("fontSize","14px");
		 $("[lang-text='homeContent2']").removeClass("block");
	}else{
		 setLang("en_us");
		 $(".nav_link").removeClass("set_cn").addClass("set_en");
		 $(".changeLan").css("fontSize","12px");
		 $("[lang-text='homeContent2']").addClass("block");
	}	
});
var changeLang = function(e){
	if(e.html()=="中文"){
		 $(".nav_link").removeClass("set_en").addClass("set_cn");
		 e.css("fontSize","14px");
		 $("[lang-text='homeContent2']").removeClass("block");
		 document.cookie="language=cn";
		 setLang("sm_cn");
	}else if(e.html()=="EN"){
		 $(".nav_link").removeClass("set_cn").addClass("set_en");
		 e.css("fontSize","12px");
		 $("[lang-text='homeContent2']").addClass("block");
		 document.cookie="language=en";
		 setLang("en_us");
	}else{
		return console.log("undefined language!")
	}
}




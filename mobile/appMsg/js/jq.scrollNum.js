"use strict";
(function($){
	$.fn.scrollNum = function(opt){
		 var dft = {
			 num:"",  //box width
			 show:"0",  //default value
			 result:"0", //result value
			 init:false, //is first render
			 animated:false,   //is animated
		 };
		 dft = $.extend(dft,opt);
		 var _this = $(this);
		 //render num box;  数字的盒子
      	 var renderNumBox = function(arg){
			 if(dft.init){
				 var length = arg.toString().length;			 
			     var html = new Array();
			     var str = ""
			     for(var i=0;i<length;i++){
				     html.push("<div class='number number"+ i +"'><ul class='scroll'> ");
				     for(var j=0;j<10;j++){
					     str+="<li>"+j+"</li>";
				     }
				     var boxStr = str + "</ul></div>";
				     str="";
				     html.push(boxStr);
			     }
			     var renderHtml="";
			     for(var i=0;i<html.length;i++){
				     renderHtml+= html[i];
			     }			 
			     _this.empty().append(renderHtml);	 
			     return true;
			 }			 
		 }
		 //default value  数字的渲染
		 function initialDefault(reg) {
	     	var regNew = reg.toString();  // 523
	     	var length = $(".number").length
	     	for(var i=0; i<regNew.length; i++) {
	     		var ii = regNew[regNew.length-1-i], len = length - i - 1, height = parseFloat(( $(".number li").height())* ii );
	     		$(".number"+len).find(".scroll").css("marginTop", -height)
	     	}	
	     }
		 var renderDefaultValue = function(arg){
			 if(dft.init){ //变换数值
			 	var reg=arg;
			     initialDefault(reg);
			     return true;
			 }
		 }
		 //animated result  进入有动画
		 function initialResult(reg) {
	     	var regNew = reg.toString();  // 523
	     	var length = $(".number").length
	     	for(var i=0; i<regNew.length; i++) {
	     		var ii = regNew[regNew.length-1-i], len = length - i - 1,height = parseFloat(( $(".number li").height() )* ii );
	     		$(".number"+len).find(".scroll").animate({ marginTop: - height }, 1500, "swing");
	     	}	
	     }
		 var renderResult = function(arg){
			 if(dft.animated){ //animated
			 	var reg=arg;
			     initialResult(reg);
			     return true;
			 }
		 }
		 //init
		 var init = function(){
			 renderNumBox(dft.num);
			 renderDefaultValue(dft.show);
			 renderResult(dft.result);
		 }
		 init();
	}
})($);
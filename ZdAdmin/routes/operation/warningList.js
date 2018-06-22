"use strict";
/**
   requset data for nav list,then request for page list;
**/
var http=require('http'); 
var url = require("url"); 
var cookie = require('cookie');
var config = require('../../controller/config')
var querystring = require('querystring');
function warningList(req,res,content){
	 var body1 = "";
	 var body2 = "";
     var options1 = {
		 host: config.serviceHost,
		 port:config.servicePort,
		 path:"/admin/sys/alert/mail/list.do", //请求地址
		 headers:req.headers		 		
	 }; 
	 var options2 =  {
        host: config.serviceHost,
        port: config.servicePort,
        path: "/admin/sys/alert/base/list.do", //请求地址
        headers:req.headers
    }
	 var options3 = {
		 host: config.serviceHost,
		 port:config.servicePort,
		 path:"/admin/login/user/resource/meuns.do", //请求地址
		 headers:req.headers		 		
	 };
     
     var contents = "";
    if(url.parse(req.url).query){
		 contents = url.parse(unescape(req.url),true).query;
	 }else{			 	
	 	contents = {
		 pNo:"1",
		 pSize:"10"
    	};
   	}
	 contents = querystring.stringify(contents);
	 options1.path += "?" + contents;
     contents = "";
    
	 var userMessage = JSON.parse(cookie.parse(req.headers.cookie).userMessage);
	 var menuFirstList = JSON.parse(cookie.parse(req.headers.cookie).resource);
	 var curSourceCodeMenu = "";
     http.get(options1,function(s1Res) {  
         s1Res.on('data',function(data){  
			 body1 += data;
         });
         s1Res.on("end",function(){
			 var warningList = JSON.parse(body1.toString("utf-8"));		
//			 console.log(warningList)
			
			 http.get(options2,function(s2Res){
				 s2Res.on("data",function(data){
					 body2 += data; 
				 });
				 s2Res.on("end",function(){
					 var bodyData = JSON.parse(body2.toString("utf-8"));		
					 var menuName = ""
					 var navThird = "/operation/accountRiskRating/waringRule",
					 	navSec = "/operation/accountRiskRating"
		            if(navThird) {
		                menuName = navThird + "="
		            } else {
		                menuName = navSec + "="
		            }
				     if(req.headers.cookie) {
					     var splitCookie = req.headers.cookie.split(";");
					     for(var j = 0; j < splitCookie.length; j++) {
						     if(splitCookie[j].split(menuName).length > 1) {
							     curSourceCodeMenu = JSON.parse(splitCookie[j].split(menuName)[1])
						     };
					     };
				     };
                     http.get(options3,function(s3Res) {     //同步请求再去请求菜单并一起返回
						 var body3 = ""
                         s3Res.on('data', function (data) {
                             body3 += data;
                         });
                         s3Res.on("end", function () {
                             var navList = JSON.parse(body3.toString("utf-8"));
                             console.log(navList)
                             
                             if (!navList || !navList.data || navList.data.length <= 0 || !warningList || navList.code == "4033") {
                                 res.render("login");
                                 return;
                             }
                             res.render("operation/accountRiskRating/waringRule",{
                                 page:contents,
                                 userMessage:userMessage,
                                 pageurl:"/operation/accountRiskRating/waringRules",
                                 menuList: menuFirstList,
                                 navConf:{   
									nav:"/operation/flexManagement/flexMan",
									navSec:"/operation/accountRiskRating",
									navThird:"/operation/accountRiskRating/waringRule"
								 },
                                 data:bodyData,
                                 menuCodeList:curSourceCodeMenu,
                                 tableList:warningList,
                                 navList:navList
                             });

                         });
                     })

				 })
			 }).on('error', function(e) {  
		         res.redirect("/404");
             }); 
                     
		 });		 
     }).on('error', function(e) {  
         console.log("Got error: " + e.message);  
		 res.redirect("/404");
     });  
}
module.exports = warningList;
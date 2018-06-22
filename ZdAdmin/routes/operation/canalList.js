"use strict";
/**
   requset data for nav list,then request for page list;
**/
var http=require('http'); 
var url = require("url"); 
var cookie = require('cookie');
var config = require('../../controller/config')
var querystring = require('querystring');
function canalList(req,res){
	 var body1 = "";
	 var body2 = "";
     var options1 = {
		 host: config.serviceHost,
		 port:config.servicePort,
		 path:"/admin/third/channel/list.do", //请求地址
		 headers:req.headers		 		
	 }; 
	 var options2 = {
		 host: config.serviceHost,
		 port:config.servicePort,
		 path:"/admin/third/channel/content/list.do", //请求地址
		 headers:req.headers		 		
	 };
    var dft1 = {
        options: {
            host: config.serviceHost,
            port: config.servicePort,
            path: "/admin/login/user/resource/meuns.do?userId=29", //请求地址
            headers:req.headers
        }
    };
	 var userMessage = JSON.parse(cookie.parse(req.headers.cookie).userMessage);
	 var menuFirstList = JSON.parse(cookie.parse(req.headers.cookie).resource);
	 var curSourceCodeMenu = "";
	 var menuName = "/operation/contentManagement/canalList="
     http.get(options1,function(s1Res) {  
         s1Res.on('data',function(data){  
			 body1 += data;
         });
         s1Res.on("end",function(){
			 var navData = JSON.parse(body1.toString("utf-8"));			 
			 var contents = "";
			 if(navData.data.datas.length <= 0 || !navData.data.datas[0]){			 	 
				 if(req.headers.cookie) {
				     var splitCookie = req.headers.cookie.split(";");
					 for(var j = 0; j < splitCookie.length; j++) {
						 if(splitCookie[j].split(menuName).length > 1) {
							 curSourceCodeMenu = JSON.parse(splitCookie[j].split(menuName)[1])
						 };
					 };
				 };
                 http.get(dft1.options,function(s3Res) {     //同步请求再去请求菜单并一起返回
                     var body3 = ""
                     s3Res.on('data', function (data) {
                         body3 += data;
                     });
                     s3Res.on("end", function () {
                         var navList = JSON.parse(body3.toString("utf-8"));
                         if (!navList || !navList.data || navList.data.length <= 0) {
                             dft.res.render("/login");
                             return;
                         }
                         res.render("operation/contentManagement/index",{
                             page:contents,
                             userMessage:userMessage,
                             pageurl:"operation/contentManagement/index",
                             menuList: menuFirstList,
                             navConf:{
                                 nav:"/operation/flexManagement/flexMan",
                                 navSec:"/operation/contentManagement",
                                 navThird:"/operation/contentManagement/canalList",
                             },
                             data:null,
                             menuCodeList:curSourceCodeMenu,
                             tableList:null,
                             navList:navList
                         });
                     })
                 })

			 }else{
			 if(url.parse(req.url).query){
				 contents = url.parse(unescape(req.url),true).query;
			 }else{			 	
				 contents = {
					 pageNo:"1",
					 pageSize:"10",
					 thirdChannel:navData.data.datas[0].code
			     };
			 };	
			 var contents1 = querystring.stringify(contents)
			 options2.path = "/admin/third/channel/content/list.do?"+contents1;
			 http.get(options2,function(s2Res){
				 s2Res.on("data",function(data){
					 body2 += data; 
				 });
				 s2Res.on("end",function(){
					 var bodyData = JSON.parse(body2.toString("utf-8"));				 
				     if(req.headers.cookie) {
					     var splitCookie = req.headers.cookie.split(";");
					     for(var j = 0; j < splitCookie.length; j++) {
						     if(splitCookie[j].split(menuName).length > 1) {
							     curSourceCodeMenu = JSON.parse(splitCookie[j].split(menuName)[1])
						     };
					     };
				     };
                     http.get(dft1.options,function(s3Res) {     //同步请求再去请求菜单并一起返回
						 var body3 = ""
                         s3Res.on('data', function (data) {
                             body3 += data;
                         });
                         s3Res.on("end", function () {
                             var navList = JSON.parse(body3.toString("utf-8"));
                             if (!navList || !navList.data || navList.data.length <= 0) {
                                 dft.res.render("/login");
                                 return;
                             }
                             res.render("operation/contentManagement/index",{
                                 page:contents,
                                 userMessage:userMessage,
                                 pageurl:"operation/contentManagement/index",
                                 menuList: menuFirstList,
                                 navConf:{
                                     nav:"/operation/flexManagement/flexMan",
                                     navSec:"/operation/contentManagement",
                                     navThird:"/operation/contentManagement/canalList",
                                 },
                                 data:bodyData,
                                 menuCodeList:curSourceCodeMenu,
                                 tableList:navData.data.datas,
                                 navList:navList
                             });


                         });
                     })

				 })
			 }).on('error', function(e) {  
		         res.redirect("/404");
             }); 
             }             
		 });		 
     }).on('error', function(e) {  
         console.log("Got error: " + e.message);  
		 res.redirect("/404");
     });  
}
module.exports = canalList;
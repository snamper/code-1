"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');

router.get('/', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/vip/rank/info/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/memberManagement/index",   	
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/memberManagement"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});

//权益设置
router.get('/equitySet', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/vip/rank/info/detail.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/memberManagement/equitySet",   	
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/memberManagement"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//成长设置
router.get('/growSet', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/growth/value/setting/show.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/memberManagement/growSet",   	
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/memberManagement"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:'',  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});


module.exports = router;
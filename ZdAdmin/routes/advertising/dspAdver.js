"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');

router.get('/dspAdverList', function(req, res, next) {
	 var serive = {
		 options:{
			 path: '/admin/third/ad/channel/list.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"advertising/advertManage/dspAdverList",   //模板地址		
			 navConf:{   //导航信息
			 	nav:"/advertising/advertManage",
				 navSec:"/advertising/dspAdver",
				 navThird:"/advertising/dspAdver/dspAdverList"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{"pageSize":"10","pageNo":1},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    	
});
router.get('/dspAdverExposure', function(req, res, next) {
	 var serive = {
		 options:{
			 path: '/admin/third/ad/channel/config/list.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"advertising/advertManage/dspAdverExposure",   //模板地址		
			 navConf:{   //导航信息
			 	nav:"/advertising/advertManage",
				 navSec:"/advertising/dspAdver",
				 navThird:"/advertising/dspAdver/dspAdverExposure"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{"pageSize":"10","pageNo":1},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    	
});

module.exports = router;
"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');

router.get('/', function(req, res, next) {
	 var serive = {
		 options:{
			 path: '/admin/ad/profit/list.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"advertising/advertPrice/index",   //模板地址		
			 navConf:{   //导航信息
			 	nav:"/advertising/advertManage",
				 navSec:"/advertising/dspAdver",
				 navThird:"/advertising/advertPrice"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{"pageSize":"10","pageNo":1},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    	
});
//查看
router.get('/advertPriceView', function(req, res, next) {
	 var serive = {
		 options:{
			 path: '/admin/ad/profit/detail.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"advertising/advertPrice/advertPriceView",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/advertising/advertManage",
				 navSec:"/advertising/dspAdver",
				 navThird:"/advertising/advertPrice"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:'',  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    	
});
//广告价值录入页面
router.get('/advertPriceAdd', function(req, res, next) {
	 var serive = {
		 options:{
			 path: '/admin/profit/third/channel/list.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"advertising/advertPrice/advertPriceAdd",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/advertising/advertManage",
				 navSec:"/advertising/dspAdver",
				 navThird:"/advertising/advertPrice"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:'',  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    	
});



module.exports = router;
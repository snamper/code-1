"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');

router.get('/', function(req, res, next) {
	 var serive = {
		 options:{
			 path: '/admin/business/platform/swap/selectbycondition.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"exchangeCode/merchant/index",   //模板地址		
			 navConf:{   //导航信息
			 	nav:"/exchangeCode/platform",
				 navSec:"/exchangeCode/platform"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{"pageSize":"10","pageNo":1},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    	
});
router.get('/merchantManager', function(req, res, next) {
	 var serive = {
		 options:{
			 path: '/admin/third/content/channel/list.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"exchangeCode/merchant/merchantManager",   //模板地址		
			 navConf:{   //导航信息
			 	nav:"/exchangeCode/platform",
				 navSec:"/exchangeCode/platform"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{"pageSize":"10","pageNo":1},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    	
});
router.get('/editmerchant', function(req, res, next) {
	 var serive = {
		 options:{
			 path: '/admin/business/platform/swap/findbusinessplatform.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"exchangeCode/merchant/editMerchant",   //模板地址		
			 navConf:{   //导航信息
			 	nav:"/exchangeCode/platform",
				 navSec:"/exchangeCode/platform"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    	
});
router.get('/exchangeManager', function(req, res, next) {
	 var serive = {
		 options:{
			 path: '/admin/business/platform/swap/list.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"exchangeCode/exchangeManager/index",   //模板地址		
			 navConf:{   //导航信息
			 	nav:"/exchangeCode/platform",
				 navSec:"/exchangeCode/platform/exchangeManager"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    	
});

module.exports = router;
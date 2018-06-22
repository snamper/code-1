"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');
//审核列表
router.get('/', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/product/wait/audit/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/audit/auditList",   	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/audit",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10","productState":5},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//商品预览
router.get('/goodsView', function(req, res, next) {
     var serive = {
		 options:{
			 path: '/admin/product/info/detail.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/commodityManagement/goodsView",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/audit",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    
});
//广告审核页面
router.get('/goodsAudit', function(req, res, next) {
     var serive = {
		 options:{
			 path: '/admin/product/info/detail.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/audit/audit",   //模板地址		
			 navConf:{   //导航信息
				nav:"/merchant/cmdMan",
				navSec:"/merchant/audit",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    
});
//审核通过
router.post('/success',function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/product/audit/success.do',  //请求地址            
             headers:req.headers,
             method:"post"			 
		 },
		 page:{	           		 
			 asyn:true,			 
		 },
		 contents:req.body, //请求传入参数
		 res:res
	};
	httpRequest(serive); 
});
//审核不通过
router.post('/fail',function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/product/audit/fail.do',  //请求地址            
             headers:req.headers,
             method:"post"			 
		 },
		 page:{	           		 
			 asyn:true,			 
		 },
		 contents:req.body, //请求传入参数
		 res:res
	};
	httpRequest(serive); 
});


module.exports = router;
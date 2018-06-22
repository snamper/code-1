"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');

router.get('/', function(req, res, next) {
	 var serive = {
		 options:{
			 path: '/admin/ad/examine/list.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"advertising/auditManage/index",   //模板地址		
			 navConf:{   //导航信息
			 	nav:"/advertising/advertManage",
				 navSec:"/advertising/advertSelf",
				 navThird:"/advertising/audit"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{"pageSize":"10","pageNo":1,"status":4},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    	
});
//广告查看
router.get('/advertView', function(req, res, next) {		//新建资源
	 var serive = {
		 options:{
			 path: '/admin/ad/manage/detail.do',  //请求地址            
             headers:req.headers,	
		 },
		 page:{	           	 
			 url:"advertising/advertManage/advertView",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/advertising/advertManage",
				 navSec:"/advertising/advertSelf",
				 navThird:"/advertising/audit"
			 },
		 },
		 res:res,
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{"id":1},  //请求传入参数
	 }; 	 
	 httpRequest(serive);   
});
//广告审核
router.get('/auditView', function(req, res, next) {		//新建资源
	 var serive = {
		 options:{
			 path: '/admin/ad/manage/detail.do',  //请求地址            
             headers:req.headers,	
		 },
		 page:{	           	 
			 url:"advertising/auditManage/audit",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/advertising/advertManage",
				 navSec:"/advertising/advertSelf",
				 navThird:"/advertising/audit"
			 },
		 },
		 res:res,
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{"id":1},  //请求传入参数
	 }; 	 
	 httpRequest(serive);   
});
//广告审核
router.post('/examine', function(req, res, next) {	
 var serive = {
		 options:{
			 path: '/admin/ad/examine/add.do',            
             headers:req.headers, 
             method:"post"         	 
		 },
		 page:{	           	 
			 asyn:true
		 },
		 contents:req.body,
		 res:res
	 }; 	
	 httpRequest(serive);   
});

module.exports = router;
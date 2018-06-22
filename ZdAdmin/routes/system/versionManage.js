"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest'); 
//版本管理
router.get('/', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/app/version/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"system/versionManagement/index",   	
			 navConf:{ 
				 nav:"/system/resourceManage",
				 navSec:"/system/versionManage",
			},
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});

router.get('/addVersion', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/app/version/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"system/versionManagement/addVersion",   	
			 navConf:{ 
				 nav:"/system/resourceManage",
				 navSec:"/system/versionManage",
			},
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//版本下架
router.post('/downVersion', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/app/version/update/status.do',  //请求地址            
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
//新增版本
router.post('/addVersion', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/app/version/create.do',  //请求地址            
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
//版本详情
router.get('/versionDetail', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/app/version/detail.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"system/versionManagement/editVersion",   	
			 navConf:{ 
				 nav:"/system/resourceManage",
				 navSec:"/system/versionManage",
			},
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//修改版本
router.post('/updateVersion', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/app/version/update.do',  //请求地址            
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
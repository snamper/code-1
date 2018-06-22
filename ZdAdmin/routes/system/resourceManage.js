"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');

//资源管理列表
router.get('/', function(req, res, next) {
	 var serive = {
		options:{
			path: '/admin/sys/resource/meuns/list.do',  //请求地址            
            headers:req.headers,			 
		},
		 page:{	           	 
			url:"system/resourceManagement/index",   //模板地址		
			navConf:{   //导航信息
				nav:"/system/resourceManage",
				navSec:"/system/resourceManage",
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{"pageSize":"10","pageNo":1},  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);    	
});
//新建资源初始化
router.get('/addResource', function(req, res, next) {		//新建资源

 	var serive = {
		 options:{
			 path: '/admin/menu/add.do',  //请求地址            
             headers:req.headers,		
             method:"get"
		 },
		 page:{	           	 
			 url:"system/resourceManagement/addResource",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/system/resourceManage",
				 navSec:"/system/resourceManage",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);   
});

router.post('/', function(req, res, next) {		//新建资源
 var serive = {
		 options:{
			 path: '/admin/sys/resource/meuns/list.do',            
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
router.post('/addResource', function(req, res, next) {		//新建资源
 var serive = {
		 options:{
			 path: '/admin/menu/add.do',            
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
/* 新建资源--资源名 (异步)*/
router.post('/getResource', function(req, res, next) {
     var serive = {
		 options:{
			  path: '/admin/menu/add.do',  //请求地址            
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

router.get('/editResource', function(req, res, next) {		//编辑初始化资源
	var serive = {
		 options:{
			 path: '/admin/menu/edit.do',  //请求地址            
             headers:req.headers,		
             method:"get"
		 },
		 page:{	           	 
			 url:"system/resourceManagement/editResource",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/system/resourceManage",
				 navSec:"/system/resourceManage",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive); 
});
router.post('/editCurReource', function(req, res, next) {		//修改资源
	
	var serive = {
		 options:{
			 path: '/admin/menu/update.do',  //请求地址            
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
//保存新建资源
router.post('/addReource', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/menu/create.do',  //请求地址            
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
//启用禁用资源
router.post('/disableReource', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/menu/disable.do',  //请求地址            
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
//启用禁用资源
router.post('/delReource', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/menu/delete.do',  //请求地址            
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
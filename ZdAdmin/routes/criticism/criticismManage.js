"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');

//运营管理--评论管理(一级菜单)
//评论内容管理
router.get('/', function(req, res, next) {		
	var serive = {
		 options:{
			 path: '/admin/user/comment/list.do',
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"criticism/criticismManage/index",   	
			 navConf:{ 
				 nav:"/criticism/criticismManage",
				 navSec:"/criticism/criticismManage"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageSize:"10",pageNo:"1"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//删除评论内容
router.post('/deleteCommont', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/user/comment/delete.do',  //请求地址            
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
//不良词屏蔽管理
router.get('/badWordShield', function(req, res, next) {		
	var serive = {
		 options:{
			 path: '/admin/sensitiveWord/list.do',
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"criticism/criticismManage/badWordShield",   	
			 navConf:{ 
				 nav:"/criticism/criticismManage",
				 navSec:"/criticism/criticismManage/badWordShield"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageSize:"10",pageNo:"1"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//添加不良词

router.post('/addSensitiveWord', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/sensitiveWord/add.do',  //请求地址            
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
//不良词修改
router.post('/updateSensitiveWord', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/sensitiveWord/update.do',  //请求地址            
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
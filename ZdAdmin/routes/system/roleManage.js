"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest'); 
//角色管理
router.get('/', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/role/list2.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"system/roleManagement/index",   	
			 navConf:{ 
				 nav:"/system/resourceManage",
				 navSec:"/system/roleManage",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//异步获取
router.post('/', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/role/list.do',  //请求地址            
             headers:req.headers,
             method:"get"			 
		 },
		 page:{	           		 
			 asyn:true,			 
		 },
		 contents:req.body, //请求传入参数
		 res:res
	}; 	
	httpRequest(serive); 
	
});

//新增角色
router.get('/addRole', function(req, res, next) {	

  var serive = {
		 options:{
			 path: '/admin/role/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"system/roleManagement/addRole",   	
			 navConf:{ 
				 nav:"/system/resourceManage",
				 navSec:"/system/roleManage",
			 },
		 },
		 res:res
	 }; 	
	 httpRequest(serive);
});
//删除关联用户
router.post('/delUser', function(req, res, next) {	

  var serive = {
		 options:{
			 path: '/admin/role/user/delete.do',            
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
//编辑角色初始化
router.get('/editRole', function(req, res, next) {	
  var serive = {
		 options:{
			 path: '/admin/role/edit.do',  //请求地址            
             headers:req.headers,		
             method:"get"
		 },
		 page:{	           	 
			 url:"system/roleManagement/editRole",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/system/resourceManage",
				 navSec:"/system/roleManage",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive); 
});
//设置用户
router.get('/setUser', function(req, res, next) {		
	var serive = {
		 options:{
			 path: '/admin/role/user/list.do',  //请求地址            
             headers:req.headers,
             method:"get"			 
		 },
		 page:{	           	 
			 url:"system/roleManagement/setUser",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/system/resourceManage",
				 navSec:"/system/roleManage",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(encodeURI(req.url),true).query:"", //请求传入参数
		 res:res
	}; 	
		httpRequest(serive);
});
//修改角色
router.post('/editRole', function(req, res, next) {
		
	var serive = {
		 options:{
			 path: '/admin/role/update.do',  //请求地址            
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

/* 获取角色关联用户列表 (异步)*/
router.post('/setUser', function(req, res, next) {
     var serive = {
		 options:{
			 path: '/admin/role/user/list.do',            
             headers:req.headers, 
             method:"get"         	 
		 },
		 page:{	           	 
			 asyn:true
		 },
		 contents:req.body,
		 res:res
	 }; 	
	 httpRequest(serive);  
});
//角色增加关联用户
router.post('/roleSetUser', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/role/user/create.do',  //请求地址            
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
"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');

//获取权限管理列表
router.get('/', function(req, res, next) {		//权限管理
  var serive = {
		 options:{
			 path: '/admin/role/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"system/permissionManagement/index",   	
			 navConf:{ 
				 nav:"/system/resourceManage",
				 navSec:"/system/permissionManage",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//获取对应角色权限
router.post('/', function(req, res, next) {		//权限管理

  var serive = {
		 options:{
			 path: '/admin/sys/resource/meuns.do',            
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

//设置角色权限
router.post('/setPermission', function(req, res, next) {
   	var serive = {
		 options:{
			 path: '/admin/role/menus/save.do',            
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
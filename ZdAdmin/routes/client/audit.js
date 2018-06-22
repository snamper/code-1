"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');
//广告主审核列表
router.get('/', function(req, res, next) {
	var serive = {
		  options:{
			 path: '/admin/advertiser/list/all.do', 
             headers:req.headers,
		 },
		 page:{
			 url:"client/auditManage/index",
			 navConf:{
				 nav:"/client/advertiserManage",
				 navSec:"/client/audit",
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10","status":1},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive);
});
//广告主查看
router.get('/advertiserView', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/advertiser/info/detial.do',  //请求地址            
             headers:req.headers,		
             method:"get"
		 },
		 page:{	           	 
			 url:"client/advertiserManagement/advertiserView",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/client/advertiserManage",
				 navSec:"/client/audit",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{advId:"1"},
		 res:res
	 }; 	 
	 httpRequest(serive); 
});
//广告主审核详情
router.get('/advAudit', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/advertiser/info/detial.do',  //请求地址            
             headers:req.headers,		
             method:"get"
		 },
		 page:{	           	 
			 url:"client/auditManage/audit",   //模板地址		
			 navConf:{   //导航信息
				nav:"/client/advertiserManage",
				navSec:"/client/audit",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{advId:"1"},
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//审核

router.post('/approval', function(req, res, next) {		//权限管理
  var serive = {
		 options:{
			 path: '/admin/advertiser/info/approval.do',            
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
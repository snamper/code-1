
"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');

//广告主列表
router.get('/', function(req, res, next) {		
	var serive = {
		 options:{
			 path: '/admin/advertiser/list/all.do', 
             headers:req.headers,
		 },
		 page:{
			 url:"client/advertiserManagement/index",
			 navConf:{
				 nav:"/client/advertiserManage",
				 navSec:"/client/advertiserManage",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//删除广告主
router.post('/delete', function(req, res, next) {		//权限管理

  var serive = {
		 options:{
			 path: '/admin/advertiser/delete.do',            
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
//新建广告主
router.get('/addAdvertiser', function(req, res, next) {
  var serive = {
		 options:{
			 path: '/admin/role/list.do',            
             headers:req.headers,	
             method:"post"
		 },
		 page:{	           	 
			 url:"client/advertiserManagement/addAdvertiser",   	
			 navConf:{ 
				 nav:"/client/advertiserManage",
				 navSec:"/client/advertiserManage",
			 },
		 },
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//广告主修改
router.post('/updateAdver', function(req, res, next) {		//权限管理

  var serive = {
		 options:{
			 path: '/admin/advertiser/update.do',            
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
				 navSec:"/client/advertiserManage",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{advId:"1"},
		 res:res
	 }; 	 
	 httpRequest(serive); 
});
//广告主编辑

router.get('/editAdvertiser', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/advertiser/info/detial.do',  //请求地址            
             headers:req.headers,		
             method:"get"
		 },
		 page:{	           	 
			 url:"client/advertiserManagement/editAdvertiser",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/client/advertiserManage",
				 navSec:"/client/advertiserManage",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{advId:"1"},
		 res:res
	 }; 	 
	 httpRequest(serive); 
});
//广告主创建
router.post('/addAdver', function(req, res, next) {		//权限管理
  var serive = {
		 options:{
			 path: '/admin/advertiser/info/add.do',            
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
//广告主提交审核
router.post('/submit', function(req, res, next) {		//权限管理
  var serive = {
		 options:{
			 path: '/admin/advertiser/submit.do',            
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
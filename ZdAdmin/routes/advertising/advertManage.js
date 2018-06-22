"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');

//自有广告
router.get('/advertManageSelf', function(req, res, next) {
	 var serive = {
		 options:{
			 path: '/admin/ad/manage/list.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"advertising/advertManage/index",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/advertising/advertManage",
				 navSec:"/advertising/advertSelf",
				 navThird:"/advertising/advertManage/advertManageSelf"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{"pageSize":"10","pageNo":1,"status":0},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    	
});
router.get('/advTotal', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/ad/effect/statistics/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"advertising/advertManage/advTotal",   
			 navConf:{   
				 nav:"/advertising/advertManage",
				 navSec:"/advertising/advertSelf",
				 navThird:"/advertising/advertManage/advTotal"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res,
	 }; 	 
	 httpRequest(serive);  
});
//广告位配置页面
router.get('/adverSpace', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/ad/position/configure/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"advertising/advertManage/adverSpace",   
			 navConf:{   
				 nav:"/advertising/advertManage",
				 navSec:"/advertising/advertSelf",
				 navThird:"/advertising/advertManage/adverSpace"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res,
	 }; 	 
	 httpRequest(serive);  
});
router.get('/addAdvert', function(req, res, next) {		//新建资源
	 var serive = {
		 options:{
			 path: '/admin/advertiser/select/list.do',  //请求地址            
             headers:req.headers,	
		 },
		 page:{	           	 
			 url:"advertising/advertManage/addAdvert",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/advertising/advertManage",
				 navSec:"/advertising/advertSelf",
				 navThird:"/advertising/advertManage/advertManageSelf"
			 },
		 },
		 res:res,
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
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
				 navThird:"/advertising/advertManage/advertManageSelf"
			 },
		 },
		 res:res,
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{"id":1},  //请求传入参数
	 }; 	 
	 httpRequest(serive);   
});
//编辑页面
router.get('/editAdvert', function(req, res, next) {		
	 var serive = {
		 options:{
			 path: '/admin/ad/manage/detail.do',  //请求地址            
             headers:req.headers,	
		 },
		 page:{	           	 
			 url:"advertising/advertManage/editAdvert",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/advertising/advertManage",
				 navSec:"/advertising/advertSelf",
				 navThird:"/advertising/advertManage/advertManageSelf"
			 },
		 },
		 res:res,
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{"id":1},  //请求传入参数
	 }; 	 
	 httpRequest(serive);   
});

//编辑页面，异步
router.get('/getAdverList', function(req, res, next) {		
	 var serive = {
		 options:{
			 path: '/admin/advertiser/select/list.do',  //请求地址            
             headers:req.headers,	
		 },
		 page:{	           	 
			 asyn:true
		 },
		 contents:req.body,
		 res:res
	 }; 	 
	 httpRequest(serive);
});
  
//广告新建
router.post('/saveAdver', function(req, res, next) {	
 var serive = {
		 options:{
			 path: '/admin/ad/manage/save.do',            
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
//删除广告
router.post('/deleteAdvert', function(req, res, next) {	
 var serive = {
		 options:{
			 path: '/admin/ad/manage/delete.do',            
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
//提交广告
router.post('/submitAdvert', function(req, res, next) {	
 var serive = {
		 options:{
			 path: '/admin/ad/manage/submit.do',            
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






module.exports = router;
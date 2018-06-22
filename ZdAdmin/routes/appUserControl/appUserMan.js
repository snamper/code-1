"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');

//运营管理--APP用户管理(一级菜单)
//用户管理列表
router.get('/', function(req, res, next) {		
	var serive = {
		 options:{
			 path: '/app/user/list.do',
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"appUserMan/appUserManagement/index",   	
			 navConf:{ 
				 nav:"/appUserControl/appUserMan",
				 navSec:"/appUserControl/appUserMan"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageSize:"10",pageNo:"1"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});

//APP用户详情
router.get('/userdetail', function(req, res, next) {		
	var serive = {
		 options:{
			 path: '/app/user/update/detail.do',
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"appUserMan/appUserManagement/userDetail",   	
			 navConf:{ 
				 nav:"/appUserControl/appUserMan",
				 navSec:"/appUserControl/appUserMan"
//				 navThird:"/appUserControl/appUserMan/userdetail"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageSize:"10",pageNo:"1"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//APP用户积分明细(行为记录)
router.get('/integralPartic', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/app/user/update/score/history.do',
//			 path: '/admin/app/user/score/detail/list.do',
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"appUserMan/appUserManagement/integralPartic",   	
			 navConf:{ 
				 nav:"/appUserControl/appUserMan",
				 navSec:"/appUserControl/appUserMan"
//				 navThird:"/appUserControl/appUserMan/integralPartic"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageSize:"10",pageNo:"1"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});

//用户账号的启用/停用
router.post('/allAbled', function(req, res, next) {		//权限管理
var serive = {
		 options:{
			 path: '/app/user/update/login/batchStatus.do',            
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

//用户账号的积分冻结/解冻
router.post('/allFrost', function(req, res, next) {		//权限管理
var serive = {
		 options:{
			 path: '/app/user/update/score/batchStatus.do',            
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

//退款详情预览
router.get('/appRefundDetail', function(req, res, next) {
     var serive = {
		 options:{
			 path: '/admin/order/manage/detail.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"appUserMan/appUserManagement/appRefundDetail",   //模板地址		
			 navConf:{   //导航信息
				nav:"/appUserControl/appUserMan",
				navSec:"/appUserControl/appUserMan",
				navThird:"/appUserControl/appUserMan/appRefundDetail"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    
});

//用户账号风险 唤醒风险/解除风险
router.post('/allRisks', function(req, res, next) {
var serive = {
		 options:{
			 path: '/app/user/update/risk/batchStatus.do',            
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

//用户风险备注  
router.post('/userRemark', function(req, res, next) {
var serive = {
		 options:{
			 path: '/app/user/update/risk/set.do',            
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
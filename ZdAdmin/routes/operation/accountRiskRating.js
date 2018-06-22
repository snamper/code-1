"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');
var warningList = require("./warningList");
/*运营中心-帐号风险管理*/
/* route for orderManagement*/
router.get('/colligate', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/risk/model/config.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/accountRiskRating/index",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/accountRiskRating",
				 navThird:"/operation/accountRiskRating/colligate",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10",status:"1"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});

router.get('/changeMoudle', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/risk/model/config.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/accountRiskRating/changeMoudle",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/accountRiskRating",
				 navThird:"/operation/accountRiskRating/colligate",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10",status:"1"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});

//TOP3风险管理
//单项高风险首页
router.get('/risksMan', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/risk/factor/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/accountRiskRating/risksMan",   
			 navConf:{   
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/accountRiskRating",
				navThird:"/operation/accountRiskRating/risksMan"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{singleHighRiskFlag:true},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//调整TOP模型 按钮跳转页面
router.get('/adjustMoudle', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/risk/factor/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/accountRiskRating/adjustMoudle",   
			 navConf:{   
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/accountRiskRating",
				navThird:"/operation/accountRiskRating/risksMan"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});

//风险解释
router.get('/risksExplain', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/risk/factor/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/accountRiskRating/risksExplain",   
			 navConf:{   
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/accountRiskRating",
				navThird:"/operation/accountRiskRating/risksMan"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//报警规则

router.get('/waringRule', function(req, res, next) {
//	var contents = url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
	
	warningList(req,res)
});

//异常用户记录 
router.get('/abUserRecord', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/user/suspicious/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/accountRiskRating/abUserRecord",   
			 navConf:{   
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/accountRiskRating",
				navThird:"/operation/accountRiskRating/abUserRecord"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//用户账号的启用/停用 && //用户账号的积分冻结/解冻    公用于APP用户管理列表里面的按钮路由

//设置邀请风险数据获取  
router.get('/setInvitationRisk', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/invite/friend/limit/config.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/accountRiskRating/setInvitationRisk",   
			 navConf:{   
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/accountRiskRating",
				navThird:"/operation/accountRiskRating/setInvitationRisk"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});

module.exports = router;

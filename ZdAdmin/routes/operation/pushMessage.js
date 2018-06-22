"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');

//站内信列表
router.get('/message', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/msg/letter/list.do', 
             headers:req.headers,
		 },
		 page:{
			 url:"operation/pushMessage/index",
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pushMessage",
				 navThird:"/operation/pushMessage/message",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});

//新建站内信
router.get('/addMessage', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/sys/feedback/list.do', 
             headers:req.headers,
		 },
		 page:{
			 url:"operation/pushMessage/addMessage",
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pushMessage",
				 navThird:"/operation/pushMessage/message",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//配置系统站内信
router.get('/messageApply', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/msg/letter/system/info.do', 
             headers:req.headers,
		 },
		 page:{
			 url:"operation/pushMessage/messageApply",
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pushMessage",
				 navThird:"/operation/pushMessage/message",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//站内信详情
router.get('/messageDetail', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/msg/letter/detail.do', 
             headers:req.headers,
		 },
		 page:{
			 url:"operation/pushMessage/messageDetail",
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pushMessage",
				 navThird:"/operation/pushMessage/message",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//短信列表
router.get('/sms', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/message/query/list.do', 
             headers:req.headers,
		 },
		 page:{
			 url:"operation/pushMessage/smsIndex",
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pushMessage",
				 navThird:"/operation/pushMessage/sms",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//创建短信
router.get('/addSms', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/message/model/query.do', 
             headers:req.headers,
		 },
		 page:{
			 url:"operation/pushMessage/addSms",
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pushMessage",
				 navThird:"/operation/pushMessage/sms",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"100000000"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//短信详情
router.get('/smsDetail', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/message/info/detail.do', 
             headers:req.headers,
		 },
		 page:{
			 url:"operation/pushMessage/smsDetail",
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pushMessage",
				 navThird:"/operation/pushMessage/sms",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:'',  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//短信模板
router.get('/smsTemplate', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/message/model/query.do', 
             headers:req.headers,
		 },
		 page:{
			 url:"operation/pushMessage/smsTemplate",
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pushMessage",
				 navThird:"/operation/pushMessage/smsTemplate",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});

module.exports = router;
"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');
//渠道列表
router.get('/channelList', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/spread/channel/listchannelall.do',           
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/actManagement/index",  	
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/channelList",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 	 
});
//创建活动或渠道
router.get('/channelEdit', function(req, res, next) {
  var serive = {
		 options:{
			 path: '/admin/role/list.do',            
             headers:req.headers,	
             method:"post"
		 },
		 page:{	           	 
			 url:"operation/actManagement/channelEdit",   	
			 navConf:{ 
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/channelList",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//修改活动
router.get('/reviseActive', function(req, res, next) {
  var serive = {
		 options:{
			 path: '/admin/spread/event/detail.do',            
             headers:req.headers,
		 },
		 page:{	           	 
			 url:"operation/actManagement/reviseActive",   	
			 navConf:{ 
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/channelList",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},
		 res:res
	 }; 	
	 httpRequest(serive); 
});

//修改渠道
router.get('/reviseChannel', function(req, res, next) {
  var serive = {
		 options:{
			 path: '/admin/spread/channel/getChannelDetail.do',            
             headers:req.headers,	
		 },
		 page:{	           	 
			 url:"operation/actManagement/reviseActive",   	
			 navConf:{ 
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/channelList",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},
		 res:res
	 }; 	
	 httpRequest(serive); 
});

//渠道详情
router.get('/channelDetail', function(req, res, next) {
  var serive = {
		 options:{
			 path: '/admin/spread/channel/listchanneldetail.do',            
             headers:req.headers
		 },
		 page:{	           	 
			 url:"operation/actManagement/channelDetail",   	
			 navConf:{ 
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/channelList",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},
		 res:res
	 }; 	
	 httpRequest(serive); 
});

router.get('/activeDetail', function(req, res, next) {
  var serive = {
		 options:{
			 path: '/admin/spread/event/effect/detail.do',            
             headers:req.headers
		 },
		 page:{	           	 
			 url:"operation/actManagement/activeDetail",   	
			 navConf:{ 
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/channelList",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},
		 res:res
	 }; 	
	 httpRequest(serive); 
});

//用户列表
router.get('/userList', function(req, res, next) {
  var serive = {
		 options:{
			 path: '/admin/spread/channel/listchanneluser.do',            
             headers:req.headers
		 },
		 page:{	           	 
			 url:"operation/actManagement/userList",   	
			 navConf:{ 
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/channelList",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//推广渠道佣金
router.get('/spreadChannel', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/spread/channel/fundList.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/actManagement/spreadChannel",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/spreadChannel",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res,
	 }; 	 
	 httpRequest(serive);  
});

//新增佣金模板
router.get('/newMoudle', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/spread/channel/fundList.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/actManagement/newMoudle",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/spreadChannel",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res,
	 }; 	 
	 httpRequest(serive);  
});
//活动列表
router.get('/activeList', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/active/getActiveList.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/actManagement/activeList",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/activeList",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res,
	 }; 	 
	 httpRequest(serive);  
});

//新增活动
router.get('/chooseActive', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/spread/channel/fundList.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/actManagement/chooseActive",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/activeList",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res,
	 }; 	 
	 httpRequest(serive);  
});
//注册活动
router.get('/registerActive', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/spread/channel/fundList.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/actManagement/registerActive",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/activeList",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res,
	 }; 	 
	 httpRequest(serive);  
});
//修改注册活动
router.get('/registerActiveEdit', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/active/getActiveDetail.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/actManagement/registerActiveEdit",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/activeList",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:'',  //请求传入参数
		 res:res,
	 }; 	 
	 httpRequest(serive);  
});
//活动创建成功
router.get('/activeSucc', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/spread/channel/fundList.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/actManagement/activeSucc",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/actManagement",
				 navThird:"/operation/actManagement/activeList",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res,
	 }; 	 
	 httpRequest(serive);  
});

module.exports = router;
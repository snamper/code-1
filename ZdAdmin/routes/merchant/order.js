"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var httpRequest = require('./../../controller/httpRequest');

/* 订单管理列表*/
router.get('/', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/order/manage/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/order/index",   	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/order",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10",orderStatus:0},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//订单详情
router.get('/orderView', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/order/manage/detail.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/order/orderView",   	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/order",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
/* 商品管理列表 (异步)*/
router.post('/', function(req, res, next) {
     var serive = {
		 options:{
			 path: '/admin/product/like/list.do',            
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


module.exports = router;
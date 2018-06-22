"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');
//商品分类列表
router.get('/', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/product/sort/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/goodsCate/goodsCate",   	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/goodsCate",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10",location:1},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//创建分类
router.get('/addCate', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/product/sort/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/goodsCate/addCate",   	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/goodsCate",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"100000000",location:1},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//创建分类
router.get('/editCate', function(req, res, next) {
	var message = {
		pageNo:url.parse(req.url).query.pageNo,
		pageSize:url.parse(req.url).query.pageSize,
		location:url.parse(req.url).query.location
	}
	var serive = {
		options:{
			 path: '/admin/product/sort/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/goodsCate/editCate",   	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/goodsCate",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"100000000",location:1},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});


module.exports = router;
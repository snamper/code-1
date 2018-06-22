"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');

//内容数据统计
router.get('/conData', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/goods/statistics/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"dataManage/conData",   
			 navConf:{   
				 nav:"/dataManage/conDataManage",
				 navSec:"/dataManage/merDataManage",
				 navThird:"/dataManage/merDataManage/conData"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"20"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
router.get('/advData', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/order/statistics/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"dataManage/advData",   
			 navConf:{   
				 nav:"/dataManage/conDataManage",
				 navSec:"/dataManage/merDataManage",
				 navThird:"/dataManage/merDataManage/advData"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"20"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});

module.exports = router;
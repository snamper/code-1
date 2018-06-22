"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var httpRequest = require('./../../controller/httpRequest');
//商品管理-兑换管理
/* 兑换管理列表*/
router.get('/', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/exchange/manage/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/cashManagement/index",   	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/cashMan",
				 navThird:"/merchant/cashMan"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//商品兑换详情预览
router.get('/goodsViews', function(req, res, next) {
     var serive = {
		 options:{
			 path: '/admin/exchange/manage/detail.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/cashManagement/goodsViews",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/cashMan",
				 navThird:"/merchant/cashMan"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    
});
//列表页退回积分操作
router.get('/integralBack',function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/exchange/point/back.do',  //请求地址            
             headers:req.headers,
             method:"get"			 
		 },
		 page:{	           		 
			 asyn:true,			 
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"", //请求传入参数
		 res:res
	};
	httpRequest(serive); 
});

module.exports = router;
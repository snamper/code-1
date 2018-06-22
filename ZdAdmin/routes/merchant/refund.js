"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');
/*退款记录首页列表*/
router.get('/', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/order/refundList.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/refundRecord/index",   	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/refund",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},   //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//退款详情预览
router.get('/refundDetail', function(req, res, next) {
     var serive = {
		 options:{
			 path: '/admin/order/manage/detail.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/refundRecord/refundDetail",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/refund",
				 navThird:"/merchant/refund"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    
});

module.exports = router;
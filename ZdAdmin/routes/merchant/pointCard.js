"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');

//积分卡管理
router.get('/pointCardMan', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/scorecard/base/list.do',           
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/pointCard/index",  	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/pointCard",
				 navThird:"/merchant/pointCard/pointCardMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 	 
});
//新建积分卡
router.get('/newPointCard', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/ad/to/setup/list.do',           
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/pointCard/newPointCard",  	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/pointCard",
				 navThird:"/merchant/pointCard/pointCardMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 	 
});

//积分卡生成记录
router.get('/pointCardRecord', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/scorecard/record/list.do',           
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/pointCard/pointCardRecord",  	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/pointCard",
				 navThird:"/merchant/pointCard/pointCardRecord",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 	 
});


//积分卡统计

router.get('/pointCardCount', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/scorecard/base/list.do',
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/pointCard/pointCardCount",  	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/pointCard",
				 navThird:"/merchant/pointCard/pointCardCount",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 	 
});
// seeEcharge

//查看兑换码
router.get('/seeEcharge', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/scorecard/record/code/list.do',           
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/pointCard/seeEcharge",  	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/pointCard",
				 navThird:"/merchant/pointCard/pointCardRecord",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"15"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 	 
});

//兑换详情
router.get('/changeDetail', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/scorecard/record/code/statistics/list.do',           
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/pointCard/changeDetail",  	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/pointCard",
				 navThird:"/merchant/pointCard/pointCardCount",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 	 
});

//销售详情
router.get('/saleDetail', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/scorecard/record/list.do',           
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/pointCard/saleDetail",  	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/pointCard",
				 navThird:"/merchant/pointCard/pointCardCount",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 	 
});



module.exports = router;
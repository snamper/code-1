"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');
var httpTest = require('./httptest')
/*运营中心-优惠券管理*/
/*首页额度配置列表*/
router.get('/', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/coupon/limit/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/couponsManagement/index",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/couponsManagement"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//优惠券管理页面
router.get('/couponsMan', function(req, res, next) {
	var serive = {
		 options:{
		 	path: '/admin/coupon/base/list.do', 
            headers:req.headers			 
		 },
		 page:{	           	 
			 url:"operation/couponsManagement/couponsMan",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/couponsManagement"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//渠道配置优惠券管理页面
router.get('/channelCoupon', function(req, res, next) {
	var serive = {
		 options:{
		 	path: '/admin/coupon/channel/list.do', 
            headers:req.headers			 
		 },
		 page:{	           	 
			 url:"operation/couponsManagement/channelCoupon",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/couponsManagement"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpTest(serive);  
});
//优惠券创建 
router.get('/addCoupons', function(req, res, next) {
	var serive = {
		 options:{
		 	path: '/admin/points/model/valid/list.do', 
            headers:req.headers			 
		 },
		 page:{	           	 
			 url:"operation/couponsManagement/addCoupons",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/couponsManagement"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//优惠券编辑
router.get('/editorCoupons', function(req, res, next) {
	var serive = {
		 options:{
		 	path: '/admin/coupon/base/info.do', 
            headers:req.headers			 
		 },
		 page:{	           	 
			 url:"operation/couponsManagement/editorCoupons",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/couponsManagement"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//优惠券补录
router.get('/fillWareHose', function(req, res, next) {
	var serive = {
		 options:{
		 	path: '/admin/coupon/base/info.do', 
            headers:req.headers			 
		 },
		 page:{	           	 
			 url:"operation/couponsManagement/fillWareHose",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/couponsManagement"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//配置渠道优惠券(编辑) 
router.get('/configChannelsCoup', function(req, res, next) {
	var serive = {
		 options:{
		 	path: '/admin/coupon/channel/info.do', 
            headers:req.headers			 
		 },
		 page:{	           	 
			 url:"operation/couponsManagement/configChannelsCoup",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/couponsManagement"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//配置渠道优惠券补货  
router.get('/channelsCoupReplen', function(req, res, next) {
	var serive = {
		 options:{
		 	path: '/admin/coupon/channel/info.do', 
            headers:req.headers			 
		 },
		 page:{	           	 
			 url:"operation/couponsManagement/channelsCoupReplen",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/couponsManagement"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});




router.post('/changeModel', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/points/model/create.do',            
             headers:req.headers, 
             method:"post"         	 
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

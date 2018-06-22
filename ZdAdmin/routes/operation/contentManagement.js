"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');
var canalList = require("./canalList");

//渠道内容列表
router.get('/canalList', function(req, res, next) {
	/**var serive = {
		options:{
			 path: '/admin/third/channel/list.do',     //admin/product/recommend/slaves/list.do       
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/contentManagement/index",   	
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/contentManagement",
				 navThird:"/operation/contentManagement/canalList",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10",status:2},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); **/
	 canalList(req,res);
});

//内容渠道管理
router.get('/channel', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/third/content/channel/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/contentManagement/conCannel",  
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/contentManagement",
				 navThird:"/operation/contentManagement/channel",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});

router.get('/homeReferMan', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/index/recommended-bit/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/contentManagement/homeReferMan",   	
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/contentManagement",
				 navThird:"/operation/contentManagement/homeReferMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:1,pageSize:10},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//详细信息
router.get('/videoInfo', function(req, res, next) {//详细版本
     var serive = {
		 options:{
			 path: '/admin/third/channel/content/detail.do',  //请求地址            
             headers:req.headers,
//           type:'post'
		 },
		 page:{	           	 
			 url:"operation/contentManagement/videoInfo",   //模板地址		
			 navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/contentManagemen",
				navThird:"/operation/contentManagement/canalList"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    
});

//点


module.exports = router;
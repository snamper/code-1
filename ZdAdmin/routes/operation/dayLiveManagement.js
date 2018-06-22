"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');
/*运营中心-日活统计管理*/
/* route for orderManagement*/
router.get('/', function(req, res, next) {//日活量统计
	var serive = {
		 options:{
			 path: '/app/user/live/count.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/dayLiveManagement/index",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/dayLiveMan"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//第一个路由实际作用为页面导向，没有数据作用
//日活量统计
router.post('/dayLives', function(req, res, next){
	var serive = {
		 options:{
			 path: '/app/user/live/count.do',            
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
//每日注册量统计
router.post('/dayRegisters', function(req, res, next){
	var serive = {
		 options:{
			 path: '/app/user/rigist/count.do',            
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
//每日登录量统计
router.post('/dayLogins', function(req, res, next){
	var serive = {
		 options:{
			 path: '/app/user/login/count.do',            
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

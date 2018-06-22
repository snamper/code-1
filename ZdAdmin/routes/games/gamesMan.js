"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');
/*运营中心-小游戏管理*/
//大转盘数据统计
router.get('/', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/game/lottery/record/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"games/gamesManagement/index",   
			 navConf:{   
				 nav:"/games/gamesMan",
				 navSec:"/games/gamesMan"
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//大转盘设置
router.get('/bigDialSet', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/game/lottery/info/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"games/gamesManagement/bigDialSet",   
			 navConf:{   
				 nav:"/games/gamesMan",
				 navSec:"/games/gamesMan"
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});

module.exports = router;

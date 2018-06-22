"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');

//内容数据统计
router.get('/', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/content/statistics/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"dataManage/index",   
			 navConf:{   
				 nav:"/dataManage/conDataManage",
				 navSec:"/dataManage/conDataManage",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"20"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});

module.exports = router;
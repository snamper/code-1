"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');

//广告主列表
router.get('/', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/sys/feedback/list.do', 
             headers:req.headers,
		 },
		 page:{
			 url:"feedback/feedbackManagement/index",
			 navConf:{
				 nav:"/feedback/feedback",
				 navSec:"/feedback/feedback",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});


module.exports = router;
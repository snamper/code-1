"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');
//新手福利管理
//新手福利设置
router.get('/setWelfare', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/product/noob/info.do',           
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/noviceWelfare/index",  	
			 navConf:{
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/opMerMan/ordMan",
				navThird:"/merchant/noviceWelfare/setWelfare"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 	 
});

module.exports = router;
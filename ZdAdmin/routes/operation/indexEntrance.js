"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');
/*运营中心-首页资源入口管理*/
router.get('/', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/resource/entrance/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/indexEntrance/index",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/indexEntrance"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
router.get('/setEntrance', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/resource/entrance/config/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/indexEntrance/setEntrance",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/indexEntrance"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
module.exports = router;

"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');
/*运营中心-标签库管理*/
//标签库管理列表
router.get('/', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/user/lable/lableList.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/tagLibraryManagement/index",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/tagLibraryMan"
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});


module.exports = router;

"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');
/*运营中心-商品管理-商城推荐*/
/* route for orderManagement*/
router.get('/mallRec', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/product/recommend/beset/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/orderManagement/recMall",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/opMerMan/ordMan",
				 navThird:"/operation/opMerMan/merManRefer"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});

//商品列表（异步）
router.post('/ordMan', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/product/list.do',            
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

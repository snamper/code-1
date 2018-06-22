"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');
//商品管理
/* 商品管理列表*/
router.get('/', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/product/info/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/commodityManagement/index",   	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/cmdMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10","productState":0},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
/* 商品管理列表 (异步)*/
router.post('/', function(req, res, next) {
     var serive = {
		 options:{
			 path: '/admin/product/like/list.do',            
             headers:req.headers, 
             method:"get"         	 
		 },
		 page:{	           	 
			 asyn:true
		 },
		 contents:req.body,
		 res:res
	 }; 	
	 httpRequest(serive);  
});
/* 新建商品 */
router.get('/newGoods', function(req, res, next) {
//	res.render("merchant/commodityManagement/cmdInformation")
     var serive = {
		 options:{
			 path: '/admin/merchant/query/name.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/commodityManagement/cmdInformation",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/cmdMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    
});
//异步获取所有商户列表
router.post('/getTenant',function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/merchant/query/name.do',  //请求地址            
             headers:req.headers,
             method:"post"			 
		 },
		 page:{	           		 
			 asyn:true,			 
		 },
		 contents:req.body, //请求传入参数
		 res:res
	};
	httpRequest(serive); 
});
//商品预览
router.get('/goodsView', function(req, res, next) {
     var serive = {
		 options:{
			 path: '/admin/product/info/detail.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/commodityManagement/goodsView",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/cmdMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    
});
//兑换码页面
router.get('/codeView', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/product/code/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/commodityManagement/codeView",   	
			 navConf:{
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/cmdMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});


router.post('/getGoodsDetail',function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/product/info/detail.do',  //请求地址            
             headers:req.headers,
             method:"get"			 
		 },
		 page:{	           		 
			 asyn:true,			 
		 },
		 contents:req.body, //请求传入参数
		 res:res
	};
	httpRequest(serive); 
});

//兑换方式设置
router.post('/exchange',function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/product/info/exchange.do',  //请求地址            
             headers:req.headers,
             method:"post"			 
		 },
		 page:{	           		 
			 asyn:true,			 
		 },
		 contents:req.body, //请求传入参数
		 res:res
	};
	httpRequest(serive); 
});
//商品提交
router.post('/submit',function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/product/info/submit.do',  //请求地址            
             headers:req.headers,
             method:"post"			 
		 },
		 page:{	           		 
			 asyn:true,			 
		 },
		 contents:req.body, //请求传入参数
		 res:res
	};	    
	httpRequest(serive); 
});


//删除商品
router.post('/deleteGoods', function(req, res, next) {
     var serive = {
		 options:{
			 path: '/admin/product/info/delete.do',             
             headers:req.headers,
             method:"post"			 
		 },
		 page:{	           		 
			 asyn:true,			 
		 },
		 contents:req.body, 
		 res:res
	}; 	  
	httpRequest(serive); 
});

/* 编辑商品 */
router.get('/editorGoods', function(req, res, next) {
//	res.render("merchant/commodityManagement/editorGoods")
     var serive = {
		 options:{
			 path: '/admin/product/info/detail.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/commodityManagement/editorGoods",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/cmdMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 
	 httpRequest(serive); 
});


//查看兑换码
router.get('/codeView', function(req, res, next) {
     var serive = {
		 options:{
			 path: '/admin/product/code/list.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"merchant/commodityManagement/codeView",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/merchant/cmdMan",
				 navSec:"/merchant/cmdMan",
			 },
		 },
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"15"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    
});





module.exports = router;
"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');
/*运营中心-商户管理*/
/* route for orderManagement*/
//商户待设置管理列表
router.get('/tenantRefer', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/merchant/beset/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/merManagement/index",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/merManagement/tenantRefer",
				 navThird:"/operation/merManagement/tenantRefer"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10",remState:"0"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//商户待设置管理列表（异步）
router.post('/tenantRefer', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/merchant/beset/list.do',            
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
//商户推荐管理
router.get('/mersReferMan', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/merchant/sort/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/merManagement/mersReferMan",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/merManagement/tenantRefer",
				 navThird:"/operation/merManagement/mersReferMan"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10",location:"1"},  //请求传入参数		 res:res,
		 res:res,
	 }; 	 
	 httpRequest(serive);  
});
//商户推荐管理（首页固定位置展示数据复用）
router.post('/mersReferManPos', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/merchant/sort/list.do',            
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
//推荐管理列表页的设置商户推荐按钮
router.get('/setManReferLink', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/merchant/beset/detail.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/merManagement/setManRefer",   //模板地址		
			navConf:{   //导航信息
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/merManagement/tenantRefer",
				 navThird:"/operation/merManagement/tenantRefer"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{merchantId:""},  //请求传入参数
		res:res,
	}; 	 
	httpRequest(serive);
});
//商户推荐管理上架商户列表编辑按钮
router.get('/editorManReferLines', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/merchant/beset/detail.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/merManagement/editorManRefer",   //模板地址		
			navConf:{   //导航信息
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/merManagement/tenantRefer",
				 navThird:"/operation/merManagement/mersReferMan"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{merchantId:""},  //请求传入参数
		res:res,
	}; 	 
	httpRequest(serive);
});
//商户上下架列表编辑按钮
router.get('/editorManReferLink', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/merchant/beset/detail.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/merManagement/editorManRefer",   //模板地址		
			navConf:{   //导航信息
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/merManagement/tenantRefer",
				 navThird:"/operation/merManagement/offUpShelf"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{merchantId:""},  //请求传入参数
		res:res,
	}; 	 
	httpRequest(serive);
});

//商户上下架管理
router.get('/offUpShelf', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/merchant/status/list.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/merManagement/offUpShelf",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/merManagement/tenantRefer",
				navThird:"/operation/merManagement/offUpShelf"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10",status:""},  //请求传入参数
		res:res,
	}; 	 
	httpRequest(serive);
});
//推荐管理-首页推荐商户
router.post('/referralHome', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/merchant/recommend/homepage/sort/update.do',            
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
//频道页设置排序号
router.post('/setSord', function(req, res, next){
	var serive = {
		 options:{
//			 path: '/admin/merchant/recommend/update.do',            
             path: '/admin/merchant/recommend/sort/update.do',
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
//商户上下架管理列表直接上架   
router.post('/lisUpDown', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/merchant/beset/grounding.do',            
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
//商户下架
router.post('/undercarriage', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/merchant/undercarriage.do',            
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

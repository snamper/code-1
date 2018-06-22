"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');
/*运营中心-轮播图管理*/
/* route for orderManagement*/
router.get('/flexMan', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/circulation/image/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/flexManagement/index",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/flexManagement/flexMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10",status:"1",locationType:'0'},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//轮播图首页列表渲染（异步）
router.post('/flexMan', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/circulation/image/list.do',            
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
//点击创建首页/商城轮播图按钮(2个创建按钮公用一个路由路径)
router.get('/addFlexImgBtn', function(req, res, next) {
	var serive = {
		 options:{
             headers:req.headers,  
             path: '/admin/circulation/image/list.do', 
		 },
		 page:{
		 	url:"operation/flexManagement/addFlexImgMan",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/flexManagement/flexMan"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10",status:"1"},  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//添加图片轮播
router.get('/addFlexImgMan', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/circulation/image/save.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/flexManagement/addFlexImgMan",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/flexManagement/flexMan"
			},
		},
		res:res
	}; 	 
	httpRequest(serive);
});
//轮播图弹窗确定后的提交/上架（异步）
router.post('/addFlexImgMan', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/circulation/image/save.do',            
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
//编辑轮播图按钮点击跳转
router.get('/editorFlexImgBtn', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/circulation/image/detail.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/flexManagement/editorFlexImgMan",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/flexManagement/flexMan"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//编辑轮播图
router.post('/editorFlexImgMan', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/circulation/image/save.do',            
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
//删除轮播图
router.post('/delFlexPic', function(req, res, next) {	
 	var serive = {
		 options:{
			 path: '/admin/circulation/image/delete.do',            
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
//轮播图上下架
router.post('/toUpFlexPic', function(req, res, next) {	
 	var serive = {
		 options:{
			 path: '/admin/circulation/image/setting/shelves.do',            
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
//修改排序号
router.post('/editorSorts', function(req, res, next) {	
 	var serive = {
		 options:{
			 path: '/admin/circulation/image/sort.do',            
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
//查看轮播图
router.get('/flexImgDetail', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/circulation/image/detail.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/flexManagement/flexImgDetail",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/flexManagement/flexMan"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
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

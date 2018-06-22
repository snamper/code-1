"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../../controller/httpRequest');
/*运营中心-广告管理*/
/* route for orderManagement*/
router.get('/advMan', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/ad/to/setup/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/advManagement/index",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/advManagement/advMan",
				 navThird:"/operation/advManagement/advMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res,
	 }; 	 
	 httpRequest(serive);  
});
//设置积分投放的广告信息展示
router.get('/showAdvsMes', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/ad/show/detail.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/advManagement/setIntegralPut",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/advManagement/advMan",
				 navThird:"/operation/advManagement/advMan"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//设置积分投放
router.post('/setIntPut', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/ad/integral/setup.do',            
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
//点击设置积分投放下一步按钮
router.get('/setAdvNextBtn', function(req, res, next) {
	var serive = {
		 options:{
             headers:req.headers,                    	 
		 },
		 page:{
		 	url:"operation/advManagement/setAdvSort",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/advManagement/advMan",
				navThird:"/operation/advManagement/setAdvNextBtn"
			},
		},
		//contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//上架广告积分设置
router.post('/setAdvNextUp', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/ad/putaway.do',            
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
//下架广告积分设置
router.post('/setAdvOnOff', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/ad/soldout.do',            
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
//广告管理-设置推荐排序
router.post('/setAdvSort', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/ad/set/position.do',            
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
//运营中心-广告管理-推荐管理列表页
router.get('/advReferMan', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/ad/position/list.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/advManagement/advReferMan",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/advManagement/advMan",
				navThird:"/operation/advManagement/advReferMan"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10",showInHomePage:"true"},  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//运营中心-广告管理-上下架列表
router.get('/advOffUpList', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/ad/shelf/list.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/advManagement/advOffUpList",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/advManagement/advMan",
				navThird:"/operation/advManagement/advOffUpList"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10",status:""},  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});

//运营中心-广告管理-上下架管理-广告编辑按钮
router.get('/editorIntegralPut', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/ad/show/detail.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/advManagement/editorIntegralPut",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/advManagement/advMan",
				navThird:"/operation/advManagement/advOffUpList"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});

//运营中心-广告管理-广告查看(菜单1)
router.get('/showAdvDetailf', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/ad/show/detail.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/advManagement/showAdvDetail",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/advManagement/advMan",
				navThird:"/operation/advManagement/advMan"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//运营中心-广告管理-广告查看(菜单2)
router.get('/showAdvDetails', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/ad/show/detail.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/advManagement/showAdvDetail",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/advManagement/advMan",
				navThird:"/operation/advManagement/advReferMan"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//运营中心-广告管理-广告查看(菜单3)
router.get('/showAdvDetailt', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/ad/show/detail.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/advManagement/showAdvDetail",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/advManagement/advMan",
				navThird:"/operation/advManagement/advOffUpList"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//广告管理-相关广告推荐 弹窗广告列表渲染（异步）
router.post('/popupAdv', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/ad/manage/list.do',            
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
//广告预览H5 
router.post('/advPreviewH5', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/ad/show/detail.do',            
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
module.exports = router;

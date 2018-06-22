"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');
//客户管理-商户管理
//商户列表
router.get('/tenantList', function(req, res, next) {		
	var serive = {
		 options:{
			 path: '/admin/merchant/query/list.do',
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"client/tenantManagement/index",   	
			 navConf:{ 
				 nav:"/client/advertiserManage",
				 navSec:"/client/tenantManagement/tenantList",
				 navThird:"/client/tenantManagement/tenantList"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageSize:"10",pageNo:"1"},  //请求传入参数
		 res:res,
	 }; 	
	 httpRequest(serive); 
});
//新建按钮跳转
router.get('/addTenantBtn', function(req, res, next) {
	var serive = {
		 options:{
		 	path: '/admin/merchant/create.do',
             headers:req.headers,                    	 
		 },
		 page:{	           	 
			 url:"client/tenantManagement/addTenants",   	
			 navConf:{ 
				 nav:"/client/advertiserManage",
				 navSec:"/client/tenantManagement/tenantList"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//新建商户
router.get('/addTenants', function(req, res, next) {
  var serive = {
		 options:{
			 path: '/admin/merchant/create.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"client/tenantManagement/addTenants",   	
			 navConf:{ 
				 nav:"/client/advertiserManage",
				 navSec:"/client/tenantManagement/tenantList"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});

//商户查看
router.get('/showTenants', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/merchant/detail.do',  //请求地址            
             headers:req.headers
		 },
		 page:{	           	 
			 url:"client/tenantManagement/tenantDetail",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/client/advertiserManage",
				 navSec:"/client/tenantManagement/tenantList",
				 navThird:"/client/tenantManagement/showTenants"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive); 
});
//商户编辑
router.get('/editorTenant', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/merchant/detail.do',  //请求地址            
             headers:req.headers
		 },
		 page:{	           	 
			 url:"client/tenantManagement/editorTenants",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/client/advertiserManage",
				 navSec:"/client/tenantManagement/tenantList",
				 navThird:"/client/tenantManagement/editorTenant"
			 }
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive); 
});
//商户删除
router.post('/delTenant', function(req, res, next) {		//权限管理
  var serive = {
		 options:{
			 path: '/admin/merchant/del.do',            
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

//商户待审核列表
router.get('/tenantAuditList', function(req, res, next) {		
	var serive = {
		 options:{
			 path: '/admin/merchant/list/all.do',
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"client/tenantManagement/tenantAuditList",   	
			 navConf:{ 
				 nav:"/client/advertiserManage",
				 navSec:"/client/tenantManagement/tenantAuditList",
				 navThird:"/client/tenantManagement/tenantAuditList"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pSize:"10",pNo:"1",status:"1"},  //请求传入参数
		 res:res,
	 }; 	
	 httpRequest(serive); 
});
//点击商户审核按钮跳转并渲染数据
router.get('/showTenantsF', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/merchant/detail.do',  //请求地址            
             headers:req.headers
		 },
		 page:{	           	 
			 url:"client/tenantManagement/merchantsAudit",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/client/advertiserManage",
				 navSec:"/client/tenantManagement/tenantAuditList",
				 navThird:"/client/tenantManagement/showTenantsF"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive); 
});
//商户审核
router.post('/merchantsAudit', function(req, res, next) {		//权限管理
  var serive = {
		 options:{
			 path: '/admin/merchant/info/approval.do',            
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

//商户查看(商户待审核列表查看)
router.get('/showTenantf', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/merchant/detail.do',  //请求地址            
             headers:req.headers
		 },
		 page:{	           	 
			 url:"client/tenantManagement/tenantDetail",   //模板地址		
			 navConf:{   //导航信息
				 nav:"/client/advertiserManage",
				 navSec:"/client/tenantManagement/tenantAuditList",
				 navThird:"/client/tenantManagement/showTenantf"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive); 
});
//商户提交(商户上下架列表)
router.post('/tenantSubmit', function(req, res, next) {		//权限管理
  var serive = {
		 options:{
			 path: '/admin/merchant/submit.do',            
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
module.exports = router;
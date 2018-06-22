var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');
/* 系统管理*/
router.get('/', function(req, res, next) {	//用户管理首页
  var serive = {
		 options:{
			 path: '/admin/system/user/list.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"system/userManagement/index",   	
			 navConf:{ 
				 nav:"/system/resourceManage",
				 navSec:"/system/userManage",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//异步获取
router.post('/', function(req, res, next) {	
	var serive = {
		 options:{
			 path: '/admin/manage/user/list.do',  //请求地址            
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
router.get('/addUser', function(req, res, next) {	//新增用户
  var serive = {
		 options:{
			 path: '/admin/role/list2.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"system/userManagement/addUser",   	
			 navConf:{ 
				 nav:"/system/resourceManage",
				 navSec:"/system/userManage",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"1000"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive);
});
router.get('/editUser', function(req, res, next) {	//编辑用户
		var serive = {
		 options:{
			 path: '/admin/system/user/detail.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"system/userManagement/editUser",   	
			 navConf:{ 
				 nav:"/system/resourceManage",
				 navSec:"/system/userManage",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive);
});
//异步获取角色列表
router.post('/getRoleList', function(req, res, next) {	//编辑用户
  var serive = {
		 options:{
			 path: '/admin/role/list2.do',  //请求地址            
             headers:req.headers,
             method:"get"			 
		 },
		 page:{	           		 
			 asyn:true,			 
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"1000"},  //请求传入参数
		 res:res
	}; 	
	httpRequest(serive); 
});

router.post('/editUser', function(req, res, next) {	//编辑用户
  var serive = {
		 options:{
			 path: '/admin/system/user/update.do',  //请求地址            
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
//删除用户
router.post('/delUser', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/manage/user/delete.do',  //请求地址            
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
//禁用用户
router.post('/desableUser', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/user/update/status.do',  //请求地址            
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
//初始化用户密码
router.post('/initUserPassword', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/user/update/default.do',  //请求地址            
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
//增加用户
router.post('/addUser', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/system/user/create.do',  //请求地址            
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
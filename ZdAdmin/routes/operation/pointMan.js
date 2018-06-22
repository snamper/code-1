"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');
/*运营中心-积分管理*/
/* route for orderManagement*/
router.get('/', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/invite/friend/config/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/pointMan/requestFriendConfig",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pointMan",
				 navThird:"/operation/pointMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});

//router.get('/', function(req, res, next) {
//	var serive = {
//		 options:{
//			 path: '/admin/points/model/valid.do',          
//           headers:req.headers,			 
//		 },
//		 page:{	           	 
//			 url:"operation/pointMan/index",   
//			 navConf:{   
//				 nav:"/operation/flexManagement/flexMan",
//				 navSec:"/operation/pointMan",
//				 navThird:"/operation/pointMan",
//			 },
//		 },
//		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
//		 res:res
//	 }; 	 
//	 httpRequest(serive);  
//});
//更改发放模型按钮跳转 
router.get('/changeModelLink', function(req, res, next) {
	var serive = {
		 options:{
		 	path: '/admin/points/model/valid/list.do', 
            headers:req.headers			 
		 },
		 page:{	           	 
			 url:"operation/pointMan/editorModels",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pointMan",
				 navThird:"/operation/pointMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//更改发放模型  
router.post('/changeModel', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/points/model/create.do',            
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

//内容发放积分模型
router.get('/integralSet', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/vip/rank/info/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/pointMan/integralSet",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pointMan",
				 navThird:"/operation/pointMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});

//注册积分模型
router.get('/registerIntegral', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/new/user/integral/manage/detail.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/pointMan/registerIntegral",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pointMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:'',  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
	 
});

//邀请好友模型
router.get('/requestFriendConfig', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/invite/friend/config/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/pointMan/requestFriendConfig",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pointMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:'',  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);   
});
//每日停留积分管理
router.get('/dayStayTotalMan', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/small/clock/setting.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/pointMan/dayStayTotalMan",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pointMan"
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});

// cpm积分模型变更记录
router.get('/changeRecordCPM', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/points/model/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/pointMan/pointChangeRecord",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pointMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);   
});
// 内容积分模型变更记录
router.get('/changeRecordCONT', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/integral/release/log/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/pointMan/pointChangeRecord",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pointMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);   
});
// 注册积分模型变更记录
router.get('/changeRecordREGIST', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/new/user/integral/manage/log/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/pointMan/pointChangeRecord",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pointMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);   
});
// 邀请好友积分模型变更记录
router.get('/changeRecordNVITE', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/invite/friend/config/log/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/pointMan/pointChangeRecord",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pointMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);   
});
// 实时视频积分
router.get('/videoPoint', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/forward/integral/release/config/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/pointMan/videoPoint",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pointMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);   
});
// 实时视频积分配置积分
router.get('/videoPointSet', function(req, res, next) {
	if(req.query){
		var path = '/admin/forward/integral/release/detail.do'
	}else{
		var path = '/admin/points/model/list.do'
	}
	var serive = {
		 options:{
			 path: path,          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/pointMan/videoPointSet",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pointMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);   
});
// 发放明细
router.get('/videoPointDetail', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/forward/integral/release/detail/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/pointMan/videoPointDetail",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/pointMan",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);   
});

module.exports = router;

"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var upload = require('./../../controller/upload');
var httpRequest = require('./../../controller/httpRequest');
/*运营中心-任务管理*/
/* route for orderManagement*/
router.get('/', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/task/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/taskManagement/index",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/taskManagement",
				 navThird:"/operation/taskManagement",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//启用任务
router.post('/enable', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/task/enable.do',            
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

//禁用任务
router.post('/disable', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/task/disable.do',            
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
//新建任务页面初始化
router.get('/addTask', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/ad/manage/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/taskManagement/addTask",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/taskManagement",
				 navThird:"/operation/taskManagement",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{"pageSize":"1000000000","pageNo":1,"status":7},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//新建任务
router.post('/addTask', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/task/add.do',            
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
//修改任务页面初始化
router.get('/editTask', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/task/detail.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/taskManagement/editTask",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/taskManagement",
				 navThird:"/operation/taskManagement",
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//获取广告
router.get('/getAdverList', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/ad/manage/list.do',            
             headers:req.headers, 
             method:"get"         	 
		 },
		 page:{	           	 
			 asyn:true
		 },
		 contents:{"pageSize":"1000000000","pageNo":1,"status":7},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive);   
});
//修改任务
router.post('/updateTask', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/task/update.do',            
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
//查看任务
router.get('/taskView', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/task/detail.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/taskManagement/taskView",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/taskManagement",
				 navThird:"/operation/taskManagement",
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});

/*新版任务管理*/
//新手任务管理
router.get('/novicesTaskList', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/task/newhand/getInfoDetail.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/taskManagement/novicesTask/novicesTaskList",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/taskManagement",
				 navThird:"/operation/taskManagement/novicesTaskList",
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//新手任务设置/编辑
router.get('/novicesTaskSet', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/task/newhand/getInfoDetail.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/taskManagement/novicesTask/novicesTaskSet",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/taskManagement",
				 navThird:"/operation/taskManagement/novicesTaskList",
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//新手任务分享日志  
router.get('/taskLogList', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/task/newhand/logList.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/taskManagement/novicesTask/showNovicesLogList",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/taskManagement",
				 navThird:"/operation/taskManagement/novicesTaskList",
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//签到任务列表
router.get('/checkTaskList', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/task/sign/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/taskManagement/novicesTask/checkTaskList",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/taskManagement",
				 navThird:"/operation/taskManagement/checkTaskList",
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//设置/编辑签到任务
router.get('/setCheckTask', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/task/sign/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/taskManagement/novicesTask/setCheckTask",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/taskManagement",
				 navThird:"/operation/taskManagement/checkTaskList",
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//查看签到任务日志列表
router.get('/showCheckTaskList', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/task/sign/record/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/taskManagement/novicesTask/showCheckTaskList",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/taskManagement",
				 navThird:"/operation/taskManagement/checkTaskList",
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//抽奖任务列表
router.get('/lotteryTaskList', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/task/lucky/draw/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/taskManagement/novicesTask/lotteryTaskList",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/taskManagement",
				 navThird:"/operation/taskManagement/lotteryTaskList",
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//抽奖设置页面
router.get('/setLotteryTask', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/task/lucky/draw/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/taskManagement/novicesTask/setLotteryTask",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/taskManagement",
				 navThird:"/operation/taskManagement/lotteryTaskList",
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//查看中奖日志列表
router.get('/showLotteryLogList', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/task/lucky/draw/log.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/taskManagement/novicesTask/showLotteryLogList",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/taskManagement",
				 navThird:"/operation/taskManagement/lotteryTaskList",
			 },
		 },
		  contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});

module.exports = router;

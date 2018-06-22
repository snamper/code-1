var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../controller/httpRequest');
var config = require('./../controller/config');
/* GET users listing. */
router.get('/', function(req, res, next) {
	 res.render('login',{"config":config});
});
router.post('/', function(req, res, next) {
	console.log("1111")
     var serive = {
		 options:{
			 path: '/admin/user/login.do',  //请求地址            
             headers:req.headers,
             method:"post"			 
		 },
		 page:{	           		 
			 asyn:true,			 
		 },
		 contents:req.body, //请求传入参数
		 res:res
	}; 	
    console.log(req.body);	
	httpRequest(serive); 
});
router.post('/getResource', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/login/user/resource/meuns.do',            
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
router.post('/out', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/user/login/out.do',            
             headers:req.headers,   	 
		 },
		 page:{	           	 
			 asyn:true
		 },
		 contents:req.body,
		 res:res
	 }; 	
	 httpRequest(serive);     	
});
//获取按钮权限
router.post('/getMenu', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/permit/menu/info.do',            
             headers:req.headers,   	 
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

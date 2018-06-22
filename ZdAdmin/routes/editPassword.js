var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../controller/httpRequest');
/* GET users listing. */

router.post('/', function(req, res, next) {
     var serive = {
		 options:{
			 path: '/admin/user/update/password.do',  //请求地址            
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

module.exports = router;
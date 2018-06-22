var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('./../controller/httpRequest');

/* GET home page. */
router.get('/', function(req, res, next) {
     var serive = {
		 options:{
			path: '/admin/role/list.do',            
            headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"main",   	
			 navConf:{ 
				 nav:"/",
				 navSec:"/",
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"1"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});

module.exports = router;

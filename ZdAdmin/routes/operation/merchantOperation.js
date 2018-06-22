/operation for merchantOperation/
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('../../controller/httpRequest');
var config = require('../../controller/config');
/* GET users listing. */
//心愿单
router.get('/wishList', function(req, res, next) {
	 var serive = {
		 options:{
			 path: '/admin/mall/layout/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/merchantOperation/index",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/merchantOperation/wishList"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:'',  //请求传入参数
		 res:res,
	 }; 	 
	 httpRequest(serive); 
});
//精品推荐
router.get('/recBoutique', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/mall/layout/list.do',          
             headers:req.headers,			 
		},
		page:{	           	 
			 url:"operation/merchantOperation/recBoutique",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/merchantOperation"
			 },
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:'',  //请求传入参数
		res:res,
	}; 	 
	httpRequest(serive); 
});

module.exports = router;





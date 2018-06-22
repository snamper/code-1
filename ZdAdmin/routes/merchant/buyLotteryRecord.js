"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var httpRequest = require('./../../controller/httpRequest');

/*购彩记录列表*/
router.get('/', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/pay/getOrderList.do',            
            headers:req.headers,			 
		},
		page:{	           	 
			url:"merchant/buyLotteryRecord/index",   	
			navConf:{
				nav:"/merchant/cmdMan",
				navSec:"/merchant/buyLotteryRecord",
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		res:res
	}; 	
	httpRequest(serive); 
});

module.exports = router;
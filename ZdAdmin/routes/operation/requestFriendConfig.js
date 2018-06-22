/operation/
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('../../controller/httpRequest');
var config = require('../../controller/config');
/* GET users listing. */
router.get('/', function(req, res, next) {
	 var serive = {
		 options:{
			 path: '/admin/invite/friend/config/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/requestFriendConfig",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/requestFriendConfig"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:'',  //请求传入参数
		 res:res,
	 }; 	 
	 httpRequest(serive); 
});


module.exports = router;





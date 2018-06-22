"use strict";
var express = require('express');
var router = express.Router();
var url = require("url");
var httpRequest = require('../../controller/httpRequest');
/*运营中心-商品管理*/
/* route for orderManagement*/
router.get('/ordMan', function(req, res, next) {
	var serive = {
		 options:{
			 path: '/admin/product/recommend/beset/list.do',          
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/orderManagement/index",   
			 navConf:{   
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/opMerMan/ordMan",
				 navThird:"/operation/opMerMan/ordMan"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10"},  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);  
});
//购买商品设置
router.get('/setBuyGoods', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/product/recommend/info.do',  //请求地址            
            headers:req.headers
		},
		 page:{
		 	url:"operation/orderManagement/setBuyGoods",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/opMerMan/ordMan",
				 navThird:"/operation/opMerMan/ordMan"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//广告商品设置
router.get('/setAdvGoods', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/product/entrance/info.do',  //请求地址            
            headers:req.headers
		},
		 page:{
		 	url:"operation/orderManagement/setAdvGoods",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/opMerMan/ordMan",
				 navThird:"/operation/opMerMan/ordMan"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//充值商品设置
router.get('/setRechargeGoods', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/product/info/detail.do',  //请求地址            
            headers:req.headers
		},
		 page:{
		 	url:"operation/orderManagement/setRechargeGoods",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/opMerMan/ordMan",
				 navThird:"/operation/opMerMan/ordMan"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//在售商品列表页的  充值商品设置
router.get('/setOnlineRechargeGoods', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/product/info/detail.do',  //请求地址            
            headers:req.headers
		},
		 page:{
		 	url:"operation/orderManagement/setOnlineRechargeGoods",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/opMerMan/ordMan",
				 navThird:"/operation/opMerMan/merManRefer"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//充值商品保存设置（首次设置保存）
router.post('/rechargeSet', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/operating/recharge/product/set.do',            
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
//充值商品编辑保存设置（编辑设置保存）
router.post('/rechargeUpdate', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/operating/recharge/product/update.do',            
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
//设置推荐管理列表
router.get('/merManRefer', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/product/recommend/list.do',  //请求地址            
            headers:req.headers
		},
		 page:{
//		 	url:"operation/orderManagement/merManRefer",   //模板地址		
			url:"operation/orderManagement/recommendMan",
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/opMerMan/ordMan",
				navThird:"/operation/opMerMan/merManRefer"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10",location:1},  //请求传入参数
		res:res,
	}; 	 
	httpRequest(serive);
});
//推荐设置列表- 首页推荐商品设置
router.post('/homePageSort', function(req, res, next){
	var serive = {
		 options:{
			 path: "/admin/product/recommend/homePageSort/set.do",            
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
//推荐设置列表- 首页已推荐商品渲染
router.post('/homeGoodsPos', function(req, res, next){
	var serive = {
		 options:{
			 path: "/admin/product/recommend/list.do",            
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
//设置推荐管理-修改排序号
router.post('/setManSort', function(req, res, next){
	var serive = {
		 options:{
			 path: "/admin/product/recommend/channelPageSort/set.do",            
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
//设置推荐管理-上下架列表
router.get('/upDownList', function(req, res, next) {
	var serive = {
		options:{
			path: '/admin/product/recommend/slaves/list.do',  //请求地址            
            headers:req.headers,
		},
		 page:{
		 	url:"operation/orderManagement/upDownList",   //模板地址		
			navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/opMerMan/ordMan",
				navThird:"/operation/opMerMan/upDownList"
			},
		},
		contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pNo:"1",pSize:"10",status:2},  //请求传入参数
		res:res
	}; 	 
	httpRequest(serive);
});
//设置推荐管理-首页推荐商品下拉列表数据
router.post('/upDownLists', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/product/recommend/slaves/list.do',            
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
//商品管理-商品查看
router.get('/showTrades1', function(req, res, next) {//详细版本
     var serive = {
		 options:{
			 path: '/admin/product/info/detail.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/orderManagement/showTrades",   //模板地址		
			 navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/opMerMan/ordMan",
				navThird:"/operation/opMerMan/ordMan"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    
});
router.get('/showTrades2', function(req, res, next) {//详细版本
     var serive = {
		 options:{
			 path: '/admin/product/info/detail.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/orderManagement/showTrades",   //模板地址		
			 navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/opMerMan/ordMan",
				navThird:"/operation/opMerMan/merManRefer"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    
});
router.get('/showTrades3', function(req, res, next) {//详细版本
     var serive = {
		 options:{
			 path: '/admin/product/info/detail.do',  //请求地址            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/orderManagement/showTrades",   //模板地址		
			 navConf:{   //导航信息
				nav:"/operation/flexManagement/flexMan",
				navSec:"/operation/opMerMan/ordMan",
				navThird:"/operation/opMerMan/upDownList"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:"",  //请求传入参数
		 res:res
	 }; 	 
	 httpRequest(serive);    
});
//商品上架
router.post('/slaves', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/product/recommend/slaves/set.do',            
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
//商品上架保存设置(商品首次推荐待设置)
router.post('/goodSet', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/product/recommend/set.do',            
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
//商品上架保存设置修改
router.post('/updategoodSet', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/product/recommend/update.do',            
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
//商品设置&编辑页面 CPS入口配置项
router.post('/setCPS', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/product/entrance/edit.do',            
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
//商品分享统计
router.get('/goodsShareStat', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/product/share/statistical.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/orderManagement/goodsShareStat/goodsShareStat",   	
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/opMerMan/ordMan",
				 navThird:"/operation/opMerMan/goodsShareStat"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//商品分享统计详情
router.get('/goodsShareDetail', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/product/share/day/statistical.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/orderManagement/goodsShareStat/goodsShareDetail",   	
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/opMerMan/ordMan",
				 navThird:"/operation/opMerMan/goodsShareStat"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//商品分享统计日志
router.get('/shareStatLogs', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/product/user/share/statistical/detail.do',            
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/orderManagement/goodsShareStat/shareStatLogs",   	
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/opMerMan/ordMan",
				 navThird:"/operation/opMerMan/goodsShareStat"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//打包商品管理列表  
router.get('/goodsPackManList', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/goodspackage/manager/query.do',            
             headers:{
               'Content-Type': 'application/json',
                cookie:req.headers.cookie,
             },
             method:"post" 
		 },
		 page:{	           	 
			 url:"operation/orderManagement/goodsPackManList",   	
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/opMerMan/ordMan",
				 navThird:"/operation/opMerMan/goodsPackManList"
			 },
		 },
		 contents:JSON.stringify(url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"}),  //请求传入参数
		 res:res
	}; 	
	 httpRequest(serive);
});
//创建商品包  
router.get('/addGoodsPack', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/product/recommend/beset/list.do',           
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/orderManagement/addGoodsPack",   	
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/opMerMan/ordMan",
				 navThird:"/operation/opMerMan/goodsPackManList"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:{pageNo:"1",pageSize:"10"},  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});
//编辑商品包  
router.get('/editorGoodsPack', function(req, res, next) {
	var serive = {
		options:{
			 path: '/admin/goodspackage/manager/get.do',           
             headers:req.headers,			 
		 },
		 page:{	           	 
			 url:"operation/orderManagement/addGoodsPack",   	
			 navConf:{
				 nav:"/operation/flexManagement/flexMan",
				 navSec:"/operation/opMerMan/ordMan",
				 navThird:"/operation/opMerMan/goodsPackManList"
			 },
		 },
		 contents:url.parse(req.url).query?url.parse(unescape(req.url),true).query:'',  //请求传入参数
		 res:res
	 }; 	
	 httpRequest(serive); 
});


//商品列表（异步）
router.post('/ordMan', function(req, res, next){
	var serive = {
		 options:{
			 path: '/admin/product/list.do',            
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
module.exports = router;

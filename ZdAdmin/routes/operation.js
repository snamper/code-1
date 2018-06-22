var express = require('express');
var operateMerRouter = express.Router();

var opMerMan = require('./operation/opMerMan');//运营-商品管理
var recMall = require('./operation/recMall');//运营-商品管理-商城推荐
var merManagement = require('./operation/merManagement');//运营-商户管理
var advManagement = require('./operation/advManagement');//运营-广告管理
var flexManagement = require('./operation/flexManagement');//运营-轮播图管理
var taskManagement = require('./operation/taskManagement');//运营-任务管理
var memberManagement = require('./operation/memberManagement');
var contentManagement = require('./operation/contentManagement');
var registerIntegral = require('./operation/registerIntegral');
var requestFriendConfig = require('./operation/requestFriendConfig');
var accountRiskRating = require('./operation/accountRiskRating');//账号风险管理
var actManagement = require('./operation/actManagement');
var dayLiveMan = require('./operation/dayLiveManagement');//日活量统计
var tagLibraryMan = require('./operation/tagLibraryMan');//标签库管理
var pushMessage = require('./operation/pushMessage');
var pointMan = require('./operation/pointMan');//积分管理
var indexEntrance = require('./operation/indexEntrance');
var merchantOperation = require('./operation/merchantOperation');//商家运营
var couponsManagement = require('./operation/couponsManagement');//优惠券管理

operateMerRouter.use("/recMall",recMall);//运营-商品管理
operateMerRouter.use("/opMerMan",opMerMan);//运营-商品管理-商城推荐
operateMerRouter.use("/merManagement",merManagement);//运营-商户管理
operateMerRouter.use("/advManagement",advManagement);//运营-广告管理
operateMerRouter.use("/flexManagement",flexManagement);//运营-轮播图管理
operateMerRouter.use("/taskManagement",taskManagement);//运营-任务管理
operateMerRouter.use("/memberManagement",memberManagement);
operateMerRouter.use("/contentManagement",contentManagement);
operateMerRouter.use("/registerIntegral",registerIntegral);
operateMerRouter.use("/requestFriendConfig",requestFriendConfig);
operateMerRouter.use("/accountRiskRating",accountRiskRating);//账号风险管理
operateMerRouter.use("/actManagement",actManagement);
operateMerRouter.use("/dayLiveMan",dayLiveMan);//日活量统计
operateMerRouter.use("/tagLibraryMan",tagLibraryMan);//标签库管理
operateMerRouter.use("/pushMessage",pushMessage);
operateMerRouter.use("/pointMan",pointMan); // 积分管理
operateMerRouter.use("/indexEntrance",indexEntrance); // 积分管理
operateMerRouter.use("/merchantOperation",merchantOperation);//商家运营
operateMerRouter.use("/couponsManagement",couponsManagement);//优惠券管理

module.exports = operateMerRouter;
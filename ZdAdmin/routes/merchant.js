var express = require('express');
var merchantRouter = express.Router();
var cashMan = require('./merchant/cashMan');
var cmdMan = require('./merchant/cmdMan');
var audit = require('./merchant/audit');
var order = require('./merchant/order');
var refund = require('./merchant/refund');
var goodsCate = require('./merchant/goodsCate');
var pointCard = require('./merchant/pointCard');
var noviceWelfare = require('./merchant/noviceWelfare');//新手福利管理
var buyLotteryRecord = require('./merchant/buyLotteryRecord');//购彩记录

merchantRouter.use("/cashMan",cashMan);
merchantRouter.use("/cmdMan",cmdMan);
merchantRouter.use("/audit",audit);
merchantRouter.use("/order",order);
merchantRouter.use("/refund",refund);
merchantRouter.use("/goodsCate",goodsCate);
merchantRouter.use("/pointCard",pointCard);
merchantRouter.use("/noviceWelfare",noviceWelfare);//新手福利管理
merchantRouter.use("/buyLotteryRecord",buyLotteryRecord);//购彩记录

module.exports = merchantRouter;

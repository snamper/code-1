var express = require('express');
var systemRouter = express.Router();
var advertManage = require('./advertising/advertManage');
var audit = require('./advertising/audit');
var advertPrice = require('./advertising/advertPrice');
var dspAdver = require('./advertising/dspAdver');

systemRouter.use("/advertManage",advertManage);
systemRouter.use("/audit",audit);
systemRouter.use("/advertPrice",advertPrice);
systemRouter.use("/dspAdver",dspAdver);

var audit = require('./advertising/audit');


module.exports = systemRouter;
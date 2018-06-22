var express = require('express');
var systemRouter = express.Router();
var advertiserManage = require('./client/advertiserManage');
var tenantManagement = require('./client/tenantManagement');
var audit = require('./client/audit');

systemRouter.use("/advertiserManage",advertiserManage);
systemRouter.use("/tenantManagement",tenantManagement);
systemRouter.use("/audit",audit);

module.exports = systemRouter;




var express = require('express');
var dataManageRouter = express.Router();
var conDataManage = require('./dataManage/conDataManage');
var advDataManage = require('./dataManage/advDataManage');
var merDataManage = require('./dataManage/merDataManage');

dataManageRouter.use("/conDataManage",conDataManage);
dataManageRouter.use("/advDataManage",advDataManage);
dataManageRouter.use("/merDataManage",merDataManage);


module.exports = dataManageRouter;
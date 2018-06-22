var express = require('express');
var systemRouter = express.Router();
var permissionManage = require('./system/permissionManage');
var userManage = require('./system/userManage');
var roleManage = require('./system/roleManage');
var resourceManage = require('./system/resourceManage');
var versionManage = require('./system/versionManage');


systemRouter.use("/permissionManage",permissionManage);
systemRouter.use("/userManage",userManage);
systemRouter.use("/roleManage",roleManage);
systemRouter.use("/resourceManage",resourceManage);
systemRouter.use("/versionManage",versionManage);




module.exports = systemRouter;




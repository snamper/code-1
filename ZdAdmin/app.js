var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var login = require('./routes/login');
var editPassword = require('./routes/editPassword');
var merchant = require('./routes/merchant');
var operation = require('./routes/operation');
var system = require('./routes/system'); //系统管理
var advertising = require('./routes/advertising'); //广告管理
var client = require('./routes/client'); //客户管理
var feedback = require('./routes/feedback'); //意见反馈
var appUserControl = require('./routes/appUserControl'); //APP用户管理
var criticism = require('./routes/criticism'); //评价管理
var dataManage = require('./routes/dataManage'); //数据统计
var games = require('./routes/games'); //小游戏管理
var exchangeCode = require('./routes/exchangeCode'); //积分互换管理

var app = express();
var swig = require("swig");
var swigFilter = require("./controller/swigFilter");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine("html",swig.renderFile);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);
app.use('/editPassword', editPassword);
app.use('/merchant', merchant);
app.use('/operation', operation);
app.use('/system', system);
app.use('/advertising', advertising);
app.use('/client', client);
app.use('/feedback',feedback);
app.use('/appUserControl',appUserControl);
app.use('/criticism',criticism);
app.use('/dataManage',dataManage);
app.use('/games',games);
app.use('/exchangeCode',exchangeCode);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(4444,function(){
	 console.log("4444");
});
module.exports = app;

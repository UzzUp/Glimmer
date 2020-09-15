//安装所有所需的依赖模块
var express = require('express');//express框架最顶层模组
var bodyParser = require('body-parser');//express用于解析文件流的中间件
var createError = require('http-errors');
var path = require('path');
var http = require('http');
var cors = require('cors');

//导入session对象
var session = require('express-session');
var cookieParser = require('cookie-parser');

var logger = require('morgan');

var indexRouter = require('./routes/index');var usersRouter = require('./routes/users');

var app = express();
//配置同源策略解决方案
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//设置上传文件最大大小
app.use(bodyParser.json({limit: '1mb'}));    //最大上传大小不超过50mb
app.use(bodyParser.urlencoded({
    limit: '1mb',
    extended:true
}));

//设置session信息
app.use(session({
    secret: 'GlimmerSecret',
    name: 'GlimmerKey', 
    activeDuration: 1 * 1 * 1000, //设置连接最大时间间隔
    cookie: {maxAge: 60000 * 60 * 24 },  //设置ssesion失效时间
		resave: true,
    saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);


//无此文件时的处理(500)
app.use(function(req, res, next) {
  next(createError(404));
});

//代码错误时的处理(500)
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//安装所有所需的依赖模块
var express = require('express');//express框架最顶层模组
var bodyParser = require('body-parser');//express用于解析文件流的中间件
var createError = require('http-errors');
var path = require('path');
var http = require('http');

//导入session对象
var session = require('express-session');
var cookieParser = require('cookie-parser');

var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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
    secret: 'XXXXXX',
    name: 'AppKey', 
    cookie: {maxAge: 60000 * 10 },  //设置ssesion失效时间
    resave: true,
    saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//配置session
// app.use(session({
//   secret:"NotbodyNotthing",//设置签名秘钥  内容可以任意填写
//   cookie:{maxAge:30*60*1000},//设置cookie的过期时间为半小时
//   resave:true,//强制保存，如果session没有被修改也要重新保存
//   saveUninitialized:false//如果原先没有session那么就设置，否则不设置
// }))


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

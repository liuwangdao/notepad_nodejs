var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getRouter = require('./routes/get');
var htmlRouter = require('./routes/html');

var ejs = require('ejs');
// 配置Express 视图引擎ejs

var app = express();

// 配置Express ejs视图
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.set('home', path.join(__dirname, 'public'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/buttonClicked', getRouter);

// 配置Express ejs视图
app.use('/home', htmlRouter);
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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

module.exports = app;

//引入路由
//var routes = require('./routes/get.js');
//routes.router(app); //调用路由
// var server = app.listen(8081, function() {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log(__dirname); //这里的目录就是/Users/wofu/Desktop/node，其中node文件夹我是直接放在了桌面
//     console.log(host); //主机地址
//     console.log(port); //端口号
//     console.log("应用实例，访问地址为 http://%s:%s", host, port);
// });

// app.listen(8081);

// //接口程序server.app.get
// app.get("/buttonClicked", function(req, res) {
//     console.log(req.query.value); //get param 
//     writeMyData(req.query.value)
//     var data = "send to client"
//     res.send(data);
//     res.end();
// })


// //写入文件
// function writeMyData(textWrite) {
//     var fs = require("fs");
//     var myDate = new Date();
//     var mytime = myDate.toLocaleTimeString();
//     fs.appendFile('./msg.txt', "\n" + myDate + " " + mytime + "\n", (err) => {
//         if (err) throw err;
//         console.log('The "data to append" was appended to file!');
//     });

//     fs.appendFile('./msg.txt', textWrite, (err) => {
//         if (err) throw err;
//         console.log('The "data to append" was appended to file!');
//     });
// }
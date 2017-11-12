var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var loggers = require('morgan');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');

var logUtil = require('./utils/logger');
var config = require('./config');

var formatDate = require('./utils/tools').formatDate;  //时间转换

var index = require('./routes/index');
var news = require('./routes/news');
var movies = require('./routes/movies');

var app = express();

app.locals.formatDate = formatDate;
app.locals.config = config;
app.locals.ImgPath = config.protocol+"://"+config.hostname+":"+config.port+'/front/img/show?fileName='; //图片路径
app.locals.captchaPath = config.protocol+"://"+config.hostname+":"+config.port+'/front/captcha/generate';   //验证码

global.logger = logUtil.getLogger('info');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

console.log("app.get('env'):",app.get('env'),'NODE_ENV:',process.env.NODE_ENV);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));
app.use(loggers('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/apis', proxy({
	target:'https://api.douban.com',
	// target: 'http://jsonplaceholder.typicode.com',
	pathRewrite: {
		'^/apis': ''   //需要rewrite重写的,
	},
	secure: false,
	changeOrigin: true, //是否跨域
	logLevel:'debug'
}));

var csp = require('helmet-csp');

//各类资源文件的白名单配置
// app.use(csp({
// 	directives: {
// 		defaultSrc: ["'self'"],
// 		styleSrc: ["'self'"],
// 		imgSrc: ["'self'",'data:'],
// 		sandbox: ['allow-forms', 'allow-scripts'],
// 		reportUri: '/report-violation',
// 		objectSrc: ["'none'"],
// 	}
// }))

// app.use('/news', news);
app.use('/movies', movies);
app.use('/', index);




if ('development' === app.get('env')) {
	// var webpack = require('webpack');
	// var webpackDevMiddleware = require("webpack-dev-middleware");
	// var webpackHotMiddleware = require('webpack-hot-middleware');
	// var webpackDevConfig = require('./webpack.dev.config');
	// var compiler = webpack(webpackDevConfig);
	//
	// app.use(webpackDevMiddleware(compiler,{
	// 	noInfo:true,  //false将打印编译信息（建议true，false会打印很多信息）
	// 	public:webpackDevConfig.output.publicPath, //绑定middleware
	// 	stats: { colors: true,chunks:true,chunkModules:false }
	// }));
	//
	// app.use(webpackHotMiddleware(compiler));

	app.set('showStackError', true);
	app.locals.pretty = true;
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('哎哟，您访问的页面不知去哪了…');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.locals.title = err.message;
  // render the error page
  res.status(err.status || 500);
  console.log("err:",err)
  if(err.status==404){
	  res.render('error-404');
  }else{
	  res.render('error');
  }

});

module.exports = app;

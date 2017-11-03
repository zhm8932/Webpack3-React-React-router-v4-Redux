var express = require('express');
var router = express.Router();
var Handlers = require('../handlers/indexs.handlers');
var Requests = require('../requests/index.requests');
var Middlewares = require('../requests/middlerware.requests');

/* GET home page. */
router.use(function (req,res,next) {
	logger.info("originalUrl:",req.originalUrl,JSON.stringify(req.body));
	next();
})

// router.get('/',Requests.get_banner, Handlers.index);
router.get('/abouts', Handlers.abouts);
router.get('/jops',Requests.get_jops_position,Requests.get_jops_list,Handlers.jops);

router.get('/getJopList',Requests.get_jops_list);
router.get('/getJopDetail',Requests.get_jops_detail);
router.get('/getAllProvinces',Middlewares.get_all_provinces);
router.get('/getCitys',Middlewares.get_citys);

//留言
router.get('/contacts',Handlers.contacts);
router.post('/saveCustomerNote',Requests.save_customer_note);
router.get('/getCaptcha',Requests.get_captcha);
router.post('/getCaptcha',Requests.get_captcha_base64);

router.get('/test', function(req, res, next) {
	res.render('test', { title: '测试页面' });
});

router.get('/report-violation', function(req, res, next) {
	res.render('test', { title: '测试页面' });
});

router.get('/(*)?',Handlers.index);

module.exports = router;

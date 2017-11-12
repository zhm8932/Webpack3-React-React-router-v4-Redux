/**
 * Created by haiming.zeng on 2017/9/19.
 */

exports.index = function (req,res,next) {
	console.log("首页数据")
	res.render('app', { title: 'react redux react-router-dom' });
	// res.render('index', { title: '深圳市前海明日科技科技咨询责任有限公司' });
}

exports.abouts = function (req,res,next) {
	res.render('abouts', { title: '前海明日科技简介' });
}

exports.jops = function (req,res,next) {
	res.render('jops/jops', { title: '诚聘英才' });
}

exports.contacts = function (req,res,next) {
	res.render('contacts', { title: '联系我们' });
}
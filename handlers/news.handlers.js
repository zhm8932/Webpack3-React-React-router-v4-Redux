/**
 * Created by haiming.zeng on 2017/9/19.
 */

exports.index = function (req,res,next) {
	res.locals.newsIndexData = req.newsIndexData;
	res.render('news/index', {
		title: '企业动态'
	});
}
exports.list = function (req,res,next) {
	res.render('news/list', {
		title: '企业动态'
	});
}
exports.article = function (req,res,next) {
	console.log("req.title:",req.title)
	res.render('news/article', {
		title: req.title
	});
}
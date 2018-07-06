/**
 * Created by haiming.zeng on 2017/9/19.
 */
const apiPath = require('../utils/apiPath');
const proxy = require('../utils/proxy');
const Tools = require('../utils/tools');
const config = require('../config');
const async = require('async');


exports.forget = function (req,res,next) {
	console.log("body:",req.body)
	console.log("query:",req.query)
	res.send({
		message:"找回密码成功",
		code:200
	})

}
exports.login = function (req,res,next) {
	let json = {
		message:"登录成功",
		code:200,
		token:'API'+new Date().getTime()
	}
	logger.info("响应数据：",json)
	res.send(json)

}
exports.get_news_category = function (req,res,next) {
	var query = req.query;
	if(Tools.isAjax(req)){
		return next();
	}
	proxy(req,res,{
		method:'GET',
		path:apiPath.getNewsCategory,
	}).then(function (json) {
		var catData = json.data;
		console.log("catData:",JSON.stringify(catData))
		var catDataSuccess = json.success;
		if(!catDataSuccess){
			catData = json
		}
		req.catDataSuccess = res.locals.catDataSuccess = catDataSuccess;
		req.catData = res.locals.catData = catData;
		next()
	}).catch(function (err) {
		res.locals.catDataSuccess = err.success;
		res.locals.catData = err;
		console.log("err:",err)
		next()
	})

}


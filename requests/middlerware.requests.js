/**
 * Created by haiming.zeng on 2017/9/19.
 */
const apiPath = require('../utils/apiPath');
const proxy = require('../utils/proxy');
const config = require('../config');

exports.get_all_provinces = function (req,res,next) {
	proxy(req,res,{
		method:'GET',
		path:apiPath.getAllProvinces,
		apiType: config.apiType.daq,
	}).then(function (json) {
		res.send(json)
	}).catch(function (err) {
		req.positionData = res.locals.positionData = err;
		next()
	})

}

exports.get_citys = function (req,res,next) {
	proxy(req,res,{
		method:'GET',
		path:apiPath.getCitys,
		apiType: config.apiType.daq,
		data:{parentCode:req.query.code}
	}).then(function (json) {
		res.send(json)
	}).catch(function (err) {
		req.positionData = res.locals.positionData = err;
		next()
	})

}
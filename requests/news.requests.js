/**
 * Created by haiming.zeng on 2017/9/19.
 */
const apiPath = require('../utils/apiPath');
const proxy = require('../utils/proxy');
const Tools = require('../utils/tools');
const config = require('../config');
const async = require('async');


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

exports.get_news_index = function (req,res,next) {

	var query = req.query;
	var catData = req.catData||[];
	var newsIndexData = [];
	req.newsIndexData = newsIndexData;
	if(catData.length){
		async.forEach(catData, function(item, callback) {
			var data = {
				page:config.pageNo,
				limit:config.pageSize-4,
				catId:item.id||query.catId
			}
			proxy(req,res,{
				method:'GET',
				path:apiPath.getNewsQuery,
				data:data
			}).then(function (json) {
				newsIndexData.push({
					catName:item.catName,
					catId:item.id,
					sort:item.sort,
					data:json.data.content
				})
				callback(null, newsIndexData);
				if(newsIndexData.length==catData.length){
					newsIndexData = newsIndexData.sort(function (m,n) {
						return m.sort-n.sort
					});
					req.newsIndexData=res.locals.newsIndexData = newsIndexData;
					next();
				}
				// next()
			}).catch(function (err) {
				next()
			})
		}, function(err) {
			console.log('1.1 err: ' + err);
		});
	}else{
		next()
	}
}
exports.get_news_list = function (req,res,next) {

	var query = req.query;
	var catId = req.params.catId;
	var data = {
		page:query.pageNo||config.pageNo,
		limit:config.pageSize+2,
		catId:query.catId||catId
	}
	res.locals.catId =catId;
	proxy(req,res,{
		method:'GET',
		path:apiPath.getNewsQuery,
		data:data
	}).then(function (json) {
		if(Tools.isAjax(req)){
			return res.send(json);
		}
		res.locals.json = json;
		res.locals.pageCount = json.data.totalPages;
		res.locals.pageNo = json.data.number;
		next()
	}).catch(function (err) {
		res.locals.json = err;
		next()
	})


}

exports.get_news_detail = function (req,res,next) {
	var data = {
		id:req.params.id||''
	};
	proxy(req,res,{
		method:'GET',
		path:apiPath.getNewsById,
		data:data,
		isRestful:true
	}).then(function (json) {
		var title = "企业动态详情";
		if(json.success){
			var data = json.data;
			if(data){
				title = data.title
			}
		}
		req.title = title;
		res.locals.json = json;
		next()
	}).catch(function (err) {
		res.locals.json = err;
		next()
	})
}
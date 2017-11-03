/**
 * Created by haiming.zeng on 2017/9/19.
 */
const apiPath = require('../utils/apiPath');
const proxy = require('../utils/proxy');
const Tools = require('../utils/tools');
const config = require('../config');
exports.get_banner = function (req,res,next) {
	proxy(req,res,{
		method:'GET',
		path:apiPath.getAllBanner,
	}).then(function (json) {
		res.locals.bannerData = json;
		next();
	}).catch(function (err) {
		res.locals.bannerData = err;
		next()
	})

}


exports.get_jops_list = function (req,res,next) {
	var query = req.query;
	console.log("jobCatId:",req.jobCatId)

	if(!Tools.isAjax(req)){
		if(!req.jobCatId){
			console.log("不获取职位")
			return next()
		}
	}
	var query = req.query;

	console.log("query",query)
	var jobCatId = query.jobCatId||req.jobCatId;
	if(req.cookies&&req.cookies.jobCatId){
		jobCatId = req.cookies.jobCatId;
	}
	res.locals.jobCatId = jobCatId;
	var data = {
		jobCatId:jobCatId,
		cityCode:query.cityCode||'',
		provinceCode:query.provinceCode||'',
		page:query.pageNo||config.pageNo,
		limit:config.pageSize
	}
	console.log("query.provinceCode:",query.provinceCode)
	proxy(req,res,{
		method:'GET',
		path:apiPath.recruitList,
		data:data
	}).then(function (json) {
		var data = json.data;
		//查询的城市排列在签名
		if(data.content){
			if(query.provinceCode||query.cityCode)
				data.content.forEach(function (item,index) {
					var jobAreaDtos = item.jobAreaDtos;
					if(jobAreaDtos&&jobAreaDtos.length){
						if(query.provinceCode&&!query.cityCode){
							jobAreaDtos.forEach(function (arr,i) {
								if(query.provinceCode==arr.provinceCode){
									jobAreaDtos.splice(i,1);
									jobAreaDtos.unshift(arr)
								}
							})
						}else{
							jobAreaDtos.forEach(function (arr,i) {
								if(query.cityCode==arr.cityCode){
									jobAreaDtos.splice(i,1);
									jobAreaDtos.unshift(arr)
								}
							})
						}
					}
				})
		}

		if(Tools.isAjax(req)){
			return res.send(json)
		}

		res.locals.data = data;
		var content = data.content;
		req.jobId = content.length&&content[0].id||'';
		res.locals.success = json.success;
		res.locals.message = json.msg;

		next();
	}).catch(function (err) {
		console.log("err:",err)
		next()
	})

	// next();
}

exports.get_jops_detail = function (req,res,next) {
	proxy(req,res,{
		method:'GET',
		path:apiPath.recruitDetail,
		data:{id:req.query.jobId||req.jobId},
		isRestful:true
	}).then(function (json) {
		if(Tools.isAjax(req)){
			return res.send(json)
		}
		res.locals.jobDetail = json;
		next();
	}).catch(function (err) {
		next()
	})

}

exports.get_jops_position = function (req,res,next) {
	var jobCatId = '';
	req.jobCatId  = jobCatId;
	proxy(req,res,{
		method:'GET',
		path:apiPath.jobCategoriesAll,
		
	}).then(function (json) {
		var data = json;
		if(json.success){
			data = json.data
			jobCatId = data[0].id;
		}
		req.positionData = res.locals.positionData = data;
		req.jobCatId = jobCatId;
		var positionSuccess = json.success;
		console.log("positionSuccess:",positionSuccess)
		// req.positionSuccess = res.locals.positionSuccess = positionSuccess
		next();
	}).catch(function (err) {
		req.positionData = res.locals.positionData = err;
		next()
	})

}


exports.save_customer_note = function (req,res,next) {
	var body = req.body;
	var data = body
	proxy(req,res,{
		method:'POST',
		path:apiPath.saveCustomerNote,
		data:data,
	}).then(function (json) {
		if(Tools.isAjax(req)){
			return res.send(json)
		}
		next();
	}).catch(function (err) {
		next()
	})

}

var captchapng = require('captchapng');

function cap(len,type) {
	if(isNaN(len) || !len || len < 0)len = 4;
	if(isNaN(type) || !type || type < 0)type = 0;
	var arrs = [
		'123456890',
		'qwertyuiopasdfghjklzxcvbnm',
		'123456789qwertyupasdfghjkzxcvbnm'//数字字母组合时  去掉 数字(1 0) 字母(O I l) 以防混淆不好辨认
	];
	var randomStr = arrs[type];
	var rt = '';
	for(var i=0;i<len;i++){
		rt += randomStr[Math.random() * randomStr.length | 0];
	}
	return rt;
}

function generateBase64(options) {
	var height = options.height || 20, text = '' + options.text, width = options.width || height * text.length;
	var p = new captchapng(width, height, text);
	p.color.apply(p, options.background || [0, 0, 0, 0]);
	p.color.apply(p, options.color || [Math.random() * 255 | 0, Math.random() * 255 | 0, Math.random() * 255 | 0, 255]);

	return p.getBase64();
}

exports.get_captcha = function (req,res,next) {
	let imgCode = parseInt(Math.random()*9000+1000);
	console.log("verifyCode:",imgCode)
	var p = new captchapng(80,20,imgCode); // width,height,numeric captcha
	p.color(255, 255, 0, 0);  // First color: background (red, green, blue, alpha)
	p.color(Math.random()*255, Math.random()*255, Math.random()*255, 255); // Second color: paint (red, green, blue, alpha)

	var img = p.getBase64();
	var imgbase64 = new Buffer(img,'base64');
	console.log("imgbase64:",imgbase64);


	var rt = cap();
	console.log("rt:",rt)
	res.cookie('imgCode',imgCode,{maxAge:1000*60*5})
	res.writeHead(200, {
		'Content-Type': 'image/png'
	});

	var imgCode1 = req.cookies.imgCode;
	console.log("imgCode:",imgCode)
	res.end(imgbase64);


	// res.send(imgbase64);
	// proxy(req,res,{
	// 	method:'GET',
	// 	path:apiPath.getCaptcha,
	// 	isImg:true
	// }).then(function (json) {
	// 	res.send(json)
	// 	next();
	// }).catch(function (err) {
	// 	next()
	// })

}
exports.get_captcha_base64 = function (req,res,next) {
	proxy(req,res,{
		method:'POST',
		path:apiPath.genCaptcha,
	}).then(function (json) {
		res.send(json)
		// next();
	}).catch(function (err) {
		next()
	})

}
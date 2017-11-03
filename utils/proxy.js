/**
 * Created by haiming.zeng on 2017/9/21.
 */
const config = require('../config');
const request = require('request');
const tools = require('./tools');

const proxy = function (req,res,opts) {
	return new Promise(function (resolve,reject) {
		// logger.info("opts:",JSON.stringify(opts));
		let method = opts && opts.method && opts.method.toUpperCase() || 'GET';
		let data = opts && opts.data || {};
		let {hostname,port,protocol} = config;
		let apiType = opts.apiType ? opts.apiType : config.apiType.snowball;

		let	path = `/${apiType}/${opts.path}`;

		let query = "";
		if (method == 'GET') {
			//GET请求有参数两种传递方式
			for (var key in data) {
				if (key) {
					var strVal = data[key];
					if (opts.isRestful) {
						query += `/${strVal}`
					} else {
						query += `&${key}=${strVal}`
					}
				}
			}
			query = query.indexOf("&") == 0 ? query.replace(/&/, "?") : query;
		}else{
			for (var key in data) {
				data[key] = tools.htmlEncode(data[key])
			}
			console.log("Data:",data)
		}


		// if(opts.apiType==config.apiType.msxf){
		// 	// protocol = 'https';
		// 	path =`/${apiType}/${opts.path}`;
		// 	hostname = config.hostnameMsxf;
		// }

		path += encodeURI(query);
		let uri = `${protocol}://${hostname}:${port}${path}`;
		if(port=='80'){
			uri = `${protocol}://${hostname}${path}`;
		}
		// let uri = opts.uri?opts.uri:{
		// 	protocol:protocol,  //协议 http
		// 	hostname :hostname, //主机名
		// 	port : port,        //端口 默认80
		// 	path : path                //请求路径
		// };

		console.log("uri:",uri)
		let options = {
			uri: uri,
			method: method,
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				'X-Application-Id': config.XApplicationId,
				'X-API-Version': config.XAPIVersion,
				'X-Token': config.XToken,
			}
		};
		// if(opts.isImg){
		// 	options.headers['Content-Type']='image/png'
		// }
		logger.info("opts:",JSON.stringify(opts));
		request(options,function (error,response,body) {
			logger.info(uri,":---resbody:",body);
			var resObj = null;
			if(error){
				console.log("error:",JSON.stringify(error))
				var err = tools.handlerError(error)
				if(tools.isAjax(req)){
					return res.send(err)
				}
				reject(err);
			}
			try {
				if(/404 Not Found/.test(body)){
					resObj = {
						success: false,
						msg:'服务器地址异常'
					}
				}else if(/^\d*$/.test(body)||/<html>/.test(body)||/^<*>$/.test(body)){
					console.log("文本内容：",body);
					resObj = body
				} else if(opts.isImg){
					resObj = new Buffer(body).toString('base64');
				}else{
					if(body){
						resObj =  JSON.parse(body);
					}
				}
			}catch (err){
				console.log("err:",err)
			}
			resolve(resObj);
		});
	})
}

module.exports = proxy
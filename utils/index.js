/**
 * Created by 91608 on 2018/1/7.
 */
exports.isAjax = function (req) {
	return req.headers['X-Requested-With'] || req.headers['x-requested-with'] == 'XMLHttpRequest';
}

//判断浏览器版本
exports.browser = function (req) {
	const u = req.headers['user-agent'];
	const browser = {
		trident: u.indexOf('Trident') > -1, //IE内核
		presto: u.indexOf('Presto') > -1, //opera内核
		webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
		iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
		iPad: u.indexOf('iPad') > -1, //是否iPad
		weixin: u.indexOf('MicroMessenger') != -1, //是否微信
		aliApp: u.indexOf('AliApp') != -1, //是否支付宝
		webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
		ie: u.indexOf('MSIE') > -1, //
		mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端,包括iPad
		pc: !/(Android|iPhone|iPod|iOS|SymbianOS|Windows Phone|iPad)/i.test(u)  //PC端
	};
	return browser
}

exports.handlerError = function (error) {
	let err = {}
	let message = "";
	switch (error.code) {
		case 'ENOTFOUND':
			message = "服务器异常";
			break;
		case 'ETIMEDOUT':
			message = "数据库连接超时";
			break;
		case 'ECONNREFUSED':
			message = "服务连接异常";
			break;
		default:
			message = "系统异常,请稍后重试";
	}
	err.message = message;
	err.success = false;
	for (let key in error) {
		err[key] = error[key]
	}
	console.log("err:",JSON.stringify(err))
	return err;
}
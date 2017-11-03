/**
 * Created by haiming.zeng on 2017/9/21.
 */
/*
* 公共配置
* */
var config = {
	port:'80',
	pageSize:10,
	pageNo:1,

	v:'v1',

	//版本配置参数
	apiType:{
		snowball:'front'   //明日科技
	},

	protocol:'http',

	//头信息验证机制
	XApplicationId:'QHXQ',
	XAPIVersion:'1',
	XToken:'',  //X-Token注册或登录后由API返回，APP缓存后在后续的接口都需带上，用于认证用户信息

};

module.exports = config
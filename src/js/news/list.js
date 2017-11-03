/**
 * Created by haiming.zeng on 2017/9/19.
 */
import '../../sass/news.scss';
import * as utils from '../libs/utils';
$(function () {
	utils.lazyload({rate:1.4})
	//分页加载
	var loadMore = utils.lodeMore({
		url:'/news/list',
		main:'.list ul',
		isLazyload:false,
		otherHeigth:300,
		html:function (data,bizParms) {
			let template = require('views/news/common/news_li.jade');
			let html = template({json:data});
			return template({json:data})
		},
		initData:function () {
			let catId = $(this.main).data('catid');
			return {catId}
		},
		renderDomComplete:function () {
			console.log("222222");
			utils.lazyload({rate:1.4});
			// $(".list img").lazyload({
			// 	effect: "fadeIn"
			// });
			// mallCom.lazyload({el:'.list-box',rate:1});
		}
	});
})
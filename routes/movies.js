var express = require('express');
var router = express.Router();
var Handlers = require('../handlers/news.handlers');
var Requests = require('../requests/news.requests');

router.get('/list',function (req,res,next) {
	console.log("豆瓣电影")
	var json = {
		count: 20,
		start: 0,
		total: 46,
		subjects: [{
			rating: {
				max: 10,
				average: 7.1,
				stars: "35",
				min: 0
			},
			genres: [
				"剧情",
				"犯罪",
				"悬疑"
			],
			title: "东方快车谋杀案",
			casts: [
				{
					alt: "https://movie.douban.com/celebrity/1036342/",
					avatars: {
						small: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p43581.webp",
						large: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p43581.webp",
						medium: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p43581.webp"
					},
					name: "肯尼思·布拉纳",
					id: "1036342"
				},
				{
					alt: "https://movie.douban.com/celebrity/1005774/",
					avatars: {
						small: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2373.webp",
						large: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2373.webp",
						medium: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2373.webp"
					},
					name: "佩内洛普·克鲁兹",
					id: "1005774"
				},
				{
					alt: "https://movie.douban.com/celebrity/1010539/",
					avatars: {
						small: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9206.webp",
						large: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9206.webp",
						medium: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9206.webp"
					},
					name: "威廉·达福",
					id: "1010539"
				}
			],
			collect_count: 32541,
			original_title: "Murder on the Orient Express",
			subtype: "movie",
			directors: [
				{
					alt: "https://movie.douban.com/celebrity/1036342/",
					avatars: {
						small: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p43581.webp",
						large: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p43581.webp",
						medium: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p43581.webp"
					},
					name: "肯尼思·布拉纳",
					id: "1036342"
				}
			],
			year: "2017",
			images: {
				small: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2502165084.webp",
				large: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2502165084.webp",
				medium: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2502165084.webp"
			},
			alt: "https://movie.douban.com/subject/25790761/",
			id: "25790761"
		}],
		title: "正在上映的电影-北京"
	};
	res.send(JSON.stringify(json))

});
// router.get('/list(/:catId)?',Requests.get_news_category,Requests.get_news_list, Handlers.list);
// router.get('/article/:id',Requests.get_news_detail, Handlers.article);

module.exports = router;

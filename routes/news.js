var express = require('express');
var router = express.Router();
var Handlers = require('../handlers/news.handlers');
var Requests = require('../requests/news.requests');

router.get('/',Requests.get_news_category,Requests.get_news_index,Handlers.index);
router.get('/list(/:catId)?',Requests.get_news_category,Requests.get_news_list, Handlers.list);
router.get('/article/:id',Requests.get_news_detail, Handlers.article);

module.exports = router;

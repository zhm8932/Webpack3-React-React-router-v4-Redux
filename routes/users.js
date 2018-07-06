const express = require("express");
const router = express.Router();
var Handlers = require('../handlers/news.handlers');
var Requests = require('../requests/users.requests');

router.post('/forget',Requests.forget)
router.post('/login',Requests.login)
module.exports = router
var express = require('express')
var router = express.Router()
var streamrConfig = require('../config/streamr')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index.tmpl', {
		streamId: streamrConfig.stream_id
	})
});

module.exports = router;

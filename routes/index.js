var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/strends', function(req, res, next) {
  res.render('index.tmpl', { title: 'Strends' });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* 主页面 */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });
});


module.exports = router;

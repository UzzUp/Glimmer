var express = require('express');
var router = express.Router();

/* 主页面 */
router.get('/', function(req, res, next) {
	if((typeof req.session.Userid) != "undefined"){
		//发送服务页面信息
		res.render('FunctionPage',{
			HeadImage:"./HeadImage/0-Head.jpeg",
			username:req.session.Username,
			name:req.session.name,
		});
	}else{//未登录过的用户
		res.render('GlimmerLI',{});
	}
});


module.exports = router;

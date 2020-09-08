let express = require('express');
let router = express.Router();

let Database = require('../db/Database.js')

/* 主页面 */
router.get('/', function(req, res, next) {
	if((typeof req.session.Userid) != "undefined"){
		let Mysql_String = `select Headimage from Userlist WHERE id='${req.session.Userid}'`
		
		Database.Connect.query(Mysql_String,function(err,rls){
			let Image_URL = "AccountHead.png"
			if(rls[0].Headimage!=null&&rls[0].Headimage!=""){
				Image_URL = rls[0].Headimage
			}
			//发送服务页面信息
			res.render('FunctionPage',{
				HeadImage:"./HeadImage/"+Image_URL,
				username:req.session.Username,
				name:req.session.name,
			});
		})
	}else{//未登录过的用户
		res.render('GlimmerLI',{});
	}
});


module.exports = router;

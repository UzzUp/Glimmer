let express = require('express');
let router = express.Router();
let fs = require('fs');

//引入数据库文件
let Database = require('../db/Database.js')
let StateCode = require('../db/State_Code.js')

//功能测试区域
router.get('/', function(req, res, next) {
		res.render('FunctionPage',{HeadImage:"./HeadImage/AccountHead.png",username:"2497",name:"实验君"});
});

//验证用户账户可用性
router.get('/AccountTest', function(req, res, next) {	
	let Mysql_String = `select Username from Userlist WHERE Username='${req.query.Account}'`
	Database.query(Mysql_String,function(err,rls){
		// 允许该用户名注册
		if(rls.length==0){
			res.send(StateCode.State_Permit)
		//禁止该用户名注册
		}else{
			res.send(StateCode.State_PermitOff)
		}
	})
})

//获取用户设置的头像文件
router.post('/headImage', function(req, res, next) {
		
		//获取图片对象信息
		let ImageData = req.body.ImageData
		//设置图片的名称
		let SetImageName = `${req.session.Userid}-Head.${req.body.suffix}`
		let SetImageUrl = `./public/HeadImage/${SetImageName}`
		
		//删除原先的图片
		fs.unlink(SetImageUrl, function(err){
			if(err){
					console.log(err);
			}
		})
		

		
		//设置头像图片路径
		let Mysql_String = `UPDATE userlist SET Headimage="${SetImageName}" WHERE id="${req.session.Userid}"`
		Database.query(Mysql_String,function(err,rls){
			if(err){
				console.log("错误："+err)
			}
		})
		
		//写入图片对象
		let image64 = ImageData.replace(/^data:image\/\w+;base64,/, "") 
		let dataBuffer = new Buffer(image64, 'base64') 
		fs.writeFile(SetImageUrl,dataBuffer,function(err){//用fs写入文件
			if(err){
				console.log(err)
			}
		});
		
		//返回设置成功事件
		res.send(StateCode.State_Permit)
})

//注册请求
router.post('/Register', function(req, res, next) {
		let Mysql_String = `INSERT INTO userlist (id,Username,Password,name) 
		VALUES 
		(0,'${req.body.Account}','${req.body.Password}','${req.body.name}')`
		//发送注册成功的信息
		Database.query(Mysql_String,function(err,rls){
			if(err) console.log(err)
			res.send(StateCode.State_Permit)
		})
})

//登录请求
router.post('/Login', function(req, res, next) {
	
		let Mysql_String = `select * from Userlist WHERE Username='${req.body.Account}'`

		Database.query(Mysql_String,function(err,rls){
				if(rls.length == 0){
						res.send(StateCode.State_Nothing)
				}else{
					//验证密码
					if(rls[0].Password == req.body.Password){
							//获取用户信息。并查看是否有头像，没有头像使用默认头像代替
							let Image_URL = "AccountHead.png"
							//获取用户所需信息
							let id = rls[0].id
							let name = rls[0].name
							let Username = rls[0].Username
							
							
							//登录成功,把信息存储在session中
							req.session.name = name
							req.session.Userid = id
							req.session.Username = Username

							if(rls[0].Headimage!=null&&rls[0].Headimage!=""){
								Image_URL = rls[0].Headimage
							}
							
							// let Friend_List = (rls[0].FriendList).split("[$F]");
							//发送服务页面信息
							res.render('FunctionPage',{
								HeadImage:"./HeadImage/"+Image_URL,
								username:Username,
								name:name,
							});
					}else{
						res.send(StateCode.State_PermitOff)
					}
			}
	})
});


module.exports = router;

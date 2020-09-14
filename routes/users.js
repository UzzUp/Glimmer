let express = require('express');
let router = express.Router();

let fs = require('fs');
let path = require('path')
let image = require("imageinfo");

//引入数据库文件
let Database = require('../db/Database.js')
let StateCode = require('../db/State_Code.js')

let io = require('../socketio.js')

io.Client_io.on('connection', function (socket) {
			console.log("连接成功")
			//登录事件
			socket.on('login',function (obj) {
				//增加Socket对象
				io.AddSocket(obj,socket)
				// io.GetSocket(obj)
			})
			//发送事件
			socket.on('Send',function (Send_Message) {//获取消息事件[接受者id][发送者id][发送消息]

				let Message_List = Send_Message.split("|X|")
				let User_Socket = io.GetSocket(Message_List[0])
				if(User_Socket!=null){
					
					User_Socket.Socket.emit('Send',{
						Text:[Message_List[1],Message_List[2]].join("|X|")
					})
				}
			})
			//用户端断开连接事件
	    socket.on("disconnect",function (){  // 客户端断开链接
				console.log("客户端断开连接")
			})
})


//功能测试区域
router.get('/', function(req, res, next) {
		res.render('FunctionPage',{HeadImage:"./HeadImage/AccountHead.png",username:"2497",name:"实验君"});
});

//验证用户账户可用性
router.get('/AccountTest', function(req, res, next) {	
	let Mysql_String = `select Username from Userlist WHERE Username='${req.query.Account}'`
	Database.Connect.query(Mysql_String,function(err,rls){
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
		
		//获取原本的头像名称
		let Mysql_Seek = `select Headimage from Userlist WHERE id='${req.session.Userid}'`
		let Mysql_Head = ""
		Database.Connect.query(Mysql_Seek,function(err,rls){
			if(rls.length!=0){
				Mysql_Head = rls[0].Headimage	
			
				//设置删除对象和创建对象路径
				let SetDelete = `./public/HeadImage/${Mysql_Head}`
				let SetImageUrl = `./public/HeadImage/${SetImageName}`
				
				
				//删除原先的图片
				fs.unlink(SetDelete, function(err){
					if(err){
							console.log(err);
					}
				})
				
				//设置新头像图片路径
				let Mysql_String = `UPDATE userlist SET Headimage="${SetImageName}" WHERE id="${req.session.Userid}"`
				Database.Connect.query(Mysql_String,function(err,rls){
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
			}
		})
})

//注册请求
router.post('/Register', function(req, res, next) {
		let Mysql_String = `INSERT INTO userlist (id,Username,Password,name,Headimage) 
		VALUES 
		(0,'${req.body.Account}','${req.body.Password}','${req.body.name}','AccountHead.png')`
		//发送注册成功的信息
		Database.Connect.query(Mysql_String,function(err,rls){
			if(err) console.log(err)
			res.send(StateCode.State_Permit)
		})
})

//登录请求
router.post('/Login', function(req, res, next) {
		
	let Login_Account = req.body.Account;//获取登录的账户
	let Login_User_Message = "";//获取到的用户信息组
	//开始登陆进程
	new Promise(function(resolve,reject){//首先排除重复登录对象
		//登录的许可
		let Permit = "ON"
		//获取当前登录对象的id
		Database.MessgaeGet("Username",Login_Account,function(err,rls){
				
				//存储获取到的用户信息
				Login_User_Message = rls
				
				if(Login_User_Message.length == 0){
						//返回结果
						resolve("NO");
				}else{
						req.sessionStore.all(function(err,sessions){
							for(let OBJ in sessions){
								//遍历对比所有的id
								if(sessions[OBJ]['Userid'] == Login_User_Message[0].id){
									Permit = "OFF"
									break
								}
							}
							//返回结果
							resolve(Permit);
						})
				}
		})
	}).then(function(value){
		
		if(value=="OFF"){//重复登录处理
			res.send(StateCode.State_Repeat)
		}else if(value=="NO"){//用户不存在
			res.send(StateCode.State_Nothing)
		}else{//允许登录处理
			//验证密码
			if(Login_User_Message[0].Password == req.body.Password){
					//获取用户信息。并查看是否有头像，没有头像使用默认头像代替
					let Image_URL = "AccountHead.png"
					//获取用户所需信息
					let id = Login_User_Message[0].id
					let name = Login_User_Message[0].name
					let Username = Login_User_Message[0].Username
									
					//登录成功,把信息存储在session中
					req.session.name = name
					req.session.Userid = id
					req.session.Username = Username
					
					if(Login_User_Message[0].Headimage!=null&&Login_User_Message[0].Headimage!=""){
						Image_URL = Login_User_Message[0].Headimage
					}

					//根据好友信息获取好友信息结果集
					Database.FriendRls(Login_User_Message[0].FriendList,req,function(Value){
						//获取到用户登录情况
						let List_Message = Login_User_Message[0].FriendList==null?[]:Login_User_Message[0].FriendList.split("[$F]")
						//好友数量
						let List_Number = List_Message.length;
						//获取好友在线状态信息
						let List_State = []
						
						//获取好友登录状态时
						req.sessionStore.all(function(err,sessions){
							for(let OBJ in sessions){
								//遍历对比所有的id
								if(List_Message.indexOf(sessions[OBJ]['Userid']+"")!=-1){
									//添加在线状态信息
									List_State.push(sessions[OBJ]['Userid'])
									if(--List_Number == 0){
										break
									}
								}
							}
							
							//将在线数据修改为String类型
							let List_State_String = List_State.join("|X|")
							
							//发送服务页面信息
							res.render('FunctionPage',{
								HeadImage:"./HeadImage/"+Image_URL,
								username:Username,
								name:name,
								UserId:id,
								FriendList:Value,
								FriendState:List_State_String
							});
						})
					})
			}else{
				res.send(StateCode.State_PermitOff)
			}
		}
	}, function(err) {//抛出错误
	  console.log('reject:' + err);
	});
	
});

module.exports = router;

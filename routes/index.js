let express = require('express');
let router = express.Router();

let Database = require('../db/Database.js')

/* 主页面 */
router.get('/', function(req, res, next) {
		if((typeof req.session.Userid) != "undefined"){
			
			let Mysql_String = `select * from Userlist WHERE id='${req.session.Userid}'`
			
			Database.Connect.query(Mysql_String,function(err,rls){
				
				//根据情况生成头像信息
				let Image_URL = "AccountHead.png"
				if(rls[0].Headimage!=null&&rls[0].Headimage!=""){
					Image_URL = rls[0].Headimage
				}
				
				//根据好友信息获取好友信息结果集
				Database.FriendRls(rls[0].FriendList,req,function(Value){
					//获取到用户登录情况
					let List_Message = rls[0].FriendList==null?[]:rls[0].FriendList.split("[$F]")
					//好友数量
					let List_Number = List_Message.length;
					//获取好友在线状态信息
					let List_State = [0]
					
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
							username:req.session.Username,
							name:req.session.name,
							UserId:req.session.Userid,
							FriendList:Value,
							FriendState:List_State_String
						});
					})
				})
			})
		}else{//未登录过的用户
			res.render('GlimmerLI',{});
		}
});


module.exports = router;

let db = require('mysql')

let Test_Open = false
let Connect = db.createConnection({
	host			:'127.0.0.1',
	user  		:'root',
	password	:'19980806',
	database	:'bokedata'
})

Connect.connect()

//获得用户的头像
function GetImage (Userid,Event){
		let Mysql_String = `select Headimage from Userlist WHERE id='${Userid}'`
		Connect.query(Mysql_String,Event)
}

//根据特定的唯一键对比,获得指定的用户信息
function MessgaeGet (OnlyKey,OnlyValue,Event){
		let Mysql_String = `select * from Userlist WHERE ${OnlyKey}='${OnlyValue}'`
		Connect.query(Mysql_String,Event)
}

//根据好友结果集，生成好友信息结果集
function FriendRls (Friend_List,ListFls,GetFls){
	
		let Friend = null

		if(typeof Friend_List != "undefined"&&Friend_List!=null){
			Friend = Friend_List.split("[$F]")
			let Mysql_String = `select * from Userlist WHERE id in (${Friend.join(",")})`
				Connect.query(Mysql_String,function(err,rls){
					
					let Friendrls = []
					let Friend_State = []
					
					//判断结果集是否为空
					if(!(typeof rls == "undefined"||rls == null)){
						for(let i = 0,j = rls.length;i<j;i++){
							Friendrls.push({							
								name : rls[i].name,
								UserId : rls[i].id,
								Headimage : ("HeadImage/"+rls[i].Headimage),
								SNumber : 0
							})
						}
					}
				
					GetFls(Friendrls)
				})
		}else{
			GetFls([])
		}
}

//获取与好友之间的聊天信息(id)
function GetMessage (User,Friend,GetFls){
	//获取组合识别码
	let Seek = User>Friend?[Friend,User].join("[$F]"):[User,Friend].join("[$F]")
	//获取指定信息
	let Mysql_String = `select * from OnlineMS WHERE OnlineOBJ = '${Seek}'`
		Connect.query(Mysql_String,function(err,rls){
			if(rls.length == 0){
				GetFls(null)
			}else{
				GetFls(rls)
			}
		})
}

//数据连接对象以及部分封装获取方法
module.exports = {
	Connect : Connect,
	GetImage :GetImage,
	MessgaeGet:MessgaeGet,
	FriendRls:FriendRls,
	Test_Open:Test_Open,//测试开关
	GetMessage:GetMessage
}
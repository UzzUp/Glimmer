let db = require('mysql')

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
		let Friend = Friend_List.split("[$F]")
		
		let Mysql_String = `select * from Userlist WHERE id in (${Friend.join(",")})`
		Connect.query(Mysql_String,function(err,rls){
			
			let Friendrls = []
			let Friend_State = []
			
			for(let i = 0,j = rls.length;i<j;i++){
				Friendrls.push({
					name : rls[i].name,
					UserId: rls[i].id,
					Headimage : ("HeadImage/"+rls[i].Headimage)
				})
			}

			GetFls(Friendrls)
		})
}


//数据连接对象以及部分封装获取方法
module.exports = {
	Connect : Connect,
	GetImage :GetImage,
	MessgaeGet:MessgaeGet,
	FriendRls:FriendRls
}
//对用户信息进行的操作
//用户的信息组
let UserList = [];


//存储用户信息
class UserMessage {
		UserId = null
		Username = null
	
		//通过构造函数
    constructor(UserId,Username) {
        this.UserId = UserId
				this.Username = Username
    }
		
		//获取用户信息
		GetMessage(){
			return {UserId:this.UserId,Username:this.Username}
		}
		//获取唯一的id主键
		GetOnlyId(){
			return this.UserId+""
		}
		
		//获取最近一次交互的时间
		GetLastTime(){
		
		}
		
}

//增加一位用户
function AddUser(UserId,Username){
		//当有相同用户时
		if(SeekUser(UserId)){
			return false
		}else{
			let Add_Unit = new UserMessage(UserId,Username)
			UserList.push(Add_Unit)
			return true
		}
}


//根据用户id查找一位用户
function SeekUser(UserID){
		for(i = 0,len=UserList.length; i < len; i++) {
			if((UserID+"")==(UserList[i].GetOnlyId())){
				return {Unit:UserList[i],index:i}
			}
		}
		return false
}

module.exports = {
	UserList:UserList,
	AddUser:AddUser,
	SeekUser:SeekUser
}
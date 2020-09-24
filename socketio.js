let socketio = {};
let socket_io = require('socket.io'); 
let http = require('http');

//搜索的用户列表集合
let Seek_List = [];
//连接的键值对集合
let Socket_List = {
	type:{
		Cnumber : 0,
	}
}

let Client_io = socket_io.listen(http.createServer(()=>{}).listen(3100)); 

//根据用户id获取用户Socket连接{返回用户的socket}
function GetSocket (UserId){

	//当用户连接不存在时，返回空
	if(Seek_List.indexOf(UserId)==-1){
		return null
	}else{//否则寻找对应的socket
		return Socket_List[UserId]
	}
}

//增加一个用户连接
function AddSocket (UserId,Socket){
	Socket_List[UserId]={Socket:Socket}
	//当用户连接不存在时，新建连接
	if(Seek_List.indexOf(UserId)==-1){
		Seek_List.push(UserId)
		//Socket_List[UserId]={Socket:Socket}
		Socket_List["type"]["Cnumber"] += 1
	}else{
		//Socket_List[UserId]={Socket:Socket}
	}
}

//通知所有好友
function NoticeFriend (UserId,FriendState){
	for(let X = 0,Y = FriendState.length;X<Y;X++){
		//发送在线消息
		if(typeof Socket_List[FriendState[X]] != "undefined"){
			Socket_List[FriendState[X]].Socket.emit('Online',UserId)
		}
	}
}

module.exports = {
		Client_io : Client_io,
		GetSocket : GetSocket,
		AddSocket : AddSocket,
		NoticeFriend : NoticeFriend
};
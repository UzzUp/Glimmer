//处理Vue以及Socketio
			
			//与服务器进行socket连接
			let socket = io.connect('http://localhost:3100')
			// socket.emit('login',Userid);
			
			let MessageList = new SliderLine("MessageList")
			let Friend_List = new SliderLine("Friend_List")
			
			//Vue数据绑定
			//用户信息框的动态绑定
			let Message_frame = new Vue({
				el:"#User_Message",
				data:{
					UserName : UserName,
					HeadImage : HeadImage
				},
				computed:{
					ShowName : function(){//设置显现的名字的样式
						return (this.UserName).length>6?(this.UserName).substring(0,5)+"..":this.UserName
					},
					ShowHead : function(){//头像的显示路径
						return this.HeadImage
					}
				}
			})
			
			//功能显示窗口
			let Show_frame = new Vue({
				el:"#Function_Page",
				data:{
					ChatWith : "null",//聊天对象的ID
					ShowSelect : "big-box",
					FriendList : FriendList,
					FriendState : FriendState,
					Headimage : "HeadImage/AccountHead.png",
					name : "无"
				},
				computed:{
					//获取用户信息列表
					GetFriendList:function(){
						let Online = []//在线列表
						let Out = []//离线列表
						
						//根据用户状态排序，并设置信息组
						if(this.FriendState.length != 0){
							for(let X = 0 ,Y = this.FriendList.length;X<Y;X++){
								if(this.FriendState.indexOf(this.FriendList[X].UserId+"")!=-1){
									this.FriendList[X].State = "Online.png"
									Online.push(this.FriendList[X])
								}else{
									this.FriendList[X].State = "Out.png"
									Out.push(this.FriendList[X])
								}
								
								//当头像不存在时,使用默认头像代替
								if(this.FriendList[X].Headimage=="null"){
									this.FriendList[X].Headimage = "HeadImage/AccountHead.png"
								}
													
							}
						}
						this.FriendList = JsonJoin(Online,Out)
						//拼接两个列表并返回
						return this.FriendList
					},
				},
				methods:{
					OpenOnline:function(UserId){//打开聊天框事件
						this.ChatWith = UserId;//存储聊天对象的id
						this.GetChatWith();
					},
					GetChatWith:function(){//获取当前聊天对象的信息
						for(let X = 0,Y = this.FriendList.length;X<Y;X++){
							if(this.FriendList[X].UserId == this.ChatWith){
								this.Headimage = this.FriendList[X].Headimage;
								this.name = this.FriendList[X].name;
								break
							}
						}
					},
					SendMessage:function(){//发送消息事件[接受者id][发送者id][发送消息]
						let Send_Message = this.ChatWith+"|X|"+Userid+"|X|"+$("#Send_Frame").val()
					
						$("#MessageList").append(`<div style="width: 100%;height: 50px;background-color: #ffaa00;margin-top: 10px;">
							${Send_Message}
						</div>`)
					
						socket.emit('Send',Send_Message);
					},
				}
			})
			
			//功能选择框的动态绑定
			let Function_frame = new Vue({
				el:"#Function",
				data:{
						Functions : [
							{
								Elid : "Main_Window",
								name : "我的首页",
								Icon : "./images/UIimage/home.png",
								Hframe : "Main-box",
								Select : false
							},
							{
								Elid : "Friend_Window",
								name : "好友信息",
								Icon : "./images/UIimage/Friend_On.png",
								Hframe : "big-box",								
								Select : true								
							},
							{
								Elid : "Game_Window",
								name : "游戏列表",
								Icon : "./images/UIimage/Game_On.png",
								Hframe : "Test-box",								
								Select : false
							}
						]
				},
				methods:{
					//界面选择
					Frame_Select : function(FrameName,index){
						//设置唯一选中状态
						for(let i = 0,y = this.Functions.length;i<y;i++){
								if(i == index){
									this.Functions[i].Select = true
								}else{
									this.Functions[i].Select = false
								}
						}
						//设置显示的界面
						Show_frame.ShowSelect = this.Functions[index].Hframe
					},
				}
			})
			
			// 拼接json类型的对象
			function JsonJoin(Json_One, Json_Tow) {
			  let Join_Json = []
				
				for (let X = 0, Y = Json_One.length;X<Y;X++) {
				  Join_Json.push(Json_One[X])
				}
				
				for (let X = 0, Y = Json_Tow.length;X<Y;X++) {
				  Join_Json.push(Json_Tow[X])
				}
				
				return Join_Json
			}
			
			//处理Socket连接事件
			socket.on('Send',function (Send_Message) {//获取消息事件[发送者id][消息内容]
				let Message_List = (Send_Message.Text).split("|X|")
				let Send_Name = "匿名用户"
				for(let X = 0 ,Y = Show_frame.FriendList.length;X<Y;X++){
					if(Show_frame.FriendList[X].UserId == Message_List[0]){
						Show_frame.FriendList[X].SNumber++
						Send_Name = Show_frame.FriendList[X].name
						LoginHint(Send_Name+":"+Message_List[1],()=>{})
						break
					}
				}
			})
//处理Vue以及Socketio
			
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
					name : "无",
					ChatWith : "null",//聊天对象的ID
					ShowSelect : "big-box",
					FriendList : FriendList,
					FriendState : FriendState,
					Headimage : "HeadImage/AccountHead.png",
					FriendOnline :{}
				},
				computed:{
					//获取用户的聊天信息列表
					GetMessageList:function(){
						return this.FriendOnline["1"]
					},
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
						if(this.ChatWith != UserId){
							//清除原先的好友单元
							$(".UNIT").remove()
							
							this.ChatWith = UserId;//存储聊天对象的id
							let GetThis = this;//获取this对象
							//发送获取聊天信息的请求
							axios({
									method: 'POST',
									url:"users/GetMessage",//路由路径
									data:{//发送两个聊天对象的id
										User:Userid,
										Friend:UserId
									},
							})
							.then(function (response) {
								if(response.data != "X001-Y001"){
									let Data = response.data.split("|X|")
									let Online = []
									
									for(let X = 0,Y = Data.length;X<Y;X++){
										let MessageUnit = Data[X].split("|Y|")
										Online.push({
											Id : MessageUnit[0],
											Message : MessageUnit[1]
										})
									}
									//增加聊天信息
									GetThis.FriendOnline[UserId]=Online
									
									//增加聊天单元
									for(MessageS in GetThis.FriendOnline[UserId]){
										console.log(GetThis.FriendOnline[UserId][MessageS[0]])
										if(GetThis.FriendOnline[UserId][MessageS[0]].Id == Userid){
											GetThis.AddUnit("User",GetThis.FriendOnline[UserId][MessageS[0]].Message)
										}else{
											GetThis.AddUnit("Friend",GetThis.FriendOnline[UserId][MessageS[0]].Message)
										}
									}
								}
							})
							.catch(function (error) {
								console.log(error)
							});
							this.GetChatWith();
						}else{
							//如果打开的是同一个视图
						}
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
					GetOnline:function(Getid){//获取指定聊天对象的昵称以及头像URL
						for(let X = 0,Y = this.FriendList.length;X<Y;X++){
							if(this.FriendList[X].UserId == Getid){
								return{
									name : this.FriendList[X].name,
									Headimage : this.FriendList[X].Headimage
								}
							}
						}
					},
					AddUnit:function(OFF,Message){//增加一个聊天单元[OFF][消息来源User/Friend/list][Message][具体消息]
						const WidthMax = 300//最大宽度
						const WidthUnit = 25//单个字高度
						let NameShow = OFF == "User"?"您":this.name
						let ImageShow = OFF == "User"?HeadImage:this.Headimage
						//字体长度
						let FontLength = textSize("14px",'"Helvetica Neue",Helvetica,Arial,sans-serif',Message)
						//气泡的长宽
						let Air_Width = FontLength.width<WidthMax?FontLength.width:WidthMax
						let Air_Height = FontLength.width/WidthMax>1?FontLength.width/WidthMax*WidthUnit:WidthUnit
						
						//判断消息来源
						if(OFF == "User"){
							$("#MessageList").append(
							`<div class="UNIT" style="width: 100%;height: ${Air_Height+50}px;margin-top:20px">
								<div style="width: 100%;height: 40px;">
									<font size="2" color="" style="margin-right:14%;margin-top: 10px;float: right;">${NameShow}</font>
									<img src="${ImageShow}" width="30px" height="30px" style="border-radius: 10px;border:1px #d0d0d0 solid;position:relative;left:90%;top:5px;"/>
								</div>
								<span class="text" style="margin-right: 10%;float: right;">${Message}</span>
							</div>`
							)
						}else{
							$("#MessageList").append(
							`<div class="UNIT" style="width: 100%;height: ${Air_Height+50}px;margin-top:20px">
								<div style="width: 100%;height: 40px;">
									<img src="${ImageShow}" width="30px" height="30px" style="border-radius: 10px;border:1px #d0d0d0 solid;position:relative;left:5px;top:5px"/>
									<font size="2" color="" style="margin-left: 10px;">${NameShow}</font>
								</div>
								<span class="text" style="margin-left: 10%;">${Message}</span>
							</div>`
							)
						}
					},
					SendMessage:function(){//发送消息事件[接受者id][发送者id][发送消息]
					let Send_Message = this.ChatWith+"|X|"+Userid+"|X|"
					let Send_Text = null
					if($("#Send_Frame").val()==""){
						Send_Text = "瞪了你一眼"
					}else{
						Send_Text = $("#Send_Frame").val()
					}
						
						//发送消息事件
						this.AddUnit("User",Send_Text)
						
						MessageList.repaint()
						MessageList.Onpart()
					
						socket.emit('Send',Send_Message+Send_Text);
						//清空输入框
						$("#Send_Frame").val("")
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
			
			//处理Socket连接事件
			socket.on('Send',function (Send_Message) {//获取消息事件[发送者id][消息内容]
				let Message_List = (Send_Message.Text).split("|X|")
				let Send_Name = "匿名用户"
				for(let X = 0 ,Y = Show_frame.FriendList.length;X<Y;X++){
					if(Show_frame.FriendList[X].UserId == Message_List[0]){
						Show_frame.FriendList[X].SNumber++
						Send_Name = Show_frame.FriendList[X].name
						//发送弹窗事件
						LoginHint(Send_Name+":"+Message_List[1],()=>{})
						//发送消息事件
						Show_frame.AddUnit("Friend",Message_List[1])
						MessageList.repaint()
						MessageList.Onpart()
						break
					}
				}
			})
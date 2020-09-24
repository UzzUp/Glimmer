			//处理Vue以及Socketio
			let MessageList = new SliderLine("MessageList",50)
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
					ChatWith : 0,//聊天对象的ID
					ShowSelect : "big-box",
					FriendList : FriendList,
					FriendState : FriendState,
					Headimage : "HeadImage/AccountHead.png",
					FriendOnline :{}
				},
				computed:{
					//获取用户信息列表
					GetFriendList:function(){
						let Online = []//在线列表
						let Out = []//离线列表
						
						//根据用户状态排序，并设置信息组
						if(this.FriendState.length != 0){
							for(let X = 0 ,Y = this.FriendList.length;X<Y;X++){
								this.FriendList[X].NewMessage = false
								if(this.FriendState.indexOf(this.FriendList[X].UserId+"")!=-1){
									this.FriendList[X].State = false
									Online.push(this.FriendList[X])
								}else{
									this.FriendList[X].State = true
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
							//清除原先的好友聊天单元
							$(".UNIT").remove()
							
							this.ChatWith = UserId;//存储聊天对象的id
							
							this.SetShow(this.ChatWith,false,0)//设置提示气泡关闭
							
							let GetThis = this;//获取this对象
							//调用方法改变聊天对象信息
							this.GetChatWith();
							
							//当时第一次请求时,向服务器请求资源
							if(typeof GetThis.FriendOnline[UserId] == "undefined"){
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
							}else{//此后不再向服务器请求,从本地获取
								//渲染聊天单元
								for(MessageS in GetThis.FriendOnline[UserId]){
									if(GetThis.FriendOnline[UserId][MessageS[0]].Id == Userid){
										GetThis.AddUnit("User",GetThis.FriendOnline[UserId][MessageS[0]].Message)
									}else{
										GetThis.AddUnit("Friend",GetThis.FriendOnline[UserId][MessageS[0]].Message)
									}
								}
							}
							
							if(typeof MessageList.repaint != "undefined"){
								MessageList.repaint()
								MessageList.Onpart()
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
					SetShow:function(Setid,OFF,SNumber){//设置是否显示小徽章[Setid][设置对象][OFF][是否显示][SNumber][是否设置数量]
						for(let X = 0 ,Y = this.FriendList.length;X<Y;X++){
								if(this.FriendList[X].UserId == Setid){
									this.FriendList[X].NewMessage = OFF
									if(SNumber!=-1){
										this.FriendList[X].SNumber = SNumber
									}
								}
						}
					},
					SetOnline:function(Setid,Mid,Message){//增加一个聊天信息[Setid][增加对象][Mid][发送对象][Message][具体消息]
						//初始化聊天信息
						if(typeof this.FriendOnline[Setid] == "undefined"){
							this.FriendOnline[Setid] = []
						}
						
						//往指定聊天对象记录里增加聊天信息
						this.FriendOnline[Setid].push({
							Id: Mid,
							Message: Message
						})
					},
					AddUnit:function(OFF,Message){//增加一个聊天单元[OFF][消息来源User/Friend/list][Message][具体消息]
						if(typeof Message != "undefined"){
							const WidthMax = 300//最大宽度
							const WidthUnit = 25//单个字高度
							let NameShow = OFF == "User"?"":this.name
							let ImageShow = OFF == "User"?HeadImage:this.Headimage
							//字体长度
							let FontLength = textSize("14px",'"Helvetica Neue",Helvetica,Arial,sans-serif',Message)
							//气泡的长宽
							let Air_Width = FontLength.width<WidthMax?FontLength.width:WidthMax
							let Air_Height = FontLength.width/WidthMax>1?FontLength.width/WidthMax*WidthUnit:WidthUnit
							
							let back_Color = "#00aaff"
							let Color = "#ffffff"
							
							//判断消息来源
							if(OFF == "User"){
								$("#MessageList").append(
								`<div class="UNIT" style="width: 100%;height: ${Air_Height+50}px;margin-top:20px">
									<div style="width: 100%;height: 40px;">
										<font size="2" color="" style="margin-right:14%;margin-top: 10px;float: right;">${NameShow}</font>
										<img src="${ImageShow}" width="30px" height="30px" style="border-radius: 10px;border:1px #d0d0d0 solid;position:relative;left:90%;top:5px;"/>
									</div>
									<span class="text" style="margin-right: 10%;float: right;background-color:${back_Color};color:${Color};">${Message}</span>
								</div>`
								)
							}else{
								$("#MessageList").append(
								`<div class="UNIT" style="width: 100%;height: ${Air_Height+50}px;margin-top:20px">
									<div style="width: 100%;height: 40px;">
										<img src="${ImageShow}" width="30px" height="30px" style="border-radius: 10px;border:1px #d0d0d0 solid;position:relative;left:5px;top:5px"/>
										<font size="2" color="" style="margin-left: 10px;">${NameShow}</font>
									</div>
									<span class="text" style="margin-left: 10%;background-color:${back_Color};color:${Color};">${Message}</span>
								</div>`
								)
							}
						}
					},
				SendMessage:function(){//发送消息事件[接受者id][发送者id][消息类型][发送消息]
					let Send_Message = []
					let Send_Text = null
					Send_Message.push(this.ChatWith)
					Send_Message.push(Userid)
					if($("#Send_Frame").val()==""){
						Send_Message.push("DDD")
						Send_Message.push("你戳了戳TA")
						Send_Text = "你戳了戳TA"
					}else{
						Send_Message.push("USB")
						Send_Text = $("#Send_Frame").val()
						//替换换行符
						Send_Text = Send_Text.replace("\n","<br>");
						Send_Message.push(Send_Text)
					}
						
						//发送消息事件
						this.AddUnit("User",Send_Text)
						//往聊天记录中添加消息
						Show_frame.SetOnline(this.ChatWith,Userid,Send_Text)
						console.log(MessageList.repaint)
						MessageList.repaint()
						MessageList.Onpart()
						socket.emit('Send',Send_Message.join("|X|"));
						//清空输入框
						$("#Send_Frame").val("")
					},
				}
			})
			//初始化聊天对象
			Show_frame.OpenOnline(Show_frame.ChatWith)
			//功能选择框的动态绑定
			let Function_frame = new Vue({
				el:"#Function",
				data:{
						Functions : [
							{
								Elid : "Main_Window",
								name : "首页",
								Icon : "./images/UIimage/home.png",
								Hframe : "Main-box",
								Select : false,
								change : function(){
									
								}
							},
							{
								Elid : "User_Window",
								name : "我的",
								Icon : "./images/UIimage/Game_On.png",
								Hframe : "User-box",								
								Select : false,
								Open : false,//是否打开过
								change : function(){
									//页面避免重复加载
									if(!Function_frame.Functions[1].Open){
										Function_frame.Functions[1].Open = true
										
										//发送请求页面请求
										axios({
												method: 'POST',
												url:"users/UserMessage",//路由路径
												data:{},
										})
										.then(function (response) {
												$("#User-box").html(response.data);
										})
										.catch(function (error) {
												
										});
									}
								}
							},
							{
								Elid : "Friend_Window",
								name : "社交",
								Icon : "./images/UIimage/Friend_On.png",
								Hframe : "big-box",								
								Select : true,
								change : function(){
									setTimeout(function(){
										//回调页面重构
										MessageList = new SliderLine("MessageList",50)
										Friend_List = new SliderLine("Friend_List")
										Show_frame.OpenOnline(Show_frame.ChatWith)
									},0)
								}
							},
							{
								Elid : "Game_Window",
								name : "游戏",
								Icon : "./images/UIimage/Game_On.png",
								Hframe : "Game-box",								
								Select : false,
								change : function(){
									
								}
							},
							{
								Elid : "Forum_Window",
								name : "论坛",
								Icon : "./images/UIimage/Game_On.png",
								Hframe : "Forum-box",								
								Select : false,
								change : function(){
									
								}
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
						//启动回调事件
						this.Functions[index].change()
					},
				}
			})
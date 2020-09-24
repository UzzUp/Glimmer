			let ShowSet = {
				"USB":{//通用类型
					Hint:true,
					Hintvalue:null,
					Frame:true,
					Framevalue:null,
				},
				"DDD":{//提示类型
					Hint:true,
					Hintvalue:"戳了戳您",
					Frame:false,
					Framevalue:null,
				},
			}
			
			//处理Socket连接事件
			socket.on('Send',function (Send_Message) {//获取消息事件[发送者id][消息类型][消息内容]
				let Message_List = (Send_Message.Text).split("|X|")
				let Send_Name = "匿名用户"
				for(let X = 0 ,Y = Show_frame.FriendList.length;X<Y;X++){
					if(Show_frame.FriendList[X].UserId == Message_List[0]){
						Show_frame.FriendList[X].SNumber++
						Show_frame.FriendList[X].NewMessage = true
						Send_Name = Show_frame.FriendList[X].name
						let TypeSet = ShowSet[Message_List[1]]
						
						//发送弹窗事件
						if(TypeSet.Hint){
							let Message = Message_List[2]
							if(TypeSet.Hintvalue!=null){
								Message = TypeSet.Hintvalue
								LoginHint(Send_Name+":"+Message,()=>{})
							}else{
								if(Show_frame.ChatWith != Message_List[0]){
									LoginHint(Send_Name+":"+Message,()=>{})
								}
							}
						}
						
						//接收消息事件
						if(TypeSet.Frame){
							let Message = Message_List[2]
							//往聊天记录中添加消息
							Show_frame.SetOnline(Message_List[0],Message_List[0],Message)
							//当且仅当发送者是当前聊天对象时
							if(Message_List[0] == Show_frame.ChatWith){
								Show_frame.AddUnit("Friend",Message)
							}
							MessageList.repaint()
							MessageList.Onpart()
						}

						break
					}
				}
			})
			
			//在线消息事件
			socket.on('Online',function (OBJ) {//获取消息事件[发送者id][消息内容]
				//获取该好友信息
				let FriendMessage = Show_frame.GetOnline(OBJ+'')
				//增加在线好友
				Show_frame.FriendState.push(OBJ+'')
				//发送弹窗事件
				LoginHint("您的好友"+FriendMessage.name+"上线啦！",()=>{})
			})
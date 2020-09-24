			let BackImage = "./BackImg/0-Back.jpg"//用户个人信息背景
			
			let BlogTitle = "星期四"; //用户最新一条博客标题
			let BlogContent = "今朝如此,明日奈何?浮萍落叶,仍未可知。"; //用户最新一条博客内容
			let BlogTime = "2020-09-17"; //用户最新一条博客发布时间
			
			
			//个人信息
			let z_Self_info = new Vue({
				el:"#z-UserMessage",
				data:{
					UserName : UserName,
					HeadImage : HeadImage,
					BackImage : BackImage, 
					UserSign : UserSign,
					UserSex : UserSex,
					UserAge : UserAge,
					UserTel : UserTel,
					UserEmail : UserEmail,
					BlogTitle : BlogTitle,
					BlogContent : BlogContent,
					BlogTime : BlogTime,
					zShow : 1,//功能页面选择
				},
				methods:{
					Updata:function(){
						let thisSet = this
						//生成设置信息的结果集
						let Message_Get = {
							Username : $('#z-info-inputName').val(),
							Age: $('#z-info-inputAge').val(),
							Sex: thisSet.UserSex,
							Ophone: $('#z-info-inputTel').val(),
							Email: $('#z-info-inputEmail').val(),
							Present: $('#z-info-inputSign').val(),
							Pagecover:" "
						}
						
						axios.post("users/SetUserMessage",Message_Get)
						.then(function (response) {
							//打开提示弹窗
							if(response.data == "X000-Y000"){
								LoginHint("个人资料修改成功",()=>{})
								//更改信息
								thisSet.UserName = $('#z-info-inputName').val()
								UserName = $('#z-info-inputName').val()
								thisSet.UserAge = $('#z-info-inputAge').val()
								thisSet.UserTel = $('#z-info-inputTel').val()
								thisSet.UserSign = $('#z-info-inputSign').val()
								thisSet.UserEmail = $('#z-info-inputEmail').val()
								//跳转
								thisSet.zShow = 1
							}else{
								LoginHint("个人资料修改失败",()=>{})
							}
						})
						.catch(function (error) {
							console.log(error);
						});
					}
				}
			});
			
			
				//提交头像表单事件
				$("#HeadFile").get(0).onchange = function () {
						let thisFile = this.files[0]
						//保存文件后缀名
						let suffix = thisFile.name.split(".")[1]
						
						//更改图片并且上传至数据库
						let reader = new FileReader()
						reader.readAsDataURL(thisFile)/*异步解析，不会立马返回结果*/
						reader.onload = function(e) {
							//图片的二进制数据转换成base64的字符串 
							//常见用于显示页面的一些小图片或图标
				      let data = e.target.result;
							$("#Head_Image").attr("src", data);
							axios({
									method: 'POST',
									url:"users/headImage",//路由路径
									data:{ImageData:data,suffix:suffix},
							})
							.then(function (response) {
								LoginHint("新的头像保存成功！",()=>{})
							})
							.catch(function (error) {
								LoginHint("错误！头像设置失败！",()=>{})
							});
						}
				}
				
				
				//信息提示
				function LoginHint(HintString,HintFunction){
					let index = layer.msg(HintString, {
						anim: 5,//设置动画样式
						time: 1000*10,
						offset: ['5%','80%'],//设置位置
					},
						HintFunction
					)
					layer.style(index,{transition:"top 2s"})//设置移动方法
					return index
				}
				
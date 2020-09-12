				
				//绑定的div
				let AddDiv = "Friend_List"
				let AddSlider = "#Friend_List"
				
				//盒子对象
				let Box = $("#"+AddDiv)
				Box.css("transform","margin-top 3s")
				//透明度
				let slider_alpha = 0.5
				let slider_alpha_Max = 1
				let slider_alpha_Min = 0.5
				let slider_color = "#cb006c"
				let slider_color_DF = "#cb006c"
				//滑块间隔
				let slider_interval = 3
				//滑块点击位置
				let slider_click_loca = 0
				
				//生成一个对应样式的canvas标签a10056
				SetCss=(Style_List)=>{
					let style = "";
					
					for(let Styles in Style_List){
						style += (Styles+":"+Style_List[Styles]+";")
					}
					
					let unit = `<canvas id="box-slider" style="${style}">
						你的浏览器不支持canvas！
					</canvas>`
					
					return unit
				}
				
				
				slider_Canvas=(Mouse_Y)=>{
					Canvas_slider.clearRect(0,0,slider_width,slider_height)
					//设置透明度
					Canvas_slider.globalAlpha = slider_alpha
					//画新的部分
					Canvas_slider.beginPath()
					Canvas_slider.lineWidth = 1
					Canvas_slider.strokeStyle = slider_color
					Canvas_slider.moveTo(10,0)
					Canvas_slider.lineTo(10,slider_height)
					Canvas_slider.stroke()
					
					//画滑块的线
					Canvas_slider.beginPath()
					Canvas_slider.lineWidth = 6
					Canvas_slider.lineCap = "round"
					Canvas_slider.moveTo(10,Mouse_Y)
					Canvas_slider.lineTo(10,Mouse_Y+slider_length)
					Canvas_slider.stroke()
					
				}
				
				//是否点击到滑块(判定)
				Click_Slider=(event)=>{
					let loca = -1
					let Click_Y = event.pageY-(Box.offset().top-window.pageYOffset)
					//点击位置判定
					if(Click_Y > slider_Loca-slider_interval&&Click_Y<slider_Loca+slider_length+slider_interval){
						loca = Click_Y-slider_Loca
						slider_click_loca = loca
					}
					
					return loca
				}
				
				//滑块样式
				let slider_Style = {
					"top" :"0px",
					"right" : "0px",
					"width" : "20px",
					"height": "100%",
					"position" : "absolute",
				}
				

				
				//将生成的canvas标签放置到页面上
				Box.prepend(SetCss(slider_Style))
			
				let slider = $("#box-slider").get(0)
				
				let slider_proportion = 1
				let slider_length = 100
				
				//保存长宽信息
				let slider_width = slider.offsetWidth-1
				let slider_height = slider.offsetHeight
				//获得最后一个标签单位
				let Last_Unit = document.getElementById(AddDiv).lastElementChild
				//设置界面总高度
				let slider_block_length = Last_Unit.offsetTop+Last_Unit.offsetHeight
				//设置滑块初始位置
				let slider_Loca = slider_interval		
				
				slider_proportion = parseFloat(slider_block_length/slider_height)
				slider_length = parseFloat(slider_height/slider_proportion)
				
				//滑轮每次移动单位s
				let Move_Unit_length =parseFloat((Last_Unit.offsetHeight) / slider_proportion)
				
				//获取鼠标的输入
				$("#box-slider").mousedown(()=>{
					if(Click_Slider(event)){
						let slider = $("#box-slider")
						
						$("body").css("-moz-user-select","none")
						$("body").css("-khtml-user-select","none")
						$("body").css("user-select: none","none")
						slider_color = "black"
						
						//点击事件结束
						$("html").mousemove(()=>{
							//获取鼠标位置
							//清除位置跟踪
							let slider = $("#box-slider")
							let shifting = 0
							slider_Loca = parseInt(event.clientY - (slider.offset().top-window.pageYOffset))
							slider_Loca -= slider_click_loca

							if(slider_Loca<slider_interval){
								slider_Loca = slider_interval
								shifting = -(slider_interval*slider_proportion)
							}else if(slider_Loca+slider_length>slider_height-slider_interval){
								slider_Loca = slider_height-slider_length-slider_interval
								shifting = slider_interval*slider_proportion
							}
							//增加点击位置
							
							
							slider_Canvas(slider_Loca)
							//根据滑块位置，作图并设置界面位置
							Box.children().get(1).style.marginTop = "-"+(slider_Loca*slider_proportion+shifting)+"px"
						})
						
						//移动事件结束
						$("html").mouseup(()=>{
							//清除位置跟踪
							slider_color = slider_color_DF
							slider_Canvas(slider_Loca)
							$("body").css("-moz-user-select","text")
							$("body").css("-khtml-user-select","text")
							$("body").css("user-select: none","text")
							$("html").unbind("mousemove")
							$("html").unbind("mouseup")
						})
					}
				})
				
				//设置进入退出事件
				$("#box-slider").mouseenter(()=>{
					slider_alpha = slider_alpha_Max
					slider_Canvas(slider_Loca)
				})
				$("#box-slider").mouseout(()=>{
					slider_alpha = slider_alpha_Min
					slider_Canvas(slider_Loca)
				})
				
				//启动禁用滚轮
				Box.mouseenter(()=>{
					document.documentElement.style.overflow='hidden';  
					document.body.style.overflow='hidden';  
				})
				Box.mouseleave(()=>{
					document.documentElement.style.overflow='visible';
					document.body.style.overflow='visible';  
				})
				
				
				Box.on("mousewheel DOMMouseScroll", function (e) {
					
				var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1))||
				              (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));      
				   if (delta == -1) {
						 slider_Loca+=Move_Unit_length
						 let shifting = 0
						 if(slider_Loca<slider_interval){
						 	slider_Loca = slider_interval
						 	shifting = -(slider_interval*slider_proportion)
						 }else if(slider_Loca+slider_length>slider_height-slider_interval){
						 	slider_Loca = slider_height-slider_length-slider_interval
						 	shifting = slider_interval*slider_proportion
						 }
				    
						slider_Canvas(slider_Loca)
						//根据滑块位置，作图并设置界面位置
						Box.children().get(1).style.marginTop = "-"+(slider_Loca*slider_proportion+shifting)+"px"
					 }else if(delta == 1){
							slider_Loca-=Move_Unit_length
							let shifting = 0
							if(slider_Loca<slider_interval){
								slider_Loca = slider_interval
								shifting = -(slider_interval*slider_proportion)
							}else if(slider_Loca+slider_length>slider_height-slider_interval){
								slider_Loca = slider_height-slider_length-slider_interval
								shifting = slider_interval*slider_proportion
							}
							slider_Canvas(slider_Loca)
							//根据滑块位置，作图并设置界面位置
							Box.children().get(1).style.marginTop = "-"+(slider_Loca*slider_proportion+shifting)+"px"
					 }
					 
				});
				
				
				
				//设置canvas以及2d对象

				slider.width = slider_width
				slider.height = slider_height
	

				let Canvas_slider = slider.getContext("2d")
				Canvas_slider.width =  slider_width
				Canvas_slider.height = slider_height
				
				slider_Canvas(slider_Loca)
				
			class SliderLine{
				//增加滑块对象的id
				Box = ""
				Slider_id = ""
				Slider_Height = 0//元素高度
				Slider_Attr = {}//滑块属性
				block_length = 0//界面元素高度
				slider_length = 0//滑块高度
				proportion = 1//滑块比例
				
				//滑轮显示状态
				OPenter = 1
				OPout = 0.2
				
				//滑块样式
				slider_Style1 = {
					"top" :"0px",
					"left" : "100%",
					"width" : "15px",
					"height": "100%",
					"margin-left" : "-15px",
					"position" : "absolute",
				}
				slider_Style2 = {
					"top" :"0px",	
					"left" : "0px",					
					"width" : "100%",
					"height": "30px",
					"opacity" : this.OPout,
					"position" : "absolute",
					"border-radius" : "10px",
					"background-color" : "#11a4ff"
				}
				
				slider_Style3 = {			
					"height": "1px",
					"border": "none",
					"width" : "100%",
					"background-color" : "#55ffff"
				}
				
				//生成一个对应样式的div标签
				SetCss=(Style_List1,Style_List2,Style_List3)=>{
					let style = "";
					let Div_style = "";
					let Set_style = "";
					
					for(let Styles in Style_List1){
						style += (Styles+":"+Style_List1[Styles]+";")
					}
					
					for(let Styles in Style_List2){
						Div_style += (Styles+":"+Style_List2[Styles]+";")
					}
					
					for(let Styles in Style_List2){
						Set_style += (Styles+":"+Style_List3[Styles]+";")
					}
					
					let unit = `<div id="${this.Slider_id}Line" style="${style}">
					<div id="${this.Slider_id}Block" style="${Div_style}"></div>
					</div>
					<div id="${this.Slider_id}Display" style="${Style_List3}">
					</div>`
					
					return unit
				}
				
				
				//构造方法,接受一个id
				constructor(id) {
						this.Slider_id = id;
						this.Box = $("#"+this.Slider_id)
						let SliderOBJ = this
						
						new Promise(function(resolve,reject){
							
							SliderOBJ.Box.css("transform","all 3s")
							SliderOBJ.Box.prepend(SliderOBJ.SetCss(SliderOBJ.slider_Style1,SliderOBJ.slider_Style2,SliderOBJ.slider_Style3))
							resolve("");
						}).then(function(value){
							
							let Get = setInterval(function(){
								//获得滑块的对象
								let LineElement = document.getElementById(SliderOBJ.Slider_id+"Line")
								let BlockElement = document.getElementById(SliderOBJ.Slider_id+"Block")
								//获得最后一个单元
								let Last_Unit = document.getElementById(SliderOBJ.Slider_id).lastElementChild
								
								if(SliderOBJ.getElementLeft(LineElement)+""!="0"){
									if(SliderOBJ.getElementLeft(BlockElement)+""!="0"){
										
										//获取元素起始位置
										SliderOBJ.Slider_Attr["LineX"] = SliderOBJ.getElementLeft(LineElement);
										SliderOBJ.Slider_Attr["LineY"] = SliderOBJ.getElementTop(LineElement);
										//设置滑块起始位置
										SliderOBJ.Slider_Attr["stateY"] = 0;
										//鼠标坐标起始位置
										SliderOBJ.Slider_Attr["ClickY"] = 0;
										//取得滑块位置总长度
										SliderOBJ.Slider_Height = $("#"+SliderOBJ.Slider_id+"Line").height()
										//获得界面总高度
										SliderOBJ.block_length = Last_Unit.offsetTop+Last_Unit.offsetHeight
										
										SliderOBJ.proportion = parseFloat(SliderOBJ.block_length/SliderOBJ.Slider_Height)
										//当比例小于1时，设置为1
										if(SliderOBJ.proportion<1){
											SliderOBJ.proportion  = 1
										}
										SliderOBJ.slider_length = parseFloat(SliderOBJ.Slider_Height/SliderOBJ.proportion)
										//设置滑块高度
										BlockElement.style.height = SliderOBJ.slider_length + "px"
										
										clearInterval(Get)
									}
								}
							},1000)
						}).then(function(value){
							//触摸绑定事件
							$(document).delegate("#"+SliderOBJ.Slider_id+"Line","mouseenter",(event)=>{
								document.getElementById(SliderOBJ.Slider_id+"Line").style.opacity = SliderOBJ.OPenter;
							});
							$(document).delegate("#"+SliderOBJ.Slider_id+"Line","mouseleave",(event)=>{
								document.getElementById(SliderOBJ.Slider_id+"Line").style.opacity = SliderOBJ.OPout;
							});
							
							//滚轮绑定事件
							let ShowTime = null;
							$(document).delegate("#"+SliderOBJ.Slider_id,"mousewheel DOMMouseScroll",(event)=>{
								let delta = (event.originalEvent.wheelDelta && (event.originalEvent.wheelDelta > 0 ? 1 : -1))||(event.originalEvent.detail && (event.originalEvent.detail > 0 ? -1 : 1));    
								let ExpecT = SliderOBJ.Slider_Attr["ClickY"]	
								let Dome = 0;								
								
								if(delta == -1){
									ExpecT += 3
								}else if(delta == 1){
									ExpecT -= 3
								}
								
								//对视图进行判断操作
								
								if(ExpecT>0&&ExpecT<(SliderOBJ.Slider_Height-SliderOBJ.slider_length)){
									Dome = 1
								}else{
									if(ExpecT<=0){
										Dome = 2
									}
									if(ExpecT>=(SliderOBJ.Slider_Height-SliderOBJ.slider_length)){
										Dome = 3
									}
								}
								
								switch (Dome){
									case 1:
										SliderOBJ.Slider_Attr["ClickY"] = ExpecT
										break;
									case 2:
										SliderOBJ.Slider_Attr["ClickY"] = 0							
										break;
									case 3:
										SliderOBJ.Slider_Attr["ClickY"] = SliderOBJ.Slider_Height - SliderOBJ.slider_length
										break;
									default:
										break;
								}
								//实装滚轮事件
								document.getElementById(SliderOBJ.Slider_id+"Line").style.opacity = SliderOBJ.OPenter;
								//显示动画
								clearTimeout(ShowTime)
								ShowTime = setTimeout(function(){
									document.getElementById(SliderOBJ.Slider_id+"Line").style.opacity = SliderOBJ.OPout;
								},1000)
																
								document.getElementById(SliderOBJ.Slider_id+"Block").style.top = 	SliderOBJ.Slider_Attr["ClickY"] + "px"
								$("#"+SliderOBJ.Slider_id).children().get(1).style.marginTop = "-"+(SliderOBJ.Slider_Attr["ClickY"]*SliderOBJ.proportion)+"px"
							});
							
							//滑块绑定事件
							$(document).delegate("#"+SliderOBJ.Slider_id+"Block","mousedown",(event)=>{
								let BlockElement = document.getElementById(SliderOBJ.Slider_id+"Block")								
								let Click = event.pageY - SliderOBJ.Slider_Attr["LineY"] - SliderOBJ.Slider_Attr["ClickY"]
								SliderOBJ.Slider_Attr["ClickY"] = event.pageY - SliderOBJ.Slider_Attr["LineY"]
								
								
								// - SliderOBJ.Slider_Attr["LineY"]
								//页面配合设置
								$("body").css("-moz-user-select","none")
								$("body").css("-khtml-user-select","none")
								$("body").css("user-select: none","none")

								
								
								$("html").mousemove((event)=>{
									let ExpecT = event.pageY - SliderOBJ.Slider_Attr["LineY"] - Click		
									let Dome = 0;
									
									if(ExpecT>0&&ExpecT<(SliderOBJ.Slider_Height-SliderOBJ.slider_length)){
										Dome = 1
									}else{
										if(ExpecT<0){
											Dome = 2
										}
										if(ExpecT>(SliderOBJ.Slider_Height-SliderOBJ.slider_length)){
											Dome = 3
										}
									}
									
									switch (Dome){
										case 1:
											SliderOBJ.Slider_Attr["ClickY"] = ExpecT
											break;
										case 2:
											SliderOBJ.Slider_Attr["ClickY"] = 0				
											break;
										case 3:
											SliderOBJ.Slider_Attr["ClickY"] = SliderOBJ.Slider_Height - SliderOBJ.slider_length
											break;
										default:
											break;
									}
									
									//根据判断对视图进行判断操作
									BlockElement.style.top = SliderOBJ.Slider_Attr["ClickY"] + "px"
									document.getElementById(SliderOBJ.Slider_id+"Line").style.opacity = SliderOBJ.OPenter;	
									$("#"+SliderOBJ.Slider_id).children().get(1).style.marginTop = "-"+(SliderOBJ.Slider_Attr["ClickY"]*SliderOBJ.proportion)+"px"
								})
								
								$("html").mouseup((event)=>{
									//清除位置跟踪
									document.getElementById(SliderOBJ.Slider_id+"Line").style.opacity = SliderOBJ.OPout;	
									$("html").unbind("mousemove")
									$("html").unbind("mouseup")
								})
							})
						}, function(err) {//抛出错误
						  console.log('reject:' + err);
						});
				}
				
				//获取指定组件的绝对位置
				getElementLeft(element){
				　	let actualLeft = element.offsetLeft;
				　	let current = element.offsetParent;
				
				　	while (current !== null){
				　　　	actualLeft += current.offsetLeft;
				　　　	current = current.offsetParent;
				　	}
				
				　	return actualLeft;
				}	
				getElementTop(element){
				　	let actualTop = element.offsetTop;
				　	let current = element.offsetParent;
				
				　	while (current !== null){
				　　　	actualTop += current.offsetTop;
				　　　	current = current.offsetParent;
				　	}
				
				　	return actualTop;
				}
			}
		//登录页面与注册页面轮换事件
		(()=>{
			let Iframe_List = $(".Iframe_Select")
			Iframe_List.click(function(){
				$(this).parent().removeClass("Iopen")
				if(Iframe_List.index(this)==1){
					Iframe_List.eq(0).parent().addClass("Iopen")
				}else if(Iframe_List.index(this)==0){
					Iframe_List.eq(1).parent().addClass("Iopen")
				}
			})
		})()
		
		//图片轮播事件		
		let LB_image = $("#Image_Show>img")
		let LB_Drop = $("#Drop_Show>div")
		let Image_length = LB_image.size()
		let Intval_Time = 4
		let Image_Loca = 1
		
		let Intval_Run= setInterval(repaint,1000*Intval_Time)
		function repaint(){
				LB_image.each((index)=>{
					if(index != Image_Loca){
						LB_image.eq(index).removeClass("ImageShow")
						LB_Drop.eq(index).removeClass("Drop_Show")
					}else{
						LB_image.eq(index).addClass("ImageShow")
						LB_Drop.eq(index).addClass("Drop_Show")
					}
				});
				
				if(Image_Loca+1==Image_length){
					Image_Loca=0
				}else{
					Image_Loca+=1
				}
		}
		
		//原点点击事件
		LB_Drop.mouseenter(function(){
			Image_Loca = LB_Drop.index(this)
			clearInterval(Intval_Run)
			repaint()
		})
		
		//原点点击事件
		LB_Drop.mouseout(function(){
			Intval_Run= setInterval(repaint,1000*Intval_Time)
		})
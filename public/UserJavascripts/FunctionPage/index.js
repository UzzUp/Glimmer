				//好友列表动画效果
				$("#big-box>").mouseenter(function(){
				  $(this).addClass("Open");
				  $(this).removeClass("Close");
				});
				
				$("#big-box>").mouseout(function(){
				  $(this).addClass("Close");
				  $(this).removeClass("Open");
				});
				
				
				//切换界面动画效果(根据用户的点击选择)
				$("#Function>").click(function(){
					let Open_Obj = $(this).attr("data-select");
					$("#Function_Page>").removeClass("Open_Window");
					$("#"+Open_Obj).addClass("Open_Window");
				})
//客户端登录请求
$('#Login_Button').click(function(){
			//请求登录事件
			Login_Res("Login_From");
})

//用户名验证请求
$('#Account_test').blur(function(){
	$.ajax({
			method:"GET",
			url:"users/AccountTest",//路由路径
			data:{Account:$("#Account_test").val()},
						
			success:function(data){
				if("X000-Y001"==data){
					//打开提示弹窗
					Hint("该账户已被注册，请重试！",function(){$('#Account_test').val("")});
				}else if("X000-Y000"==data){
					SetSchedule(20)
				}
			},
			
			error : function(e){

			},
	});
	
})

//其他验证请求
$('#Name_test').blur(function(){
	if($('#Name_test').val() == ""){
		SetSchedule(-20)
	}else{
		SetSchedule(20)
	}
})
$('#Password_test').blur(function(){
	if($('#Password_test').val() == ""){
		SetSchedule(-20)
	}else{
		SetSchedule(20)
	}
})
$('#Sefa_OFF').click(function(){
	if($("#Sefa_OFF").is(':checked')){
		SetSchedule(20)
	}else{
		SetSchedule(-20)
	}
})




//客户端注册请求
$('#Register_Button').click(function(){
	if(Schedule_Length==100){
		$.ajax({//向服务器发出请求的方法
				method:"post",
				url:"users/Register",//路由路径
				data:$('#Register_From').serialize(),

				success:function(data){
					//请求登录事件
					Login_Res("Register_From");
				},
				
				error : function(e){
		
				},
		});
	}else{
		//打开提示弹窗
		Hint("注册失败！注册列表所有项都为必填项,请仔细审阅。",function(){
				$('#Account_test')[0].reset()}
		);
	}	
})

//注册列表的完成度
var Schedule_Length = 20;
//根据增加的量变换进度条的样式
function SetSchedule(Add_Schedule){
	
	//确保Schedule_Length不会小于1不会大于0
	if((Schedule_Length+Add_Schedule)<=100){
		if((Schedule_Length+Add_Schedule)>=0){
			Schedule_Length +=Add_Schedule;
		}else{
			Schedule_Length = 0;
		}
	}else{
		Schedule_Length = 100;
	}
	
	$("#schedule").get(0).style.width = Schedule_Length+"%"
	if(Schedule_Length<90){
		$("#schedule").get(0).style.backgroundColor = "#5555ff"
	}else if(Schedule_Length<60){
		$("#schedule").get(0).style.backgroundColor = "#ffff00"
	}else if(Schedule_Length<30){
		$("#schedule").get(0).style.backgroundColor = "#ff0c1c"
	}else{
		$("#schedule").get(0).style.backgroundColor = "#1aff1a"
	}
}

//登录请求
function Login_Res(ElementID){
	$.ajax({
				method:"post",
				url:"users/Login",//路由路径
				data:$('#'+ElementID).serialize(),
							
				success:function(data){
					let Event = "";//结束事件
					let Time_Before = "";//时间描述(前)
					let Time_After = "";//时间描述(后)
					
					
					if("X000-Y001"==data||"X001-Y001"==data){
							//打开提示弹窗
							Hint("密码错误或账户不存在!",function(){$('#Login_From')[0].reset()});
					}else if("X001-Y002"==data){
							Hint("该用户已经登录!如不是本人操作,请前往安全中心修改密码",function(){});
					}else{
							//如果登录成功，则转至具体服务页面
						  $("body").html(data);
					}
				},
				
				error : function(e){
					alert("错误!");
				},
		});
}

//弹窗提示
function Hint(Hint_String,Hint_Event){
	//打开一个警告
	layx.open({
	    id: "Warring_Register",
			type: "html",
	    content: Hint_String,
			position: "ct",
			
			width:300,
			height:300,
			shadable:true,//遮蔽屏幕
			autodestroy:4000,//结束的时间
			alwaysOnTop:true,
			//界面图片
			icon: '<img src="images/logo/GlimmerIco.ico" width="25px" height="25px" style="top: 0px;left: 0px;position: absolute;"/>',
			title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Glimmer《微光》',
			//结束时间的样式
			autodestroyText:`<div style="padding: 0 8px;background-color: #ffffff;"><strong>{second}</strong>秒后关闭</div>`,
			//结束事件
			event: {
	          ondestroy: {
	                after: Hint_Event
	          }
	    }
	})
}


//模板
// $('#Register_Button').click(function(){
// 	$.ajax({//向服务器发出请求的方法
// 			method:"post",
// 			url:"users/Register",//路由路径
// 			data:$('#Register_From').serialize(),
						
// 			success:function(data){
			
// 			},
			
// 			error : function(e){

// 			},
// 	});
// })
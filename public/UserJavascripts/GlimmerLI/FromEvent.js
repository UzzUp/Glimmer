//设置增加的数量
const Add_Number = 20;

//客户端登录请求
$('#Login_Button').click(function(){
		//查看用户是否勾选安全协议
		if($("#Sefa_OFF_Tow").is(':checked')){
				//请求登录事件
				Login_Res("Login_From");
		}else{
				LoginHint("请勾选微光游戏安全协议。",function(){});
		}
})

//验证请求与输入提示
//用户名验证请求
$('#Account_test')
.focus(function(){
	var that = this;
	layer.tips('用户名是登录的凭证！因此我们会验证它的唯一性。', that,{
		tips: 1
	});
})
.blur(function(){
		axios({
				method: 'get',
				url: '/users/AccountTest?Account='+$("#Account_test").val(),
		})
		.then(function (response) {
			if("X000-Y001"==response.data){
				//打开提示弹窗
				LoginHint("该账户已被注册,如果喜欢的名字被占用了,使用一些有个性的后缀如何？",function(){
					$('#Account_test').focus()
				});
				SetSchedule()
			}else if("X000-Y000"==response.data){
				SetSchedule()
			}
		})
		.catch(function (error) {
			console.log(error);
		});
})
//用户名验证与提示
$('#Name_test')
.focus(function(){
	var that = this;
	layer.tips('有取名困难症？试试你宠物的名字如何？', that,{
		tips: 1
	});
})
.blur(function(){
	if($('#Name_test').val() == ""){
		SetSchedule()
	}else{
		SetSchedule()
	}
})
//用户名验证与提示
$('#Password_test')
.focus(function(){
	var that = this;
	layer.tips('密码为8-16个字符,至少1个字母和1个数字,不含中文,越复杂的密码安全性越高！', that,{
		tips: 1
	});
})
.blur(function(){
	if($('#Password_test').val() == ""){
		SetSchedule()
		LoginHint("密码不能为空,请输入密码。",function(){
			$('#Password_test').focus()
		});
	}else{
		if( /^(?=.*[A-Za-z])(?=.*\d)[^\u4e00-\u9fa5][^]{8,14}$/.test(this.value)){
			SetSchedule()
		}else{
			SetSchedule()
			LoginHint("密码需要8-16个字符,1个字母和1个数字,不含中文,请重试。",function(){
				$('#Password_test').val("");
				$('#Password_test').focus()
			});
		}
	}
})
//选择安全策略提示与验证
$('#Sefa_OFF').click(function(){
	if($("#Sefa_OFF").is(':checked')){
		SetSchedule()
		var that = this;
		layer.tips('勾选此项代表您同意我们的安全策略。', that,{
			tips: 1
		});
	}else{
		SetSchedule()
	}
})




//客户端注册请求
$('#Register_Button').click(function(){
	if(Schedule_Length==100){
		axios.post("users/Register",$('#Register_From').serialize())
		.then(function (response) {
			Login_Res("Register_From");
		})
		.catch(function (error) {
			console.log(error);
		});
	}else{
		//打开提示弹窗
		LoginHint("注册失败！注册列表所有项都为必填项,请仔细审阅。",function(){});
	}	
})

//进度条的长度
var Schedule_Length = 0;
//根据增加的量变换进度条的样式(收集注册表单的完成度)
function SetSchedule(){
	//获取表单的数据集合
	let Register_From = $('#Register_From').serialize()
	//初始化进度条的长度
	Schedule_Length = 0
	
	//查看用户输入情况
	Register_From = Register_From.split("&")
	for(let obj of Register_From){
		if((obj.split("="))[1] != ""){
			Schedule_Length+=20
		}
	}
	
	//查看用户勾选情况
	if($("#Sefa_OFF").is(':checked')){
			Schedule_Length+=20
	}
		
		//根据进度条设置颜色
		$("#schedule").get(0).style.width = Schedule_Length+"%"
		if(Schedule_Length<30){
			$("#schedule").get(0).style.backgroundColor = "#ff5500"
		}else if(Schedule_Length<60){
			$("#schedule").get(0).style.backgroundColor = "#ffff00"
		}else if(Schedule_Length<90){
			$("#schedule").get(0).style.backgroundColor = "#55aaff"
		}else{
			$("#schedule").get(0).style.backgroundColor = "#1aff1a"
		}
}

//登录请求
function Login_Res(ElementID){
	axios.post("users/Login",$('#'+ElementID).serialize())
	.then(function (response) {
		let Event = "";//结束事件
		let Time_Before = "";//时间描述(前)
		let Time_After = "";//时间描述(后)
		
		if("X000-Y001"==response.data||"X001-Y001"==response.data){
				//打开提示弹窗
				LoginHint("密码错误或账户不存在!",function(){
					//清除密码输入
					$("#Password").val("");
					$('#Password').focus()
				});
		}else if("X001-Y002"==response.data){
				LoginHint("该用户已经登录!如不是本人操作,请前往安全中心修改密码",function(){});
		}else{
				//如果登录成功，则转至具体服务页面
			  $("body").html(response.data);
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}


//登录信息提示
function LoginHint(HintString,HintFunction){
	layer.msg(HintString, {
		anim: 6,//设置动画样式
		id:"Hint",
		time: 1000*2,
		offset: ['40%','30%'],//设置位置
		shade:[0.8, '#bcbcbc'],//设置遮盖
	},
		HintFunction
	);
}
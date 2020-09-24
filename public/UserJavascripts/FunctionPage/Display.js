			//处理Vue以及Socketio
			let MessageList = new SliderLine("MessageList",50)
			let Friend_List = new SliderLine("Friend_List")
			
			
			//Vue数据绑定
			//用户信息框的动态绑定
			let Message_frame = new Vue({
				el:"#User_Message",
				data:{
					UserName : UserName,
					HeadImage : HeadImage,
					isShow: false,
					city: '深圳',
					weatherList: [],
					c_wendu: '',
					c_ganmao: '',
					cityName: '',
					cityShow: false,
					city_names: [
					    '北京', '天津', '上海', '重庆', '河北', '石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水',
					    '山西', '太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁',
					    '内蒙古', '呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '兴安盟', '锡林郭勒', '阿拉善盟',
					    '辽宁', '沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛',
					    '吉林', '长春', '四平', '辽源', '通化', '白山', '松原', '白城', '延边',
					    '黑龙江', '哈尔滨', '齐齐哈尔', '鸡西', '鹤岗', '双鸭山', '大庆', '伊春', '佳木斯', '七台河', '牡丹江', '黑河', '绥化', '大兴安岭',
					    '江苏', '南京', '无锡', '徐州', '苏州', '南通', '连云港', '淮安', '盐城', '扬州', '镇江', '泰州', '宿迁',
					    '浙江', '杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水',
					    '安徽', '合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '六安', '亳州', '池州', '宣城',
					    '福建', '福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德',
					    '江西', '南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶',
					    '山东', '济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '临沂', '聊城', '滨州', '菏泽',
					    '河南', '郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店', '济源',
					    '湖北', '武汉', '黄石', '十堰', '宜昌', '襄阳', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '随州', '恩施', '仙桃', '潜江', '天门', '神农架',
					    '湖南', '长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西',
					    '广东', '广州', '韶关', '深圳', '珠海', '汕头', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '东沙', '潮州', '揭阳', '云浮',
					    '广西', '南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左',
					    '海南', '海口', '三亚', '三沙', '儋州', '五指山', '琼海', '文昌', '万宁', '东方', '定安', '屯昌', '澄迈', '临高', '白沙', '昌江', '乐东', '陵水', '保亭', '琼中',
					    '四川', '成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝', '甘孜', '凉山',
					    '贵州', '贵阳', '六盘水', '遵义', '安顺', '毕节', '铜仁', '黔西南', '黔东南', '黔南',
					    '云南', '昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '楚雄', '红河', '文山', '西双版纳', '大理', '德宏', '怒江', '迪庆',
					    '西藏', '拉萨', '日喀则', '昌都', '山南', '那曲', '阿里',
					    '陕西', '西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛',
					    '甘肃', '兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '张掖', '平凉', '酒泉', '庆阳', '定西', '陇南', '陇南', '临夏', '甘南',
					    '青海', '西宁', '海东', '海北', '黄南', '海南', '果洛', '玉树', '海西',
					    '宁夏', '银川', '石嘴山', '吴忠', '固原', '中卫',
					    '新疆', '乌鲁木齐', '克拉玛依', '吐鲁番', '哈密', '昌吉', '博尔塔拉', '巴音郭楞', '阿克苏', '克州', '喀什', '和田', '伊犁', '塔城', '阿勒泰', '石河子', '阿拉尔', '图木舒克', '五家渠', '北屯', '铁门关', '双河', '可克达拉', '昆玉',
					    '台湾', '高雄', '台中', '台北',
					    '香港',
					    '澳门'
					],
					c_isshoweather: true,
					c_value: []
				},
				computed:{
					ShowName : function(){//设置显现的名字的样式
						return (this.UserName).length>6?(this.UserName).substring(0,5)+"..":this.UserName
					},
					ShowHead : function(){//头像的显示路径
						return this.HeadImage
					}
				},
				mounted() {
				    this.searchweather();
				    // setInterval(() => {
				    //     this.searchweather();
				    // }, 5000)
				
				},
				methods: {
				    c_search() {
				        this.isShow = !this.isShow;
				    },
				    searchweather: function () {
				        // console.log('天气查询');
				        // console.log(this.city);
				        let that = this;
				        axios.get('http://139.9.60.105:10233/weather?city=' + this.city)
				            .then(function (response) {
				                // console.log(response.data.results[0].daily);
				                that.weatherList = response.data.results[0].daily;
				
				            })
				            .catch(function (err) {
				                console.log(err);
				            });
				        axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.city)
				            .then(function (response) {
				                that.c_wendu = response.data.data.wendu;
				                that.c_ganmao = response.data.data.ganmao;
				
				            })
				            .catch(function (err) {
				                console.log(err);
				            })
				    },
				
				    getWeatherType(weather) {
				        // console.log(weather)
				        switch (weather) {
				            case '晴':
				                return 'icon-d-qing'
				            case '多云':
				                return 'icon-d-duoyun'
				            case '阴':
				                return 'icon-d-yin'
				            case '阵雨':
				                return 'icon-d-zhenyu'
				            case '雷阵雨':
				                return 'icon-d-leizhenyu'
				            case '小雨':
				                return 'icon-d-xiaoyu'
				            case '中雨':
				                return 'icon-d-zhongyu'
				            case '大雨':
				                return 'icon-d-dayu'
				            case '暴雨':
				                return 'icon-d-baoyu'
				            case '大暴雨':
				                return 'icon-d-dabaoyu'
				            case '特大暴雨':
				                return 'icon-d-tedabaoyu'
				            case '小雪':
				                return 'icon-d-xiaoxue'
				            case '中雪':
				                return 'icon-d-zhongxue'
				            case '大雪':
				                return 'icon-d-daxue'
				            default:
				                return 'icon-weizhi'
				        }
				    },
				    c_bg(weather) {
				        switch (weather) {
				            case '晴':
				                return 'c_sunny'
				            case '多云':
				                return 'c_cloud'
				            case '阴':
				                return 'c-yin'
				            case '阵雨':
				            case '雷阵雨':
				                return 'c_lei'
				            case '小雨':
				            case '中雨':
				            case '大雨':
				            case '暴雨':
				            case '大暴雨':
				            case '特大暴雨':
				                return 'c_rain'
				            case '小雪':
				            case '中雪':
				            case '大雪':
				                return 'c_snow'
				            default:
				                return ''
				        }
				    },
				    changeCity() {
				        for (let i = 0; i < this.city_names.length; i++) {
				            if (this.cityName == this.city_names[i]) {
				                this.city = this.cityName;
				                this.cityShow = !this.cityShow;
				                this.searchweather();
				                this.cityName = '';
				                return;
				            }
				        }
				        layer.msg('输入城市有误或暂未收入该城市', {
				            icon: 5,
				            anim: 6,
				
				
				        });
				    },
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
						c_setshow: false,
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
					c_about() {
					    layer.open({
					        type: 1,
					        skin: 'demo-class',
					        maxmin: true,
					        title: '\<\span><img src="/images/logo/GlimmerIco.ico" width="25" height="25" style="margin:0 5px 4px 0;" alt="">关于微光\<\/span>',
					        area: ['400px', '500px'],
					        shadeClose: true, //点击遮罩关闭
					        content: '\<\div style="padding:20px;"><p style="text-align: center;"><img src="/images/logo/Glimmer.png" width="200" height="200"></p><p style=" font-weight: 700;">微光0.0.3（1314）</p><p>前端班第四组 版权所有</p><p>Copyright&copy; 2020 Tencent. All Rights Reserved.</p><p><span style=" font-weight: 700;">GlimmerGame[微光游戏]</span>，是从登陆注册，到服务大厅，乃至具体游戏的一体化网站,本网站包含聊天室、社交论坛、游戏等功能，最后，它拥有属于它的一套游戏编辑标准以及框架。</p>\<\/div>'
					    });
					},
					c_update() {
					    layer.open({
					        type: 1,
					        skin: 'demo-class1',
					        maxmin: true,
					        title: '\<\span><img src="/images/logo/GlimmerIco.ico" width="25" height="25" style="margin:0 5px 4px 0;" alt="">微光\<\/span>',
					        area: ['500px', '350px'],
					        shadeClose: true, //点击遮罩关闭
					        content: '\<\div style="padding:20px;"><p style="text-align: center;"><img src="/images/logo/Glimmer.png" width="180" height="180"></p><p style="text-align: center;    ">版本号：0.0.3（1314）</p><p style="text-align: center;font-size: 16px;">恭喜你！你的微光版本已经是最新版哦！</p>\<\/div>'
					    });
					},
					c_theme() {
					
					},
					c_set() {
					    this.c_setshow = !this.c_setshow;
					},
				}
			})
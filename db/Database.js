let db = require('mysql')

let Connect = db.createConnection({
	host			:'127.0.0.1',
	user  		:'root',
	password	:'19980806',
	database	:'bokedata'
})

Connect.connect()

// 测试
// Connect.query("select * from Userlist",function(err,rls){
// 	if(err){
// 		console.log(err)
// 	}
// 	console.log(rls)
// })

module.exports = Connect
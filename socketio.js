let socketio = {};
let socket_io = require('socket.io'); 
let http = require('http');


let Client_io = socket_io.listen(http.createServer(()=>{}).listen(3100)); 

module.exports = {
		Client_io : Client_io,
};
## websockets介绍
websockets这个新协议为客户端提供了一个更快、更有效的通信线路。像HTTP一样，websockets运行在TCP连接之上，但是它们更快，因为我们不必每次都打开一个新的连接来发送消息，因为只要服务器或客户端想要，连接就会一直保持活跃。  
更好的是，由于连接永远不会中断，我们终于可以使用全双工通信，这意味着我们可以将数据推送到客户机，而不必等待它们从服务器请求数据。这允许数据来回通信，这对于实时聊天应用程序，甚至是游戏都是非常理想的。

## 实例
```
var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');

/*
And connect with a tcp client from the command line using netcat, the *nix 
utility for reading and writing across tcp/udp network connections.  I've only 
used it for debugging myself.
$ netcat 127.0.0.1 1337
You should see:
> Echo server
*/

/* Or use this example tcp client written in node.js.  (Originated with 
example code from 
http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */

var net = require('net');

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});
```

https://gist.github.com/tedmiston/5935757

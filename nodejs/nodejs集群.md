
## nodejs集群
单个 Node.js 实例运行在单个线程中。 为了充分利用多核系统，有时需要启用一组 Node.js 进程去处理负载任务。

### 集群中的Master  
现在让我们详细了解Master的职责。  
- Fork/Spawn Worker: Master负责创建你需要的Worker进程，但是你不能创建超过特定系统中可用的CPU内核数量的进程。  
换句话说，最大worker的数量应该等于CPU核心i的数量。如果它是双核CPU，那么你应该fork最多2个工作进程。使用cluster.fork() API创建新的工作进程。  
当新的worker准备好时，集群将发出在线事件，这样我们就可以使用集群了。在('online'， ()=>{}) API上知道worker什么时候可以工作。  

- 重新fork/重新生成Worker:因为Worker进程可以在任何时间以任何原因被杀死。每当任何一个worker被杀死时，集群都会发出一个退出事件，因此我们应该使用API cluster.on('exit'，())在一个旧worker死亡时重新生成新的worker。 

- 负载平衡:这是由node.js自动完成的，所以我们不需要编写任何逻辑来实现。主进程Master负责以有效的方式将传入的连接/请求分发给它的Worker进程。  

实例：
```
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);

  // 衍生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
} else {
  // 工作进程可以共享任何 TCP 连接。
  // 在本例子中，共享的是 HTTP 服务器。
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('你好世界\n');
  }).listen(8000);

  console.log(`工作进程 ${process.pid} 已启动`);
}
```

## 在集群通信IPC
js集群模块提供了一些IPC API，通过这些API主进程可以和工作进程对话，反之亦然。您可以使用名为process.send()的方法从一个进程向其他进程发送消息，并使用事件侦听器API进程从一个进程接收消息到其他进程。(“消息”,()= > {})
```
if (cluster.isMaster) {
  clustor.on("message", (worker, msg) => {
    console.log(`message ${msg} recieved from worker`)
  })
  const worker = cluster.fork()
  worker.send("hello worker")
} else if (cluster.isWorker) {
  process.on("message", msg => {
    console.log(`message ${msg} recieved from master`)
    process.send("hello master")
  })
}
```

参考：  
https://www.sysleaf.com/nodejs-cluster/

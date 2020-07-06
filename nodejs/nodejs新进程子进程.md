
## 获取进程相关的基本信息
```
#!/bin/env node
console.log (process.execPath)
console.log (process.cwd())
console.log (process.pid)
let user = process.env.USER || ""
console.log (user)

process.on('exit', function () {
　　console.log('Bye.');
});

process.on('uncaughtException', function (err) {
　　console.log('Caught exception: ' + err);
});
```

## 启动进程的各种方法的比较
- child_process.spawn() 方法会异步地衍生子进程，且不阻塞 Node.js 事件循环。 child_process.spawnSync() 函数则以同步的方式提供了等效的功能，但会阻塞事件循环直到衍生的进程退出或被终止。
- child_process.exec(): 衍生 shell 并且在 shell 中运行命令，当完成时则将 stdout 和 stderr 传给回调函数。
- child_process.execFile(): 类似于 child_process.exec()，但是默认情况下它会直接衍生命令而不先衍生 shell，由于没有衍生 shell，因此不支持 I/O 重定向和文件通配等行为。
- child_process.fork(): 衍生新的 Node.js 进程，并调用指定的模块，该模块已建立了 IPC 通信通道，可以在父进程与子进程之间发送消息。
- child_process.execSync(): child_process.exec() 的同步版本，会阻塞 Node.js 事件循环。
- child_process.execFileSync(): child_process.execFile() 的同步版本，会阻塞 Node.js 事件循环。


## 以非常精细的方式运行 ps ax | grep ssh
  
```
const { spawn } = require('child_process');
const ps = spawn('ps', ['ax']);
const grep = spawn('grep', ['ssh']);

ps.stdout.on('data', (data) => {
  grep.stdin.write(data);
});

ps.stderr.on('data', (data) => {
  console.error(`ps 的 stderr: ${data}`);
});

ps.on('close', (code) => {
  if (code !== 0) {
    console.log(`ps 进程退出，退出码 ${code}`);
  }
  grep.stdin.end();
});

grep.stdout.on('data', (data) => {
  console.log(data.toString());
});

grep.stderr.on('data', (data) => {
  console.error(`grep 的 stderr: ${data}`);
});

grep.on('close', (code) => {
  if (code !== 0) {
    console.log(`grep 进程退出，退出码 ${code}`);
  }
});

//-------------------------------------
const { spawn } = require('child_process');
const grep = spawn('grep', ['ssh']);

grep.on('close', (code, signal) => {
  console.log(`子进程因收到信号 ${signal} 而终止`);
});

// 发送 SIGHUP 到进程。
grep.kill('SIGHUP');
```

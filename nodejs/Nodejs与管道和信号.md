## Nodejs与管道

Linux的其中一个设计哲学就是小而精，一个程序只做一件事情，然后通过管道将多个程序连接起来完成复杂的任务。  
比如如下的命令：  
ps -ef | grep node  
cat aaa.txt | grep bbb | cut -d' ' -f3 | sort | uniq |wc -l  

我们来看看nodejs中如何支持管道：  
yourscript.js
```
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data) {
  process.stdout.write(data);
});
```
然后运行如下测试：   
echo 'foo' | ./yourscript

## Nodejs与信号
作为完整健壮的程序，需要支持常见的中断退出信号，使得程序能够正确的响应用户和正确的清理退出。
```
process.stdin.resume();

process.on('SIGINT', function () {
  console.log('Got a SIGINT. can show detail status');
});

process.on('SIGTERM', function () {
  console.log('Got a SIGTERM. exit with cleanup');
  process.exit(0);
});
```
可以通过下面的命令来测试是否正确工作：  
kill -s SIGINT [process_id]   
kill -s SIGTERM [process_id]    

常见的信号如下：
### SIGHUP
本信号在用户终端连接(正常或非正常)结束时发出, 通常是在终端的控制进程结束时, 通知同一session内的各个作业, 这时它们与控制终端不再关联。

登录Linux时，系统会分配给登录用户一个终端(Session)。在这个终端运行的所有程序，包括前台进程组和后台进程组，一般都属于这个Session。当用户退出Linux登录时，前台进程组和后台有对终端输出的进程将会收到SIGHUP信号。这个信号的默认操作为终止进程，因此前台进程组和后台有终端输出的进程就会中止。不过可以捕获这个信号，比如wget能捕获SIGHUP信号，并忽略它，这样就算退出了Linux登录，wget也能继续下载。

### SIGINT
程序终止(interrupt)信号, 在用户键入INTR字符(通常是Ctrl-C)时发出，用于通知前台进程组终止进程。

### SIGQUIT
和SIGINT类似, 但由QUIT字符(通常是Ctrl-/)来控制. 进程在因收到SIGQUIT退出时会产生core文件, 在这个意义上类似于一个程序错误信号。

### SIGKILL
用来立即结束程序的运行. 本信号不能被阻塞、处理和忽略。如果管理员发现某个进程终止不了，可尝试发送这个信号。

参考：  
https://shapeshed.com/command-line-utilities-with-nodejs/

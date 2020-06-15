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

参考：  
https://shapeshed.com/command-line-utilities-with-nodejs/

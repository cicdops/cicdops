## 为什么使用nodejs实现命令行工具
Node.js是一个基于事件驱动I/O的JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。  
众所周知，javascript已经成为最流行的编程语言，以前javascript只是用来实现web前端功能，但是nodejs的出现使得javascript不仅可以服务于web的后端，还能够作为通用的脚本语言，类似python/perl一样，实现更多的桌面相关的任务。  

nodejs除了于web框架一起实现web后端的功能，作为devops我们可以使用nodejs做很多其他的事情：
- 遍历目录，读写json和yaml配置文件；
- 异步执行，或者多进程调用外部系统命令；
- http请求，解析，或者生成web；
- 查询数据库mango，redis，其他数据库；
- 解析日志，监听问题，发送邮件；

## 安装nodejs
```
wget https://nodejs.org/dist/v12.18.0/node-v12.18.0-linux-x64.tar.xz
tar -xvf   node-v12.18.0-linux-x64.tar.xz   
mv node-v12.18.0-linux-x64  nodejs 
ln -s /app/software/nodejs/bin/npm /usr/local/bin/ 
ln -s /app/software/nodejs/bin/node /usr/local/bin/  
国内用户使用淘宝镜像：  
npm install -g cnpm --registry=https://registry.npm.taobao.org
然后使用cnpm来安装其他的模块
```

## 实现第一个helloworld的命令
```
#!/usr/bin/env node
console.log('hello world');
增加权限
chmod u+x yourscript  
运行./yourscript  
hello world
```

## 简单的脚本参数解析
```
process.argv中包含了所有的参数  
脚本中增加输入来查看参数：console.log(process.argv)  
执行脚本：./yourscript -g -f   
输出为：[ 'node', '/home/george/yourscript', '-f', '-g' ]  
```


## 程序的退出
```
if (err) {
  process.exit(1);
} else {
  process.exit(0);
}
```


## 将命令行工具打包为可安装的npm包
```
生成package.json：npm init
修改package.json：
  "name": "helloworld”，
  "author": "cicdops",
  "license": "Apache-2.0",
+ "bin": {
+   "helloworld": "./index.js"
+ }

本地安装：
npm install -g
$ helloworld
Hello, world!
其他人可以通过命令安装：npm install -g helloworld
```


## 参考：
https://blog.developer.atlassian.com/scripting-with-node/  
https://shapeshed.com/command-line-utilities-with-nodejs/  

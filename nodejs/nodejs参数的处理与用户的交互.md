## 解析脚本参数
作为脚本或者命令行工具，一般都需要支持不同的用户参数。默认参数被保存在process.argv的数组中，如下：
[ nodeBinary, script, arg0, arg1, ... ]

## 模块commander
但是为了更方便地处理参数，我们可以使用第三方模块commander。安装如下：  
npm install --save commander  

然后我们可以使用commander如下：
```
#!/usr/bin/env node
- console.log('Hello, world!');
+ var program = require('commander');
+
+ program
+  .arguments('<file>')
+  .option('-u, --username <username>', 'The user to authenticate as')
+  .option('-p, --password <password>', 'The user's password')
+  .action(function(file) {
+    console.log('user: %s pass: %s file: %s',
+        program.username, program.password, file);
+  })
+  .parse(process.argv);
```

运行和结果如下：
```
snippet -u kannonboy -p correcthorsebatterystaple my_awesome_file
user: kannonboy pass: correcthorsebatterystaple file: my_awesome_file
```
默认的帮助已经被自动生成了，如下：
```
snippet --help
  Usage: snippet [options] <file>
  Options:
    -h, --help                 output usage information
    -u, --username <username>  The user to authenticate as
    -p, --password <password>  The user's password
```


## 用户的交互
可以使用内置的process.stdin来处理，

但是可以使用第三方模块co-prompt，安装如下：  
npm install --save co co-prompt

修改上面的如下：
```
+ var co = require('co');
+ var prompt = require('co-prompt');
  var program = require('commander');
...
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', 'The user's password')
  .action(function(file) {
+    co(function *() {
+      var username = yield prompt('username: ');
+      var password = yield prompt.password('password: ');
       console.log('user: %s pass: %s file: %s',
-          program.username, program.password, file);
+          username, password, file);
+    });
  })
```
然后运行：
```
snippet my_awesome_file
username: kannonboy
password: *************************
user: kannonboy pass: correcthorsebatterystaple file: my_awesome_file
```

参考：
https://blog.developer.atlassian.com/scripting-with-node/

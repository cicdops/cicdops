## Nodejs为终端字符增加样式
只有黑白的色调对于比较复杂的命令行程序来说就显得太单调了，我们可以为命令行程序增加样式使得程序更加友好！

安装package： npm install -S chalk
```
#!/bin/env node

const chalk = require('chalk');
const log = console.log;

// Pass in multiple arguments
log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// Nest styles
log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);


const error = chalk.bold.red;
const warning = chalk.keyword('orange');

console.log(error('Error!'));
console.log(warning('Warning!'));
```

## 为长时间任务增加进度显示

progress是当前最流行的用于渲染进度条的npm包。  
```
var ProgressBar = require('progress');

var bar = new ProgressBar(':bar :current/:total', { total: 10 });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  } else if (bar.curr === 5) {
      bar.interrupt('this message appears above the progress bar\ncurrent progress is ' + bar.curr + '/' + bar.total);
  }
}, 1000);
```
输出：  
this message appears above the progress bar  
current progress is 5/10  
========== 10/10  

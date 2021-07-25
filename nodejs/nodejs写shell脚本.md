google开源了最新的package，使得在nodejs中更容易调用shell命令。

```
#!/usr/bin/env zx

//from https://github.com/google/zx

$.shell = '/usr/bin/bash'
$.verbose = true
process.stdin.isTTY = false //fix for input issue

//set env variable
process.env.FOO = 'bar'
await $`echo $FOO`

//print in js
console.log(`${__dirname} : ${__filename}` );
console.log(chalk.blue('Hello world!'))

//var
let d = await $`date`
console.log(chalk.red(d))

//this is good for parallel
await Promise.all([
  $`sleep 1; echo 1`,
  $`sleep 2; echo 2`,
  $`sleep 3; echo 3`
])

//use packages fs,os,chalk,minimist...
//let content = await fs.readFile('./package.json')
await $`cd ${os.homedir()}/work/zx && pwd`

cd('/tmp')
await $`pwd` // outputs /tmp
cd(`${os.homedir()}/work/zx`)

//sleep
//await sleep(1000)

//pipe
await $`cat file.txt`.pipe($`wc -l`)

//nothrow and exitCode
//await $`grep something from-file`
await nothrow($`grep something from-file`)
if ((await nothrow($`[[ -d /u/xhzhu/work ]]`)).exitCode == 0) {
  console.log('dir is exist')
}

//question
let bear = await question('What kind of bear is best? ')
//console.log(bear)

//let token = await question('Choose env variable: ', {
//       choices: Object.keys(process.env) })

//fetch
let resp = ''
try{
 resp = await fetch('https://www.baidu.com')
 if (resp.ok) {console.log(await resp.text())}
}catch{
 console.log('fetch error')
}
```

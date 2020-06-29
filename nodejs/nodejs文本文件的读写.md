## 文本文件的换行符

方法一：   
    var EOL = fileContents.indexOf("\r\n") >= 0 ? "\r\n" : "\n";  

方法二：   
    var EOL = (process.platform === 'win32' ? '\r\n' : '\n')  

## 删除文件
```
var fs = require("fs");

console.log("Going to delete an existing file");
fs.unlink('input.txt', function(err) {
   if (err) {
      return console.error(err);
   }
   console.log("File deleted successfully!");
});
```

## 小文件的异步与同步读写
```
var fs = require("fs");

console.log("Going to write into existing file");
fs.writeFile('input.txt', 'Simply Easy Learning!', function(err) {
   if (err) {
      return console.error(err);
   }
   
   console.log("Data written successfully!");
   console.log("Let's read newly written data");
   
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("Asynchronous read: " + data.toString());
   });
});

同步和异步的对比：
var fs = require("fs");

// Asynchronous read
fs.readFile('input.txt', function (err, data) {
   if (err) {
      return console.error(err);
   }
   console.log("Asynchronous read: " + data.toString());
});

// Synchronous read
var data = fs.readFileSync('input.txt');
console.log("Synchronous read: " + data.toString());

console.log("Program Ended");
```

## 读写大文件
```
var fs = require("fs");
var data = '';

// Create a readable stream
var readerStream = fs.createReadStream('input.txt');

// Set the encoding to be utf8. 
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function() {
   console.log(data);
});

readerStream.on('error', function(err) {
   console.log(err.stack);
});

console.log("Program Ended");
输出如下：
Program Ended
Tutorials Point is giving self learning content
to teach the world in simple and easy way!!!!!
```

## 使用async/await
```
const fs = require('fs').promises;

try {
  const data = await fs.readFile('file1.js'); // need to be in an async function
  console.log(data); // the contents of file1.js
} catch (error) {
  console.log(error)
}

const data = "Hello my name is Hugo, I'm using the new fs promises API";

try {
  await fs.writeFile('file1.txt', data); // need to be in an async function
} catch (error) {
  console.log(error)
}
```

## 路径相关函数
```
path.basename('/foo/bar/baz/asdf/quux.html');
// Returns: 'quux.html'
path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// Returns: 'quux'

path.dirname('/foo/bar/baz/asdf/quux');
// Returns: '/foo/bar/baz/asdf'

A TypeError is thrown if path is not a string.


path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'
path.join('foo', {}, 'bar');
// Throws 'TypeError: Path must be a string. Received {}'

For example, on POSIX:
'foo/bar/baz'.split(path.sep);
// Returns: ['foo', 'bar', 'baz']

On Windows:
'foo\\bar\\baz'.split(path.sep);
// Returns: ['foo', 'bar', 'baz']
```

## 创建目录和删除目录
```
var fs = require("fs");

console.log("Going to create directory /tmp/test");
fs.mkdir('/tmp/test',function(err) {
   if (err) {
      return console.error(err);
   }
   console.log("Directory created successfully!");
});

fs.rmdir(path, callback)
```

## 遍历目录文件的方法
```
传统的同步方法：
// sync version
function walkSync(currentDirPath, callback) {
    var fs = require('fs'),
        path = require('path');
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}
walkSync('path/to/root/dir', function(filePath, stat) {
    // do something with "filePath"...
});

异步方法：
// async version with basic error handling
function walk(currentDirPath, callback) {
    var fs = require('fs'),
        path = require('path');
    fs.readdir(currentDirPath, function (err, files) {
        if (err) {
            throw new Error(err);
        }
        files.forEach(function (name) {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                walk(filePath, callback);
            }
        });
    });
}
walk('path/to/root/dir', function(filePath, stat) {
    // do something with "filePath"...
});
```

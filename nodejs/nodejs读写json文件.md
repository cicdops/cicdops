
## 读json文件
```
'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('student.json');
let student = JSON.parse(rawdata);
console.log(student);

写json文件：
'use strict';

const fs = require('fs');

let student = { 
    name: 'Mike',
    age: 23, 
    gender: 'Male',
    department: 'English',
    car: 'Honda' 
};
 
let data = JSON.stringify(student);
fs.writeFileSync('student-2.json', data);
```

虽然这是我们想要写入的数据，但数据是一行字符串的形式，这对我们来说很难读取。
如果您希望序列化的JSON是人类可读的，那么更改JSON。Stringify函数:
let data = JSON.stringify(student, null, 2);

## json 转为 csv
```
// require json-2-csv module
const converter = require('json-2-csv');
const fs = require('fs');

// read JSON from a file
const todos = JSON.parse(fs.readFileSync('todos.json'));

// convert JSON array to CSV string
(async () => {
    try {
        const csv = await converter.json2csvAsync(todos);

        // print CSV string
        console.log(csv);

        // write CSV to a file
        fs.writeFileSync('todos.csv', csv);

    } catch (err) {
        console.log(err);
    }
})();
```

## csv转为json
```
csv第一行为key，例如：  id,name,email,country,age
// require csvtojson module
const CSVToJSON = require('csvtojson');

// convert users.csv file to JSON array
(async () => {
    try {
        const users = await CSVToJSON().fromFile('users.csv');

        // log the JSON array
        console.log(users);

    } catch (err) {
        console.log(err);
    }
})();
```

参考：  
https://attacomsian.com/blog/nodejs-convert-json-to-csv

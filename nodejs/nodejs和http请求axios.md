## http相关modules

- HTTP – the Standard Library
- Request
- Axios
- SuperAgent
- 推荐使用axios 或者super agent


## 使用axios和superagent的get
```
const axios = require('axios');

axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });


const superagent = require('superagent');

superagent.get('https://api.nasa.gov/planetary/apod')
.query({ api_key: 'DEMO_KEY', date: '2017-08-02' })
.end((err, res) => {
  if (err) { return console.log(err); }
  console.log(res.body.url);
  console.log(res.body.explanation);
});
```

## 使用axios的post
```
const axios = require('axios');

const data = {
    name: 'John Doe',
    job: 'Content Writer'
};

axios.post('https://reqres.in/api/users', data)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
    }).catch((err) => {
        console.error(err);
    });
    
```

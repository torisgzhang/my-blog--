const http = require('http');
const querystring = require('querystring');

//get请求
// http.createServer((req, res) => {
//   const url = req.url;
//   req.query = querystring.parse(url.split('?')[1]);
//   res.end(JSON.stringify(req.query));
// }).listen(8000, () => {
//   console.log("start at port 8000");
// })

http.createServer((req, res) => {
  res.setHeader("Content-type", "application/json");
  const { url, method } = req;
  const resData = { 
    url,
    method,
    path: url.split('?')[0],
    query: url.split('?')[1],
    data: {
      code: 200,
      data: "提交成功！"
    }
  };
  if(method === 'POST') {
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      console.log(postData)
      res.end(JSON.stringify(resData));
    });
  } else {
    res.end(JSON.stringify(resData));
  }
  
}).listen(8000, () => {
  console.log("start at port 8000");
})
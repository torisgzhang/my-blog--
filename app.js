const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');
  const url = req.url;
  //获取path
  req.path = url.split('?')[0];
  //解析query
  req.query = querystring.parse(url.split('?')[1]);

  const getPostData = (req) => {
    return new Promise((resolve, reject) => {
      if(req.method !== 'POST') {
        resolve({});
        return;
      }
      if(req.headers['content-type'] !== 'application/json') {
        resolve({});
        return;
      }
      let postData = '';
      req.on('data', chunk => {
        postData += chunk.toString();
      });
      req.on('end', () => {
        if(!postData) {
          resolve({});
          return;
        }
        resolve(JSON.parse(postData));
      })
    });
  }

  getPostData(req).then(postData => {
    //把post参数postData放入req.body中 后面需要都可以从这里获取
    req.body = postData;
    //blog路由
    const blogData = handleBlogRouter(req, res);
    if(blogData) {
      res.end(
        JSON.stringify(blogData)
      );
      return;
    }
    //user路由
    const userData = handleUserRouter(req, res);
    if(userData) {
      res.end(
        JSON.stringify(userData)
      );
      return;
    }
    //404 路由
    res.writeHead(404, {'Content-type': 'text/plain'});
    res.write("404 Not Found\n");
    res.end();
  })
}

module.exports = serverHandle;
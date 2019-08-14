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

  //解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach(item => {
    if(!item) {
      return;
    }
    const arr = item.split('=');
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });

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
    const blogResult = handleBlogRouter(req, res);
    if(blogResult) {
      blogResult.then(blogData => {
        res.end(
          JSON.stringify(blogData)
        );
      });
      return;
    }

    //user路由
    const userResult = handleUserRouter(req, res);
    if(userResult) {
      userResult.then(userInfo => {
        res.end(
          JSON.stringify(userInfo)
        );
      });
      return;
    }
   
    //404 路由
    res.writeHead(404, {'Content-type': 'text/plain'});
    res.write("404 Not Found\n");
    res.end();
  })
}

module.exports = serverHandle;
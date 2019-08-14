const querystring = require('querystring');
const { set, get } = require('./src/db/redis');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
}
// const SESSION_DATA = {};
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

  // //解析session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if(!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    set(userId, {});
  }
  req.sessionId = userId;

  get(req.sessionId).then(sessionData => {
    if(sessionData == null) {
      set(req.sessionId, {});
      req.session = {};
    } else {
      req.session = sessionData;
    }
    // 处理 post data
    return getPostData(req)
  }).then(postData => {
    //把post参数postData放入req.body中 后面需要都可以从这里获取
    req.body = postData;
    //blog路由
    const blogResult = handleBlogRouter(req, res);
    if(blogResult) {
      blogResult.then(blogData => {
        if(needSetCookie) {
          res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
        }
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
        if(needSetCookie) {
          res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
        }
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
  });
}

module.exports = serverHandle;
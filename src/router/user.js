const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
}

const handleUserRouter = (req, res) => {
  if(req.method === "GET" && req.path ==="/api/user/login") {
    // const { username, password } = req.body; //post
    const { username, password } = req.query;
    const resultLogin = login(username, password);
    return resultLogin.then(userInfo => {
      if(userInfo.username) {
        //操作cookie
        res.setHeader("Set-Cookie", `username=${userInfo.username}; path=/; httpOnly; expires=${getCookieExpires()}`);
        return new SuccessModel(userInfo);
      }
      return new ErrorModel("登录失败");
    });
  }
  if(req.method === "GET" && req.path ==="/api/user/login-test") {
    if(req.cookie.username) {
      return Promise.resolve(new SuccessModel({
        username: req.cookie.username
      }))
    } else {
      return Promise.resolve(new SuccessModel('尚未登录'))
    }
  }
}
module.exports = handleUserRouter;
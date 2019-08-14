const { login } = require('../controller/user');
const { set } = require('../db/redis');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  if(req.method === "POST" && req.path ==="/api/user/login") {
    const { username, password } = req.body;
    const resultLogin = login(username, password);
    return resultLogin.then(userInfo => {
      if(userInfo.username) {
        //操作cookie
        req.session.username = userInfo.username;
        req.session.realname = userInfo.realname;
        set(req.sessionId, req.session);

        return new SuccessModel(userInfo);
      }
      return new ErrorModel("登录失败");
    });
  }
}
module.exports = handleUserRouter;
const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  if(req.method === "POST" && req.path ==="/api/user/login") {
    const result = loginCheck(req.body.username, req.body.password);
    if(result) {
      return new SuccessModel('登录成功');
    } else {
      return new ErrorModel('登陆失败');
    }
  }
}
module.exports = handleUserRouter;
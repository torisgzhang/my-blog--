const {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog
}  = require('../controller/blog.js');
const { SuccessModel, ErrorModel } = require('../model/resModel');

//登录验证
const loginCheck = (req) => {
  if(!req.session.username) {
    return Promise.resolve(
      new ErrorModel("暂未登录")
    );
  }
}
const handleBlogRouter = (req, res) => {
  if(req.method === "GET" && req.path ==="/api/blog/list") {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';
    if(req.query.isadmin) {
      const loginCheckResult = loginCheck(req);
      if(loginCheckResult) {
        return loginCheckResult;
      }
      author = req.session.username;
    }
    return getList(author, keyword).then(listData => {
      return new SuccessModel(listData);
    });
  }

  if(req.method === "GET" && req.path ==="/api/blog/detail") {
    const id = req.query.id || '';
    const detailResult = getDetail(id);
    return detailResult.then(detailData => {
      return new SuccessModel(detailData);
    });
  }

  if(req.method === "POST" && req.path ==="/api/blog/add") {
    const isLogin = loginCheck(req);
    if(isLogin) { //未登录
      return isLogin;
    }
    req.body.author = req.session.username;
    const postData = req.body;
    const addResult = addBlog(postData);
    return addResult.then(val => {
      if(val) {
        return new SuccessModel(val);
      } else {
        return new ErrorModel('新建文章失败');
      }
    });
  }

  if(req.method === "POST" && req.path ==="/api/blog/update") {
    const isLogin = loginCheck(req);
    if(isLogin) { //未登录
      return isLogin;
    }
    req.body.author = req.session.username;
    const postData = req.body;
    const id = req.query.id || '';
    const resultUpdate = updateBlog(id, postData);
    return resultUpdate.then(val => {
      if(val) {
        return new SuccessModel(val);
      } else {
        return new ErrorModel('更新文章失败');
      }
    });
    
  }
  if(req.method === "POST" && req.path ==="/api/blog/del") {
    const isLogin = loginCheck(req);
    console.log(isLogin)
    if(isLogin) { //未登录
      return isLogin;
    }
    const postData = req.body;
    const id = req.query.id || '';
    const delData = delBlog(id, req.session.username);
    return delData.then(val => {
      if(val) {
        return new SuccessModel(val);
      } else {
        return new ErrorModel('删除文章失败');
      }
    });
  }
 
}
module.exports = handleBlogRouter;
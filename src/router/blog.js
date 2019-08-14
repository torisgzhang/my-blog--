const {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog
}  = require('../controller/blog.js');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {

  if(req.method === "GET" && req.path ==="/api/blog/list") {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
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
    req.body.author = 'Torisg';
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
    req.body.author = 'Torisg';
    const postData = req.body;
    const id = postData.id || '';
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
    const postData = req.body;
    const id = postData.id || '';
    const delData = delBlog(id, 'Torisg');
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
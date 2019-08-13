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
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }

  if(req.method === "GET" && req.path ==="/api/blog/detail") {
    const id = req.query.id || '';
    const detailData = getDetail(id);
    return new SuccessModel(detailData);
  }

  if(req.method === "POST" && req.path ==="/api/blog/add") {
    const postData = req.body;
    const data = addBlog(postData);
    return new SuccessModel(data);
  }
  if(req.method === "POST" && req.path ==="/api/blog/update") {
    const postData = req.body;
    const id = postData.id || '';
    const data = updateBlog(id, postData);
    return new SuccessModel(data);
  }
  if(req.method === "POST" && req.path ==="/api/blog/del") {
    const postData = req.body;
    const id = postData.id || '';
    const data = delBlog(id);
    return new SuccessModel(data);
  }
 
}
module.exports = handleBlogRouter;
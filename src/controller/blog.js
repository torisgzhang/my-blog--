const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1546610491112,
      author: '张三'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1565700737248,
      author: '李四'
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 2,
    title: '标题B',
    content: '内容B',
    createTime: 1565700737248,
    author: '李四'
  }
}

const addBlog = (postData = {}) => {
  return {
    id: 3
  }
}

const updateBlog = (id, postData = {}) => {
  return {
    id: 4,
    msg: "您修改的id是：" + id,
    msg1: "您修改的内容是：" + postData,
  }
}

const delBlog = (id) => {
  return {
    id: 5,
    msg: "您删除的id是：" + id
  }
}

module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog
}
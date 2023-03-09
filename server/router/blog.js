const express = require('express')
const router = express.Router()
// 导入博客路由处理函数模块
// const blogHandler = require('../router_handler/blog')


// // 获取博客列表
// router.post('/get', require('../service/blog/getBlog/index.js').main)

// // 获取博客详情
// router.post('/getDetail', require('../service/blog/getBlogDetail/index.js').main)

// // 添加博客
// router.post('/add', require('../service/blog/addBlog/index.js').main)

// // 修改博客
// router.post('/update', require('../service/blog/updateBlog/index.js').main)

// // //获取评论列表
// router.post('/getComment', require('../service/blog/getBlogComment/index.js').main)


// // // 删除博客到回收站
// router.post('/del', require('../service/blog/deleteBlog/index').main)

// // // 添加博客评论
// router.post('/addComment', require('../service/blog/addBlogComment/index').main)

// // // 删除评论
// router.post('/delComment', require('../service/blog/deleteBlogComment/index').main)

// // 获取点赞状态
// router.post('/getLikeList', require('../service/blog/getLikeList/index').main)
// // 改变点赞数
// router.post('/changeLikeNum', require('../service/blog/changeLikeNum/index').main)

// // 获取我的博客
// router.post('/getMy', require('../service/blog/getMyBlog/index').main)

// // 获取我赞过的博客
// router.post('/myLikeBlog', blogHandler.myLikeBlog)

// // 获取我评论过的博客
// router.post('/myCommentBlog', blogHandler.myCommentBlog)

// // 添加浏览量
// router.post('/addViews', blogHandler.addViews)

// // 获取回收站中已删除的博客
// router.post('/getDeleteBlog', blogHandler.getDeleteBlog)

// // 还原回收站中的博客
// router.post('/reductionBlog', blogHandler.reductionBlog)

// // 永久删除博客
// router.post('/shredFileBlog', blogHandler.shredFileBlog)

// // 模糊搜索
// router.post('/search', blogHandler.search)

module.exports = router
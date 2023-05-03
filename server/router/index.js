const express = require('express')
const redisClient = require("../common/redis");
const router = express.Router()

// 注册
router.post('/register', require('../service/register/index').main);
// 登录
router.post('/login', require('../service/login/index').main);
// 搜索
router.post('/search', require('../service/search/index').main);
// 获取分类标签
router.post('/tags/get', require('../service/tags/getTags/index').main);
// 发送邮箱验证码
router.post('/email/send', require('../service/email/sendEmail/index').main)


// 博客相关
// 获取博客列表
router.post('/blog/get', require('../service/blog/getBlog/index.js').main)
// 获取博客详情
router.post('/blog/getDetail', require('../service/blog/getBlogDetail/index.js').main)
// 添加博客
router.post('/blog/add', require('../service/blog/addBlog/index.js').main)
// 修改博客
router.post('/blog/update', require('../service/blog/updateBlog/index.js').main)
// 获取评论列表
router.post('/blog/getComment', require('../service/blog/getBlogComment/index.js').main)
// 删除博客到回收站
router.post('/blog/del', require('../service/blog/deleteBlog/index').main)
// 添加博客评论
router.post('/blog/addComment', require('../service/blog/addBlogComment/index').main)
// 删除评论
router.post('/blog/delComment', require('../service/blog/deleteBlogComment/index').main)
// 获取点赞列表
router.post('/blog/getLikeList', require('../service/blog/getLikeList/index').main)
// 获取喜欢状态
router.post('/blog/getLikeState', require('../service/blog/getBlogLikeState/index').main)
// 改变点赞数
router.post('/blog/changeLikeNum', require('../service/blog/changeLikeNum/index').main)
// 获取我的博客
router.post('/blog/getBlogById', require('../service/blog/getBlogById/index').main)
// 获取喜欢博客列表
router.post('/blog/getLikeBlogById', require('../service/blog/getLikeBlogById/index').main)
// 获取评论博客列表
router.post('/blog/getCommentBlogById', require('../service/blog/getCommentBlogById/index').main)
// 增加浏览量
router.post('/blog/addViews', require('../service/blog/addBlogViews/index').main)
// 模糊搜索博客
router.post('/blog/search', require('../service/blog/searchBlog/index').main)

// 用户相关
// 获取用户信息
router.post('/user/get', require('../service/user/getUserById/index').main)
// 修改用户信息
router.post('/user/update', require('../service/user/updateUserInfo/index').main)
// 修改密码
router.post('/user/updatePassword', require('../service/user/updatePassword/index').main)
// 修改邮箱
router.post('/user/updateEmail',require('../service/user/updateEmail/index').main)



// 问题
// 获取问题列表
router.post('/question/get', require('../service/question/getQuestion/index.js').main)
// 获取问题列表
router.post('/question/getById', require('../service/question/getQuestionById/index.js').main)
// 获取问题详情
router.post('/question/getDetail', require('../service/question/getQuestionDetail/index.js').main)
// 添加问题
router.post('/question/add', require('../service/question/addQuestion/index.js').main)
// 删除问题
router.post('/question/del', require('../service/question/deleteQuestion/index.js').main)
// 增加浏览量
router.post('/question/addViews', require('../service/question/addQuestionViews/index').main)
// 获取问题回答列表
router.post('/question/getAnswer', require('../service/question/getAnswer/index.js').main)
// 根据id获取用户回答问题列表
router.post('/question/getAnswerQuestionById', require('../service/question/getAnswerQuestionById/index.js').main)
// 添加回答
router.post('/question/addAnswer', require('../service/question/addAnswer/index.js').main)
// 删除回答
router.post('/question/delAnswer', require('../service/question/deleteAnswer/index.js').main)
// 搜索回答
router.post('/question/search', require('../service/question/searchQuestion/index.js').main)

// 动态
// 添加动态
router.post('/dynamic/add', require('../service/dynamic/addDynamic/index.js').main)
// 改变点赞列表
router.post('/dynamic/changeLikeList', require('../service/dynamic/changLike/index.js').main)
// 获取动态列表
router.post('/dynamic/get', require('../service/dynamic/getDynamic/index.js').main)
// 根据id获取动态列表
router.post('/dynamic/getById', require('../service/dynamic/getDynamicById/index.js').main)
// 添加动态评论
router.post('/dynamic/addComment', require('../service/dynamic/addDynamicComment/index.js').main)
// 获取动态评论
router.post('/dynamic/getComment', require('../service/dynamic/getDynamciComment/index.js').main)



// 测试
router.post('/test',(req,res)=>{

    redisClient.setex('xiaoming', 100, '3');
    return res.send('1');
})
router.post('/get',async (req, res) => {
    redisClient.get('xiaoming', (err, val) => {
        if (err) {
            console.error(err)
            return;
        }
        console.log(val);
        return res.send(val);
    })

})
module.exports = router
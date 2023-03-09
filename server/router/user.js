const express = require('express')
const router = express.Router()
const path = require('path')
// 导入用户路由处理函数模块
const userHandler = require('../service/user')

// 注册新用户
router.post('/reguser', userHandler.regUser)
// 登录
router.post('/login', userHandler.login)

// 获取用户信息
router.post('/userInfo', userHandler.userinfo)

// 修改密码
router.post('/updatePassword', userHandler.updatePSW)

// 修改手机号
router.post('/updatePhone', userHandler.updatePhone)

// 修改用户信息
router.post('/updateUserInfo', userHandler.updateUserInfo)

module.exports = router
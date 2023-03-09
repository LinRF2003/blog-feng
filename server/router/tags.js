const express = require('express')
const router = express.Router()

// 添加和修改问题
router.post('/get', require('../service/tags/getTags/index').main)


module.exports = router
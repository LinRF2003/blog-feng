const express = require('express')
const router = express.Router()
// 引入时间处理函数
const Date = require('../utils/Date')
// 引入数据库
const db = require('../db/index')

// 添加和修改动态
router.post('/addDynamic', (req, res) => {
    const user = req.user
    // 获取当前时间
    const time = Date.getNowDate()
    // 整合数据
    const data = {
        content: req.body.content,
        user_id: user.user_id,
        user_name: user.user_name,
        avatar: user.avatar,
        create_time: time,
    }

    if (req.body.dynamicId) {
        // 定义添加问题的sql语句
        const sql = `update dynamic set ? where dynamic_id = ?`
        db.query(sql, [data, req.body.dynamicId], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.send(err)
            if (results.changedRows !== 1) res.send('数据不存在，修改失败')
            res.send('修改成功')
        })
    } else {
        // 定义添加问题的sql语句
        const sql = `insert into dynamic set ?`
        db.query(sql, data, (err, result) => {
            // 执行 SQL 语句失败
            if (err) return res.send(err)
            // 执行 SQL 语句成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.send('添加失败！')
            res.send('添加成功')
        })
    }
})

// 获取动态列表
router.get('/dynamicList', (req, res) => {
    // 定义sql语句
    const sql = `select * from dynamic`
    db.query(sql, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.send(err)
        res.send(results)
    })
})

// 删除动态
router.post('/deleteDynamic', (req, res) => {
    // 定义删除动态的sql语句
    const sql = `delete from dynamic where dynamic_id = ?`
    db.query(sql, req.body.dynamicId, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.send(err)
        console.log(results);
        if (results.affectedRows === 0) return res.send('数据不存在已被删除')
        res.send('删除成功')
    })
})


module.exports = router
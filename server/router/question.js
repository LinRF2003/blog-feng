const express = require('express')
const router = express.Router()
// 引入时间处理函数
const Date = require('../utils/Date')
// 引入数据库
const db = require('../db/index')

// 添加和修改问题
router.post('/addQuestion', (req, res) => {
    const user = req.user;
    const body = req.body;
    // 判断必填数据是否为空
    if (!body.content || !body.title || !body.tags || !body.fatherTags) {
        return res.cc({ message: '必填参数不能为空', code: 500 });
    }
    console.log(user);
    const data = {
        userId: 1,
        userName: 231,
        ...body
    }
    console.log(data);
    // 定义添加问题的sql语句
    const sql = `insert into questions set ?`
    db.query(sql, data, (err, result) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err, 500)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (result.affectedRows !== 1) return res.cc({ message: '添加失败', code: 500 })
        res.cc({ message: '添加失败', code: 500 })
    })

    // if (req.body.questionId) {
    //     // 定义添加问题的sql语句
    //     const sql = `update questions set ? where question_id = ?`
    //     db.query(sql, [data, req.body.questionId], (err, result) => {
    //         // 执行 SQL 语句失败
    //         if (err) return res.send(err)
    //         if (results.changedRows !== 1) res.send('数据不存在，修改失败')
    //         res.send('修改成功')
    //     })
    // } else {
    //     // 定义添加问题的sql语句
    //     const sql = `insert into questions set ?`
    //     db.query(sql, data, (err, result) => {
    //         // 执行 SQL 语句失败
    //         if (err) return res.send(err)
    //         // 执行 SQL 语句成功，但是影响行数不等于 1
    //         if (results.affectedRows !== 1) return res.send('添加失败！')
    //         res.send('添加成功')
    //     })
    // }


})



// 删除问题
router.post('/deleteQuestion', (req, res) => {
    // 定义删除动态的sql语句
    const sql = `delete from questions where question_id = ?`
    db.query(sql, req.body.questionId, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.send(err)

        if (results.affectedRows === 0) return res.send('数据不存在已被删除')
        res.send('删除成功')
    })
})

// 增加问题浏览量
router.post('addViews', (req, res) => {
    const sql = `update questions set views = views + 1 where question_id = ?`
    db.query(sql, req.body.blogId, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.status(500).send(err)

        if (results.affectedRows != 0) return res.send('增加失败')
        res.send('增加成功')
    })
})


module.exports = router
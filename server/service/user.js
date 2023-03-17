/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

// 注册用户的处理函数
const bcrypt = require('bcryptjs')
// 引入数据库文件   
const db = require('../db/index')

// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
const config = require('../config')



// 修改密码
exports.updatePSW = (req, res) => {

    console.log(req.body)
    console.log(req.body.oldPassword, req.body.newPassword);
    // 判断旧密码密码是否正确
    const sql = 'select * from users where user_id = ?'
    db.query(sql, req.user.user_id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.send({status: 1, message: err.message})
        // console.log(results);
        const compareResult = bcrypt.compareSync(req.body.oldPassword, results[0].password)
        console.log(compareResult);
        if (!compareResult) return res.send({status: 1, message: '原密码错误'})
        console.log(req.body.oldPassword == req.body.newPassword);
        if (req.body.oldPassword == req.body.newPassword) return res.send({status: 1, message: "新密码不能与旧密码相同"})
        // 对用户密码进行加密
        let password = req.body.newPassword;
        password = bcrypt.hashSync(password, 10)

        const sql = `update users set password = ? where user_id = ?`
        db.query(sql, [password, req.user.user_id], (err, results) => {
            if (err) return res.send(err);
            if (results.affectedRows !== 1) {
                res.send({status: 1, message: '修改失败'})
            }
            res.send({status: 0, message: '修改成功'})
        })
    })

}

// 修改手机号
exports.updatePhone = (req, res) => {
    const sql = 'select phone from users where user_id = ?'
    db.query(sql, req.user.user_id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.send({status: 1, message: err.message})
        if (req.body.phone == results[0].phone) return res.send({message: "新手机号不能与旧手机号相同"})
        const sql = `update users set phone = ? where user_id = ?`
        db.query(sql, [req.body.phone, req.user.user_id], (err, results) => {
            if (err) return res.send(err);
            console.log(results);
            if (results.changedRows !== 1) {
                return res.send('修改失败')
            }
            res.send({status: 0, message: '修改成功'})
        })
    })
}

// 修改用户信息
exports.updateUserInfo =

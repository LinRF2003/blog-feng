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

// 注册用户 // 导入配置文件
exports.regUser = (req, res) => {

    // 接收表单数据
    const userinfo = req.body
    // 判断数据是否合法
    if (!userinfo.phone || !userinfo.password) {
        return res.send({ status: 1, message: '手机号或密码不能为空！' })
    }


    const sql = `select * from users where phone=?`
    db.query(sql, [userinfo.phone], function (err, results) {

        // 执行 SQL 语句失败
        if (err) {
            return res.send({ status: 1, message: err.message })
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.send({ status: 1, message: '手机号已被注册！' })
        }

        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        let timestamp = new Date().getTime() + '';
        let user_name = '游客' + timestamp.substring((timestamp.length - 8), timestamp.length)
        // let user_name = '游客' + timestamp

        const sql = 'insert into users set ?'
        db.query(sql, { phone: userinfo.phone, password: userinfo.password, user_name: user_name }, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
            }
            // 注册成功
            res.send({ status: 0, message: '注册成功！' })
        })
    })


}

// 登录的处理函数
exports.login = (req, res) => {
    // 接收表单数据
    const userinfo = req.body
    // 判断数据是否合法
    if (!userinfo.phone || !userinfo.password) {
        return res.send({ status: 1, message: '手机号或密码不能为空！' })
    }

    // 判断数据库中是否存在此用户
    // 先判断手机号是否正确
    const sql = 'select * from users where phone=?'
    db.query(sql, userinfo.phone, function (err, results) {

        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message })
        // SQL 语句执行成功，但影响行数不为 1
        if (results.length !== 1) {
            return res.send({ status: 1, message: '手机号还未注册！' })
        }

        // 手机号存在的情况下判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        // console.log(bcrypt.compareSync(userinfo.password, results[0].password));
        if (compareResult) {
            // 用户信息对象加密成 Token 字符串：      
            const user = { userId: results[0].userId, userName: results[0].userName, avatar: results[0].avatar }
            // const user = { ...results[0], password: "", phone: "" }

            // 生成 Token 字符串
            const tokenStr = jwt.sign(user, config.jwtSecretKey, {
                expiresIn: '120h', // token 有效期为 10 个小时
            })
            // 登录成功
            res.send({
                status: 0,
                message: '登录成功！',
                // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
                token: 'Bearer ' + tokenStr,
            })
        } else {
            res.send({ status: 1, message: '密码错误！' })
        }
    })

    // res.send({ status: 1, message: '登录成功！' })
}

// 获取用户信息
exports.userinfo = (req, res) => {
    // 根据用户的 id，查询用户的基本信息
    // 注意：为了防止用户的密码泄露，需要排除 password 字段
    // console.log(req.user);
    const sql = `select * from users where user_id=?`

    const user_id = req.body.user_id || req.user.user_id
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, user_id, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.send(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.send({ message: '获取用户信息失败！' })

        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: { ...results[0], password: '' },
        })
    })
}

// 修改密码
exports.updatePSW = (req, res) => {

    console.log(req.body)
    console.log(req.body.oldPassword, req.body.newPassword);
    // 判断旧密码密码是否正确
    const sql = 'select * from users where user_id = ?'
    db.query(sql, req.user.user_id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message })
        // console.log(results);
        const compareResult = bcrypt.compareSync(req.body.oldPassword, results[0].password)
        console.log(compareResult);
        if (!compareResult) return res.send({ status: 1, message: '原密码错误' })
        console.log(req.body.oldPassword == req.body.newPassword);
        if (req.body.oldPassword == req.body.newPassword) return res.send({ status: 1, message: "新密码不能与旧密码相同" })
        // 对用户密码进行加密
        let password = req.body.newPassword;
        password = bcrypt.hashSync(password, 10)

        const sql = `update users set password = ? where user_id = ?`
        db.query(sql, [password, req.user.user_id], (err, results) => {
            if (err) return res.send(err);
            if (results.affectedRows !== 1) {
                res.send({ status: 1, message: '修改失败' })
            }
            res.send({ status: 0, message: '修改成功' })
        })
    })

}

// 修改手机号
exports.updatePhone = (req, res) => {
    const sql = 'select phone from users where user_id = ?'
    db.query(sql, req.user.user_id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message })
        if (req.body.phone == results[0].phone) return res.send({ message: "新手机号不能与旧手机号相同" })
        const sql = `update users set phone = ? where user_id = ?`
        db.query(sql, [req.body.phone, req.user.user_id], (err, results) => {
            if (err) return res.send(err);
            console.log(results);
            if (results.changedRows !== 1) {
                return res.send('修改失败')
            }
            res.send({ status: 0, message: '修改成功' })
        })
    })
}

// 修改用户信息
exports.updateUserInfo = (req, res) => {

    const body = req.body
    const data = {
        user_name: body.userName,
        sex: body.sex,
        avatar: body.avatar,
        introduction: body.introduction,
        birthdate: body.birthdate
    };

    if (body.userName == '') return res.status(500).send('用户名不能为空')

    const sql = `update users set ? where user_id = ?;
                 update blog set user_name = ? where user_id = ?;
                 update blog_comment set user_name = ? where user_id = ?;
                 update blog_comment set avatar = ? where user_id = ?;
                 select * from users where user_id = ?`
        ;
    db.query(sql, [data, req.user.user_id, data.user_name, req.user.user_id, data.user_name, req.user.user_id, data.avatar, req.user.user_id, req.user.user_id], (err, results) => {

        if (err) return res.status(500).send(err);

        res.send({
            message: '更新用户数据成功',
        })
        // 修改成功
    })
}
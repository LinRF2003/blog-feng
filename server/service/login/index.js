/**
 * @api {get} /admin/login/ 登录接口
 * @apiName 登录接口
 * @apiGroup admin
 *
 *
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
// 注册密码的处理函数
const bcrypt = require('bcryptjs');
const { SYSTEM_ERROR, PARAMS_ERROR, NULL_ERROR } = require('../../common/errorCode');
const { emailReg } = require('../../utils/regular');
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken');
const config = require('../../config');

// 引入数据库文件   
const db = require('../../db/index')
const {sha1} = require("mysql/lib/protocol/Auth");

exports.main = (req, res) => {
    const { email, password } = req.body;
    // 判断数据是否合法
    if (!email || !password) {
        return res.err(NULL_ERROR);
    }
    if(!email || !password)
    // 判断邮箱是否正确
    if (!emailReg(email)) {
        return res.err(PARAMS_ERROR, '邮箱错误');
    }
    // 判断密码是否正确
    if (password.length < 8||password.length>20) {
        return res.err(PARAMS_ERROR, '密码大于8位且小于20位');
    }
    // 判断数据库中是否存在此用户
    const sql = 'select * from users where email = ?'
    db.query(sql, email, function (err, results) {

        // 执行 SQL 语句失败
        if (err) return res.err(SYSTEM_ERROR);
        // SQL 语句执行成功，但影响行数不为 1
        if (results.length !== 1) {
            return res.sm2('该邮箱还未注册');
        }
        // 邮箱存在的情况下判断密码是否正确
        const compareResult = bcrypt.compareSync(password, results[0].password)
        // console.log(bcrypt.compareSync(userinfo.password, results[0].password));
        if (compareResult) {
            // 用户信息对象加密成 Token 字符串：      
            const user = { userId: results[0].userId, userName: results[0].userName, avatar: results[0].avatar }
            // 生成 Token 字符串
            const tokenStr = jwt.sign(user, config.jwtSecretKey, {
                expiresIn: '720h', // token 有效期为 10 个小时
            })
            // 登录成功
           // 添加登录次数
            let sql = "update users set loginCount = loginCount + 1 where email = ?"
            db.query(sql,email,(err, results) => {
                return res.successs({ message: "登录成功",  token: 'Bearer ' + tokenStr, })
            })

        } else {
            return res.sm2('密码错误！')
        }
    })
}

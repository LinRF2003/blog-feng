const db = require("../../../db");
const {SYSTEM_ERROR} = require("../../../common/errorCode");

exports.main = async (req, res) => {
    // 根据用户的 id，查询用户的基本信息
    // 注意：为了防止用户的密码泄露，需要排除 password、phone 字段
    const sql = `select * from users where userId=?`
    // 判断用户需要获取的用户信息
    const userId = req.body.userId || req.user.userId;
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    await db.query(sql, userId, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.err(SYSTEM_ERROR);
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.sm2('用户不存在！')
        // 3. 将用户信息响应给客户端
        res.successs({userInfo:{...results[0], password: '', phone: ''}});
    })
}

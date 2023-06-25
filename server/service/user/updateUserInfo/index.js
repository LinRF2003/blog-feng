const db = require("../../../db");
const { NULL_ERROR, SYSTEM_ERROR, PARAMS_ERROR } = require("../../../common/errorCode");
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken');
const config = require('../../../config');
exports.main = async (req, res) => {
    const { userName, introduction, sex, birthdate, avatar } = req.body;
    // 判断数据是否正确
    if (userName.replace(/\s*/g, "") === '' || !avatar) return res.err(NULL_ERROR);
    if (userName.length > 20) {
        return res.err(PARAMS_ERROR, "用户名不能超过20");
    }
    if (introduction && introduction.length > 100) {
        return res.err(PARAMS_ERROR, "简介不能超过100字");
    }
    const { userId } = req.user;
    const data = {
        userName, introduction, sex, birthdate, avatar
    }
    const sql = `update users set ? where userId = ?;
                 update blog set userName = '${userName}',avatar = '${avatar}' where userId = ${userId};
                 update blog_comment set userName = '${userName}', avatar = '${avatar}' where userId = ${userId};
                 update questions set userName = '${userName}',avatar = '${avatar}' where userId = ${userId};
                 update question_answer set userName = '${userName}',avatar = '${avatar}' where userId = ${userId};
                 update dynamic set userName = '${userName}',avatar = '${avatar}' where userId = ${userId};
                 update dynamic_comment set userName = '${userName}', avatar = '${avatar}' where userId = ${userId};`;
    await db.query(sql, [data, userId], (err, results) => {
        if (err) {
            console.log(err);
            return res.err(SYSTEM_ERROR);
        }
        // 用户信息对象加密成 Token 字符串：      
        const user = { userId, userName, avatar }
        // 生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '720h', // token 有效期为 10 个小时
        })
        return res.successs({ message: "更新用户信息成功", token: 'Bearer ' + tokenStr, })
    })
}

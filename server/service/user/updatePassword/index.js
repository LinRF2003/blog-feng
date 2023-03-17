const db = require("../../../db");
const bcrypt = require("bcryptjs");
const {SYSTEM_ERROR} = require("../../../common/errorCode");

exports.main = async (req, res) => {

    // 判断旧密码密码是否正确
    const sql = 'select * from users where userId = ?'
    await db.query(sql, req.user.userId, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err);
            return res.err(SYSTEM_ERROR);
        }
        // console.log(results);
        // 判断旧密码是否与数据库中相同
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
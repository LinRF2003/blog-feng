const db = require("../../../db");
const bcrypt = require("bcryptjs");
const {SYSTEM_ERROR} = require("../../../common/errorCode");

exports.main = async (req, res) => {
    const {oldPassword,newPassword} = req.body;
    // 判断旧密码密码是否正确
    const sql = 'select * from users where userId = ?';
    await db.query(sql, req.user.userId, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err);
            return res.err(SYSTEM_ERROR);
        }
        // 判断旧密码是否与数据库中相同
        const compareResult = bcrypt.compareSync(oldPassword, results[0].password);
        if (!compareResult) return res.sm2('旧密码错误');

        if (oldPassword ==newPassword) return res.sm2("新密码不能与旧密码相同");
        // 对用户密码进行加密
        let password = bcrypt.hashSync(newPassword, 10)

        const sql = `update users set password = ? where user_id = ?`
        db.query(sql, [password, req.user.userId], (err, results) => {
            if (err) return res.send(err);
            if (results.affectedRows !== 1) {
                res.sm2('修改失败')
            }
            res.sm('修改成功')
        })
    })

}
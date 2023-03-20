const db = require("../../../db");
const {SYSTEM_ERROR, NULL_ERROR, PARAMS_ERROR} = require("../../../common/errorCode");
const {emailReg, captchaReg} = require("../../../utils/regular");
const bcrypt = require("bcryptjs");

exports.main = async (req, res) => {
    const {email, captcha} = req.body;
    // 判断数据是否合法
    if (!email || !captcha) {
        return res.err(NULL_ERROR);
    }
    // 判断邮箱是否正确
    if (!emailReg(email)) {
        return res.err(PARAMS_ERROR, '邮箱错误');
    }
    // 判断验证码是否正确
    if (!captchaReg(captcha)) {
        return res.err(PARAMS_ERROR, '验证码格式错误，需为6位数字');
    }
    const {userId} = req.body;
    // 判断邮箱是否与之前相同
    const sql = 'select email from users where userId = ?';
    await db.query(sql, userId, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err);
            return res.err(SYSTEM_ERROR);
        }
        if (email == results[0].email) return res.sm2("新邮箱不能与旧邮箱相同");
        // 判断验证码是否相同
        // 判断验证码是否超时   // 判断验证码是否正确
        const emailSql = `select * from temporary_email where email = ?`;
        db.query(emailSql, email, (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                return res.err(SYSTEM_ERROR);
            }
            // 判断验证码是否超时
            if ((Date.now() - results[0].time) / 90000 > 15) {
                return res.sm2('验证码超时，请重新获取');
            }
            // 判断验证码是否正确
            if (captcha != results[0].captcha) {
                return res.sm2('验证码错误');
            }
            // 更新邮箱
            const sql = `update users set email = ? where userId = ?`
            db.query(sql, [email, userId], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.err(SYSTEM_ERROR);
                }
                if (results.changedRows !== 1) {
                    return res.sm2('修改失败');
                }
                res.sm('修改成功');
            })
        })
    })
}

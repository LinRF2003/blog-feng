const db = require("../../../db");
const {SYSTEM_ERROR, NULL_ERROR, PARAMS_ERROR} = require("../../../common/errorCode");
const {emailReg, captchaReg} = require("../../../utils/regular");
const bcrypt = require("bcryptjs");
const redisClient = require("../../../common/redis");

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

    const {userId} = req.user;
    // 查询数据库中是否有此邮箱
    const sql = 'select * from users where email = ?';
    await db.query(sql, email, async (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                console.log(err);
                return res.err(SYSTEM_ERROR);
            }
            if (results.length > 0) return res.sm2("邮箱已存在");
            // 查询redis中是否已存在此邮箱验证码信息
            await redisClient.get(email, (err, val) => {
                if (err) {
                    console.error(err)
                    return;
                }
                // 如果验证码存在redis中；
                if (val) {
                    // 判断验证码与用户输入的是否相同
                    if (captcha == val.substring(0, 6)) {
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
                            return res.sm('修改成功');
                        })
                    } else {
                        return res.sm2('验证码错误');
                    }
                } else {
                    return res.sm2('验证码超时或错误，请重新获取');
                }
            })
        }
    )
}

// 注册用户的处理函数
const bcrypt = require('bcryptjs');

const {PARAMS_ERROR, NULL_ERROR, SYSTEM_ERROR} = require('../../common/errorCode');
const db = require('../../db/index');
const {captchaReg, emailReg, passwordReg} = require('../../utils/regular');
const redisClient = require("../../common/redis");
exports.main = async (req, res) => {
    // 接收表单数据
    let {email, captcha, password, repassword} = req.body
    // 判断数据是否合法
    if (!email || !captcha || !password || !repassword) {
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
    // 判断密码是否正确
    if (!passwordReg(password)) {
        return res.err(PARAMS_ERROR, '密码至少8位且必有数字+特殊字符+字母');
    }
    // 判断两次密码是否相同
    if (!(password === repassword)) {
        return res.err(PARAMS_ERROR, '两次密码不同');
    }
    // 判断邮箱是否已经注册
    const sql = `select * from users where email = ?`
    await db.query(sql, email, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.err(SYSTEM_ERROR);
        }
        // 手机号是否已被注册
        if (results.length === 1) {
            return res.err(PARAMS_ERROR, '手机号已被注册')
        }
        // 判断验证码是否超时   // 判断验证码是否正确
        const emailSql = `select * from temporary_email where email = ?`;
        db.query(emailSql, email, async (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                return res.err(SYSTEM_ERROR);
            }
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
                        // 插入注册用户信息
                        const insertSql = 'insert into users set ?';

                        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
                        password = bcrypt.hashSync(password, 10);
                        let timestamp = '' + Date.now();
                        // 初始化用户名
                        let userName = '用户' + timestamp.substring((timestamp.length - 8), timestamp.length)
                        // 定义数据
                        const data = {
                            email,
                            password,
                            userName
                        }
                        db.query(insertSql, data, function (err, results) {
                            // 执行 SQL 语句失败
                            if (err) return res.err(SYSTEM_ERROR);
                            // SQL 语句执行成功，但影响行数不为 1
                            if (results.affectedRows !== 1) {
                                return res.err(SYSTEM_ERROR, '注册用户失败');
                            } else {
                                // 注册成功
                                // 删除redis中的验证码信息
                                redisClient.del(email);
                                return res.sm('注册成功!')
                            }

                        })
                    } else {
                        return res.sm2('验证码错误');
                    }
                } else {
                    return res.sm2('验证码超时或错误，请重新获取');
                }
            })

        })
    })
}
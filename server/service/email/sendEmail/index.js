const { PARAMS_ERROR, NULL_ERROR, SYSTEM_ERROR, NO_AUTH } = require('../../../common/errorCode');
const { mailTransport } = require('../index');
const { emailReg } = require('../../../utils/regular')
const db = require('../../../db/index')
exports.main = async (req, res) => {
    // 取得body数据
    const { email } = req.body;
    // 判断用户邮箱是否正确
    if (!email) {
        return res.err(NULL_ERROR, '邮箱不能为空')
    }
    // 邮箱验证正则表达式
    if (!emailReg(email)) {
        return res.err(PARAMS_ERROR, '邮箱不正确')
    }
    // 生成6位随机数验证码
    let captcha = Math.random().toFixed(6).slice(-6);
    // 验证邮箱是否已注册
    const searchEmailSql = `select * from users where email = ?`;
    await db.query(searchEmailSql, email, (err, results) => {
        if (err) return res.err(SYSTEM_ERROR);
        // 邮箱已注册
        if (results.length == 1) {
            return res.sm2('邮箱已注册');
        }
        const sendEmail = ()=>{
             // 未注册发送验证码
             let text = "您好，您的邮箱验证码是：" + captcha + "，15分钟有效";
             // 597964726@qq.com 
             let options = {
                 from: '2673760057@qq.com',
                 to: `${email}`,
                 // bcc: '密送',
                 subject: '登录验证码',
                 text

             };
             mailTransport.sendMail(options, function (err, msg) {
                 if (err) {
                     console.log(err);
                     res.send(err);
                 } else {
                     res.sm('success');
                 }
             })
        }
        // 邮箱未注册
        // 查询未注册的邮箱表中有没有此邮箱
        const esql = `select * from temporary_email where email = ?`;
        db.query(esql, email, (err, results) => {
            if (err) return false;
            // 60秒内只能发送一次
            
            // 向数据库加入邮箱、验证码、时间戳信息 
            // 需要插入的数据
            if (results.length == 0) {
                sendEmail();
                const data = {
                    email,
                    captcha,
                    time: Date.now(),
                }
                const sql = `insert into temporary_email set ?`
                db.query(sql, data, (err, results) => {
                    console.log(results);
                    if (err) return false;
                    return true;
                })
            } else {
                if (results[0].time) {
                    if ((Date.now() - results[0].time) / 1000 < 60) {
                        res.err(NO_AUTH, '60秒内只能发送一次请求')
                    }
                    sendEmail();
    
                }
                const data = {
                    captcha,
                    time: Date.now(),
                }
                const sql = `update temporary_email set ? where email = ?`
                db.query(sql, [data, email], (err, results) => {
                    if (err) return false;

                    return true;
                })
            }
        })

    })

}
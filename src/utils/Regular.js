// 邮箱
const emailReg =/^[1-9][0-9]{4,10}@qq.com$/;


// 密码   密码正则表达式(至少8位且必有数字+特殊字符+字母)
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_+<>?:"{},./\\;'[\]])[A-Za-z\d`~!@#$%^&*()_+<>?:"{},./\\;'[\]]{8,}$/;
// 验证码
const captchaReg = /^\d{6}$/;
// console.log(captchaReg.test(200307))
module.exports = {
    emailReg,
    captchaReg,
    passwordReg
}
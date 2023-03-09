// 邮箱
const emailReg = (email) => {
    const reg = /^[1-9][0-9]{4,10}@qq.com$/
    return reg.test(email);
};

// 密码   密码正则表达式(至少8位且必有数字+特殊字符+字母)
const passwordReg = (password) => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_+<>?:"{},./\\;'[\]])[A-Za-z\d`~!@#$%^&*()_+<>?:"{},./\\;'[\]]{8,}$/;
    return reg.test(password);
};
// const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]])[A-Za-z\d`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]]{8,}$/;

// 验证码
const captchaReg = (captcha) => {
    const reg = /^\d{6}$/;
    return reg.test(captcha);
}
// console.log(captchaReg.test(200307))
module.exports = {
    emailReg,
    captchaReg,
    passwordReg
}
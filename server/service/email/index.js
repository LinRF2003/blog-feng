const nodemailer = require('nodemailer');
exports.mailTransport = nodemailer.createTransport({
    // host: 'smtp.qq.email',
    service: 'qq',
    secure: true,	//安全方式发送,建议都加上
    auth: {
        user: '2673760057@qq.com',
        pass: 'wshbnkplvzyoecgf'
    }
})

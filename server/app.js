// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express();
const bodyParser = require('body-parser');

// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:8081'],//可设置多个跨域
    credentials: true//允许客户端携带验证信息
}))

// 请求大小限制
const requestLimit = '5120kb';


// 解析表单的中间件
app.use(express.urlencoded({extended: false, limit: requestLimit}));
app.use(bodyParser.json({limit: requestLimit}));
// 解析post请求数据
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
// 解决跨域问题
// app.use(cors({ origin: "http://localhost:8080" }))
// 导入配置文件
const config = require('./config')
const {NO_LOGIN} = require('./common/errorCode');
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 暴露静态资源
app.use(express.static('public'))

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
// app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
app.use(expressJWT({secret: config.jwtSecretKey}).unless({path: ['/api/login', '/api/register', '/api/imgUpload', '/api/email/send', '/api/test', '/api/get']}))
// , /^\/api\/question\//


// 响应数据的中间件
app.use(require('./utils/respond.js'));

// 错误中间件
app.use(function (err, req, res, next) {
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.send({...NO_LOGIN});
    // google需要配置，否则报错cors error
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // 允许的地址 http://127.0.0.1:9000 这样的格式
    res.setHeader('Access-Control-Allow-Origin', req.get('Origin'));
    // 允许跨域请求的方法
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    next();
})


// 导入并注路由模块
app.use('/api', require('./router/index'))

// 导入并注册图片路由模块
const images = require('./router/images');

app.use('/api', images)


//#endregion

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3030, () => {
    console.log('http://127.0.0.1:3030 服务启动');
})

// 引入redis
const redis = require("redis");

const redisClient = redis.createClient(6379); // Redis server started at port 6379


// 监听错误信息
redisClient.on('error', err => {
    console.error(err) // 打印监听到的错误信息
})

module.exports = redisClient
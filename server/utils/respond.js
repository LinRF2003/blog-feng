const respond = function (req, res, next) {
    // 错误处理
    res.err = function ({ code, message }, desc) {
        res.send({
            // 状态
            code,
            message,
            desc
        })
    },
        // 成功返回信息
        res.sm = function (message) {
            res.send({
                // 状态
                code: 200,
                message,
            })
        },
        // 参数错
        res.sm2 = function (message) {
            res.send({
                // 状态
                code: 201,
                message,
            })
        },
        // 成功单数据处理
        res.success = function (data) {
            res.send({
                // 状态
                code: 200,
                data
            })
        },
        // 成功多数据处理
        res.successs = function (data) {
            res.send({
                // 状态
                code: 200,
                ...data
            })
        },
        // 添加成功返回id
        res.successId = function (id) {
            res.send({
                // 状态
                code: 200,
                id
            })
        }
    next();
}
module.exports = respond;
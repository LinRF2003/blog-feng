// 引入数据库文件   
const db = require('../../../db/index')


exports.main = (req, res) => {

    // 定义sql语句
    const sql = `select * from questions`
    db.query(sql, (err, results) => {
        if (err) return res.send({ code: 500, message: err.code })
        res.send({ code: 200, data: results })
        // res.send({ code: 200, data: results })
    })
}


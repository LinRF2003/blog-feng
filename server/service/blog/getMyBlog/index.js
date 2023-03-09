// 引入数据库文件   
const { SYSTEM_ERROR } = require('../../../common/errorCode')
const db = require('../../../db/index')


exports.main = (req, res) => {
    // 
    const sql = `select * from blog where userId = ?`
    db.query(sql, req.user.userId, (err, results) => {
        if (err) return res.err(SYSTEM_ERROR);
        res.success(results);
        // res.send({ code: 200, data: results })
    })
}


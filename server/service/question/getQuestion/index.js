// 引入数据库文件   
const { SYSTEM_ERROR } = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = (req, res) => {

    // 定义sql语句
    const sql = `select * from questions`
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.err(SYSTEM_ERROR);
        }
        res.success(results)
        // res.send({ code: 200, data: results })
    })
}


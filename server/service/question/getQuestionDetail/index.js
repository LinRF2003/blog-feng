// 引入数据库文件   
const db = require('../../../db/index');

const { PARAMS_ERROR, SYSTEM_ERROR } = require('../../../common/errorCode');

exports.main = (req, res) => {
    let { id } = req.body;
    // 判断id是否正确
    if (!id || id < 0) {
        return res.err(PARAMS_ERROR,'id不存在');
    }
    const sql = 'select * from questions where id = ?'
    db.query(sql,id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.err(SYSTEM_ERROR)

        if (results.length !== 1) {
            return res.err(PARAMS_ERROR, '问题不存在')
        }
        res.success(results[0])
    })

}


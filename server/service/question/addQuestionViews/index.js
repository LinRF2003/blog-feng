// 引入数据库文件   
const { SYSTEM_ERROR } = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = (req, res) => {
    const { id } = req.body;
    // 判断id是否正确
    if (!id || id < 0) {
        return res.err(PARAMS_ERROR);
    }
    const sql = `update questions set views = views + 1 where id = ?`
    db.query(sql, id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err);
            return res.err(SYSTEM_ERROR);
        }
        if (results.affectedRows != 0) return res.sm2('增加失败');
        res.sm('增加成功');
    })
}


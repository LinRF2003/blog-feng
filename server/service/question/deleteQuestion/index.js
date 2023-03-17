// 引入数据库文件   
const db = require('../../../db/index')
const {PARAMS_ERROR, SYSTEM_ERROR} = require("../../../common/errorCode");


exports.main = (req, res) => {
    const {id} = req.body;
    // 判断id是否正确
    if (!id || id < 0) {
        return res.err(PARAMS_ERROR);
    }
    // 定义sql语句
    const sql = `update questions set isDelete = 1 where id = ? `
    db.query(sql, id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.err(SYSTEM_ERROR);

        if (results.affectedRows == 0) return res.sm2('数据不存在已被删除')

        res.sm('删除成功,id为：' + id);
    })
}


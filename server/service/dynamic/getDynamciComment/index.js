// 引入数据库文件   
const { SYSTEM_ERROR,NULL_ERROR } = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = (req, res) => {
    // 获取id
    const {dynamicId} = req.body;
    // 判断id是否正确
    if (!dynamicId || dynamicId < 0) {
        return res.err(NULL_ERROR);
    }
    // 定义sql语句
    const sql = `select * from dynamic_comment where dynamicId = ? and isDelete = 0`
    db.query(sql, dynamicId,(err, results) => {
        if (err) return res.err(SYSTEM_ERROR);
        return res.success(results)
    })
}

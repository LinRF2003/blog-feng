// 引入数据库文件   
const { SYSTEM_ERROR,NULL_ERROR } = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = (req, res) => {
    // 获取id
    const {questionId} = req.body;
    // 判断id是否正确
    if (!questionId || questionId < 0) {
        return res.err(NULL_ERROR,'id错误');
    }
    // 定义sql语句
    const sql = `select * from question_answer where questionId = ? and isDelete = 0`
    db.query(sql, questionId,(err, results) => {
        if (err) return res.err(SYSTEM_ERROR);
        return res.success(results)
    })
}

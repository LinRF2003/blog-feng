// 引入数据库文件
const {
    SYSTEM_ERROR, PARAMS_ERROR
} = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = (req, res) => {
    // 获取参数
    const {
        id,
        questionId
    } = req.body;
    // 判断id或问题id是否正确
    if (!questionId || !id || questionId < 0 || id < 0) {
        return res.err(PARAMS_ERROR); // 返回参数错误提示
    }

// 定义删除博客的sql语句
    const sql = `UPDATE question_answer SET isDelete = 1 WHERE id = ? and questionId = ?`;

    db.query(sql, [id, questionId], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.err(SYSTEM_ERROR); // 返回系统错误提示
        }

        // 执行影响行数不为1时返回评论不存在提示
        if (results.affectedRows !== 1) {
            return res.sm2('评论不存在');
        }

        // 更新问题的回答数
        const updateAnswerNumSql = `UPDATE questions SET answerNum = answerNum - 1 WHERE id = ?`;

        db.query(updateAnswerNumSql, questionId, (err, results) => {
            if (err) {
                return res.err(SYSTEM_ERROR); // 返回系统错误提示
            }

            // 执行影响行数不为1时返回系统错误提示
            if (results.affectedRows !== 1) {
                return res.err(SYSTEM_ERROR);
            }

            res.sm('删除成功');
        })
    })
}


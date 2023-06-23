// 引入数据库文件   
const {
    SYSTEM_ERROR, PARAMS_ERROR
} = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = (req, res) => {
    // 获取参数
    let  {
        dynamicId,
        commentId
    } = req.body;
    // 判断id是否正确
    if (!dynamicId || dynamicId < 0) {
        return res.err(PARAMS_ERROR);
    }
    if (!commentId || commentId < 0) {
        return res.err(PARAMS_ERROR);
    }
    // 定义删除博客的sql语句
    const sql = `update  dynamic_comment set isDelete = 1 where id = ? and dynamicId = ?`
    db.query(sql, [commentId, dynamicId], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err)
            return res.err(SYSTEM_ERROR)
        }
        if (results.affectedRows != 1) {
            return res.sm2('评论不存在');
        }
        // 删除成功时给相应的博客评论数减一
        const sql = `update dynamic set commentCount = commentCount - 1 where id = ?`
        db.query(sql, dynamicId, (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                console.log(err)
                return res.err(SYSTEM_ERROR)
            }
            if (results.affectedRows != 1) {
                return res.err(SYSTEM_ERROR);
            }
            res.sm('删除成功');
        })
    })
}

// 引入数据库文件   
const {
    SYSTEM_ERROR, PARAMS_ERROR
} = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = (req, res) => {
    // 获取参数
    const {
        id
    } = req.body;
    // 判断id是否正确
    if (!id || id < 0) {
        return res.err(PARAMS_ERROR);
    }

    // 定义删除博客的sql语句
    const sql = `update  blog_comment_reply set isDelete = 1 where id = ?`
    db.query(sql, id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.err(SYSTEM_ERROR)
        if (results.affectedRows != 1) {
            return res.sm2('评论不存在');
        }
        res.sm('删除成功');
    })
}
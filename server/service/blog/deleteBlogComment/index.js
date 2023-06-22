// 引入数据库文件   
const {
    SYSTEM_ERROR, PARAMS_ERROR
} = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = (req, res) => {
    // 获取参数
    let  {
        commentId,
        blogId
    } = req.body;
    // commentId = parseInt(commentId);
    // blogId = parseInt(blogId);
    // 判断id是否正确
    if (!blogId || blogId < 0) {
        return res.err(PARAMS_ERROR);
    }
    if (!commentId || commentId < 0) {
        return res.err(PARAMS_ERROR);
    }
    // 定义删除博客的sql语句
    const sql = `update  blog_comment set isDelete = 1 where id = ? and blogId = ?`
    db.query(sql, [commentId, blogId], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err)
            return res.err(SYSTEM_ERROR)
        }
        if (results.affectedRows != 1) {
            return res.sm2('评论不存在');
        }
        // 删除成功时给相应的博客评论数减一
        const sql = `update blog set commentCount = commentCount - 1 where id = ?`
        db.query(sql, blogId, (err, results) => {
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

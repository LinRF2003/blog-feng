// 引入数据库文件
const db = require('../../../db/index')
const {PARAMS_ERROR, SYSTEM_ERROR} = require("../../../common/errorCode");

// 获取评论过的博客信息
exports.main = (req, res) => {
    let {blogCommentId} = req.body;

    // 判断请求参数是否合法
    if (!blogCommentId || blogCommentId < 0) {
        return res.err(PARAMS_ERROR, 'id错误');
    }

    // 定义数据库查询语句
    const sql = `SELECT * FROM blog_comment_reply WHERE blogCommentId = ? and isDelete = 0`;

    // 执行查询操作
    db.query(sql, blogCommentId, async (err, results) => {
        if (err) {
            console.log(err);

            // 发生数据库查询错误时返回错误码
            res.err(SYSTEM_ERROR);
        }

        // 查询成功时返回评论过的博客信息
        return res.success(results);
    })
}
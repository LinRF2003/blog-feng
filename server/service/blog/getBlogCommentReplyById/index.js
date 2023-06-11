// 引入数据库文件   
const db = require('../../../db/index')
const {PARAMS_ERROR, SYSTEM_ERROR} = require("../../../common/errorCode");
const {getPage} = require("../../methods");


exports.main = (req, res) => {
    let {
        blogCommentId
    } = req.body;
    if (!blogCommentId || blogCommentId < 0) {
        return res.err(PARAMS_ERROR, 'id错误');
    }

    // 定义sql语句 获取评论过的博客信息
    const sql = `select *  from blog_comment_reply where blogCommentId = ?`
    db.query(sql, blogCommentId,async (err, results) => {
        if (err) {
            console.log(err);
            res.err(SYSTEM_ERROR);
        }
        return res.success(results);
    })
}


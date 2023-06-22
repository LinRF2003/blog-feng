// 引入数据库文件   
const {PARAMS_ERROR, SYSTEM_ERROR} = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = (req, res) => {
    // 获取用户信息
    const {
        userId,
        userName,
        avatar
    } = req.user;
    // 获取body数据
    const {
        content,
        blogCommentId,
        toUserId,
        toUserName
    } = req.body;
    // 判断id是否正确
    if (!blogCommentId || blogCommentId < 0) {
        return res.err(PARAMS_ERROR, 'id不存在或错误');
    }
    // 判断内容是否为空且长度不超过200
    // if (!content || content.length > 200) {
    //     return res.err(PARAMS_ERROR, '内容不能为空且长度小于200');
    // }
    if (!content || !toUserId || !toUserName) {
        return res.err(PARAMS_ERROR);
    }
    // 定义添加博客评论回复的sql语句
    const sql = `insert into blog_comment_reply set ?;
         `
    const data = {
        content,
        blogCommentId,
        userId,
        userName,
        avatar,
        toUserId,
        toUserName
    }
    db.query(sql, data, (err, results) => {
        if (err) {
            console.log(err);
            return res.err(SYSTEM_ERROR);
        }
        console.log(results)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.sm2('添加失败！');
        res.successId(results.insertId);

    })

}
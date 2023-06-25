// 引入数据库文件   
const {PARAMS_ERROR, SYSTEM_ERROR} = require('../../../common/errorCode');
const db = require('../../../db/index');


exports.main = (req, res) => {
    // 获取body数据
    const {
        content, blogId, userId, userName, avatar
    } = req.body;
    // 判断博客id是否存在或错误
    if (!blogId || blogId < 0) {
        return res.err(PARAMS_ERROR, '博客id不存在或错误');
    }

    // 判断评论内容是否为空
    if (!content) {
        return res.err(PARAMS_ERROR, '评论内容不能为空');
    }

    // 定义添加评论的SQL语句，并更新博客评论数
    const addCommentSql = `
    INSERT INTO blog_comment SET ?;
    UPDATE blog SET commentCount = commentCount + 1 WHERE id = ?;
    `;

    // 定义要插入的数据对象
    const commentData = {content, blogId, userId, userName, avatar};

    db.query(addCommentSql, [commentData, blogId], (err, results) => {
        if (err) {
            console.log(err);
            return res.err(SYSTEM_ERROR);
        }

        // 执行添加评论SQL语句成功，但是影响行数不等于 1
        if (results[0].affectedRows !== 1 || results[1].affectedRows !== 1) {
            return res.sm2('添加评论失败！');
        }

        res.successId(results[0].insertId); // 返回新增评论的id
    });

}
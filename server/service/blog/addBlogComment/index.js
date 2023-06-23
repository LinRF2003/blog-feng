// 引入数据库文件   
const {PARAMS_ERROR, SYSTEM_ERROR} = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = (req, res) => {
    // 获取body数据
    const {
        content,
        blogId,
        userId,
        userName,
        avatar
    } = req.body;
    // 判断id是否正确
    if (!blogId || blogId < 0) {
        return res.err(PARAMS_ERROR, 'id不存在或错误');
    }
    // 判断内容是否为空且长度不超过200
    // if (!content || content.length > 200) {
    //     return res.err(PARAMS_ERROR, '内容不能为空且长度小于200');
    // }
    if (!content) {
        return res.err(PARAMS_ERROR, '内容不能为空');
    }
    // 定义添加评论的sql语句 // 添加成功时给相应的博客评论数加一
    const sql = `insert into blog_comment set ?;
                     update blog set commentCount = commentCount + 1 where id = ?`
    const data = {
        content,
        blogId,
        userId,
        userName,
        avatar
    }
    db.query(sql, [data, blogId], (err, results) => {
        if (err) {
            console.log(err);
            return res.err(SYSTEM_ERROR);
        }

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results[0].affectedRows !== 1 || results[1].affectedRows !== 1) return res.sm2('添加失败！');
        res.successId(results[0].insertId);
    })

}
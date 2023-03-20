// 引入数据库文件   
const {PARAMS_ERROR, SYSTEM_ERROR} = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = async (req, res) => {
    // 获取用户信息
    const {
        userId,
        userName,
        avatar
    } = req.user;
    // 获取body数据
    const {
        content,
        questionId
    } = req.body;
    // 判断id是否正确
    if (!questionId || questionId < 0) {
        return res.err(PARAMS_ERROR, 'id不存在或错误');
    }
    // 判断内容是否为空且长度不超过200
    if (!content || content.length > 200) {
        return res.err(PARAMS_ERROR, '内容不能为空且长度小于200');
    }
    // 定义添加评论的sql语句 // 添加成功时给相应的博客评论数加一
    const sql = `insert into question_answer set ?;
                     update questions set answerNum = answerNum + 1 where id = ?`
    const data = {
        content,
        questionId,
        userId,
        userName,
        avatar
    }
    await db.query(sql, [data, questionId], (err, results) => {
        if (err) {
            console.log(err);
            return res.err(SYSTEM_ERROR);
        }

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results[0].affectedRows !== 1 || results[1].affectedRows !== 1) return res.sm2('添加失败！');
        res.sm('添加成功');

    })

}
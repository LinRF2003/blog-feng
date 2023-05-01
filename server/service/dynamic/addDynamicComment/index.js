// 引入数据库文件   
const {PARAMS_ERROR, SYSTEM_ERROR} = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = async (req, res) => {

    // 获取body数据
    const {
        content,
        dynamicId
    } = req.body;
    // 判断id是否正确
    if (!dynamicId || dynamicId < 0) {
        return res.err(PARAMS_ERROR, 'id不存在或错误');
    }
    if (!content || content.length > 200) {
        return res.err(PARAMS_ERROR, '内容不能为空且不能大于200');
    }
    // 获取token中的用户信息
    const {
        userId,
    } = req.user;
    // 获取用户头像和用户名
    const userSql = `select userName, avatar from users where userId = ?`;
    await db.query(userSql, userId, (err, results) => {
        if(err){
            console.log(err)
            return res.err(SYSTEM_ERROR);
        }
        const {userName, avatar} = results[0];
        //定义博客数据
        let data = {
            content,
            userId,
            userName,
            avatar,
            dynamicId
        }
        const sql = `insert into dynamic_comment set ?;
                     update dynamic set commentCount = commentCount + 1 where id = ?`
        db.query(sql, [data,dynamicId], (err, results) => {
            // 执行 SQL 语句失败
            if(err){
                console.log(err)
                return res.err(SYSTEM_ERROR);
            }

            return res.sm('添加评论成功');
        })
    })

}
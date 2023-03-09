// 引入数据库文件   
const db = require('../../../db/index')
const {
    NULL_ERROR, SYSTEM_ERROR, PARAMS_ERROR
} = require('../../../common/errorCode')
// 增加或减少点赞
exports.main = (req, res) => {
    const {count,id} = req.body;
    // 判断参数是否正常
    if (count != 1 && count != -1) return res.err(PARAMS_ERROR,'count为1或-1');
    const data = {
        id,
        userId:req.user.userId
    }
    // 改变点赞博客的点赞数的sql语句
    if (count == 1) {
        // 查询用户喜欢的博客id列表
        // 添加点赞的用户和博客id
        const sql = `insert into blog_like set ?;
                update blog set like_count = like_count + 1 where blog_id = ?;`
        db.query(sql, [data, data.blog_id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.status(500).send(err)

            if (results.affectedRows == 0) return res.send('点赞失败')
            res.send('点赞成功')
        })
    } else {
        // 删除点赞的用户和博客id
        const sql = `delete from blog_like where blog_id = ? and user_id = ?;
            update blog set like_count = like_count - 1 where blog_id = ?;`
        db.query(sql, [data.blog_id, data.user_id, data.blog_id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.status(500).send(err)

            if (results.affectedRows == 0) return res.send('取消点赞失败')
            res.send('取消点赞成功')
        })
    }


}

// 引入数据库文件   
const {
    SYSTEM_ERROR
} = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = (req, res) => {
    const {id} = req.body;
    db.query(sql, req.body.blogId, (err, results) => {
        let user_id = results[0].user_id;
        let cate_id = results[0].cate_id;

        if (err) res.status(500).send(err)
        // 定义删除博客的sql语句
        const sql = `update blog set is_delete = 1 where blog_id = ?;
        update category set blog_count = blog_count - 1 where cate_id = ?;
        update users set blog_count = blog_count - 1 where user_id = ?;`
        db.query(sql, [req.body.blogId, cate_id, user_id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.status(500).send(err)

            if (results.affectedRows == 0) return res.send('数据不存在已被删除')
            res.send('删除成功')
        })
    })

}
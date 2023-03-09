// 引入数据库文件   
const { SYSTEM_ERROR } = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = (req, res) => {
    // 获取要删除的博客id
    const {
        id
    } = req.body;
    // 判断id是否正确
    if (!id || id < 0) {
        return res.err(NULL_ERROR);
    }
    // 定义删除博客的sql语句
    const sql = `update blog set isDelete = 1 where id = ?;
                 update users set blogCount = blogCount - 1 where userId = ?;`
    db.query(sql, [id, req.user.userId], (err, results) => {
        console.log(results);
        // 执行 SQL 语句失败
        if (err) return res.err(SYSTEM_ERROR);

        if (results.affectedRows == 0) return res.sm2('数据不存在已被删除')

        res.sm('删除成功')
    })


}
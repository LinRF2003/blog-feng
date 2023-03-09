// 引入数据库文件   
const { SYSTEM_ERROR,NULL_ERROR } = require('../../../common/errorCode');
const db = require('../../../db/index')


exports.main = (req, res) => {
    // 获取id
    const {blogId} = req.body;
    // 判断id是否正确
    if (!blogId || blogId < 0) {
        return res.err(NULL_ERROR);
    }
    // 定义sql语句
    const sql = `select * from blog_comment where blogId = ?`
    db.query(sql, blogId,(err, results) => {
        if (err) return res.err(SYSTEM_ERROR);
        return res.success(results)
    })
}

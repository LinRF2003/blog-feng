// 引入数据库文件   
const {
    SYSTEM_ERROR
} = require('../../../common/errorCode');
const db = require('../../../db/index')

// 获取点赞状态
exports.main = (req, res) => {
    // 获取用户点赞的博客id列表
    const sql = `select likeBlog from users where userId = ?`
    db.query(sql, [req.user.userId], (err, results) => {
        if (err) return res.err(SYSTEM_ERROR);
        // 返回点赞列表
        res.success(results);
    })
}
// 引入数据库文件
const db = require('../../../db/index');

const {
    SYSTEM_ERROR
} = require('../../../common/errorCode');

// 获取喜欢的博客列表
exports.main = (req, res) => {
    // 获取用户点赞的博客id列表
    const sql = `select likeBlog from users where userId = ?`;
    db.query(sql, [req.user.userId], (err, results) => {
        if (err) return res.err(SYSTEM_ERROR);
        if(!results[0].likeBlog || results[0].likeBlog.length<1){
            return res.success(false);
        }
        return res.success( results[0].likeBlog.indexOf(req.body.id) != -1);

    })
}
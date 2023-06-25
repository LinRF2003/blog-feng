// 引入数据库文件
const db = require('../../../db/index');

const {
    SYSTEM_ERROR, PARAMS_ERROR
} = require('../../../common/errorCode');

// 获取喜欢的博客列表
exports.main = (req, res) => {
    const {id} = req.body;
    if(!id || id < 0) {
        return res.err(PARAMS_ERROR);
    }
    // 获取用户点赞的博客id列表
    const sql = `select likeBlog from users where userId = ?`;
    db.query(sql, [req.user.userId], (err, results) => {
        if (err) return res.err(SYSTEM_ERROR);
        if(!results[0].likeBlog || results[0].likeBlog.length<1){
            return res.success(false);
        }
        return res.success( results[0].likeBlog.indexOf(id) !== -1);

    })
}
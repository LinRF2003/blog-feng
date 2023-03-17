const db = require("../../../db");
const {NULL_ERROR, SYSTEM_ERROR} = require("../../../common/errorCode");
// todo
// 获取可修改信息
exports.main = async (req, res) => {
    const data = {...req.body};
    // 判断数据是否正确
    if (data.userName == '') return res.err(NULL_ERROR);
    const {userId} = req.user;

    const sql = `update users set ? where userId = ?;
                 update blog set userName = ? where userId = ?;
                 update blog_comment set userName = ? where userId = ?;
                 update blog_comment set avatar = ? where userId = ?;`;
    await db.query(sql, [data, userId, data.userName, userId, data.userName, userId, data.avatar, userId], (err, results) => {
        if (err) {
            console.log(err);
            return res.err(SYSTEM_ERROR);
        }
        res.sm('更新用户数据成功')
    })
}

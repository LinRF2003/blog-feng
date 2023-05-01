// 引入数据库文件   
const {
    SYSTEM_ERROR, PARAMS_ERROR
} = require('../../../common/errorCode');
const db = require('../../../db/index')

// 改变点赞数
exports.main = async (req, res) => {
    // 获取数据
    const { userId } = req.user;
    const { id, count } = req.body;
    // 判断数据是否正确
    // 判断id是否正确
    if (!id || id < 0) {
        return res.err(PARAMS_ERROR);
    }
    // 判断count是否正确
    if (count != -1 && count != 1) {
        return res.err(PARAMS_ERROR, 'count为1或-1');
    }

    // 获取用户喜欢的博客列表
    const sql = `select likeBlog from users where userId = ?`;
    await db.query(sql, userId, (err, results) => {
        if (err) return res.err(SYSTEM_ERROR);
        if (results.length != 1) return res.err(SYSTEM_ERROR);
        let likeBlog = results[0].likeBlog ? JSON.parse(results[0].likeBlog) : [];
        // 点赞
        if (count == 1) {
            // 判断是否已经点过赞
            // 没有点过赞
            if (likeBlog.indexOf(parseInt(id)) === -1) {
                likeBlog.push(parseInt(id));
                // 博客喜欢数量加一、用户喜欢博客列表添加
                //;
                const blogSql = `update blog set likeCount = likeCount + 1 where id = ?;
                                 update users set likeBlog = ? where userId = ?;`;
                db.query(blogSql, [id, JSON.stringify(likeBlog), userId], (err, results) => {
                    if (err) return res.err(SYSTEM_ERROR, 1);
                    if (results[1].affectedRows != 1) {

                        return res.err(SYSTEM_ERROR);
                    }
                    return res.sm('点赞成功')
                })
            } else {
                return res.err(PARAMS_ERROR, '当前博客已点过赞');
            }
        } else {
            if (likeBlog.indexOf(parseInt(id)) === -1) {
                return res.err(PARAMS_ERROR, '当前博客已取消点赞');
            } else {
                likeBlog = likeBlog.filter(function (i) {
                    return i != id;
                })
                // 博客喜欢数量加一、用户喜欢博客列表添加
                //;
                const blogSql = `update blog set likeCount = likeCount - 1 where id = ?;
                                 update users set likeBlog = ? where userId = ?;`;
                db.query(blogSql, [id, JSON.stringify(likeBlog), userId], (err, results) => {
                    if (err) return res.err(SYSTEM_ERROR, 1);
                    if (results[1].affectedRows != 1) {
                        return res.err(SYSTEM_ERROR);
                    }
                    return res.sm('取消点赞成功')
                })

            }
        }

    })
}

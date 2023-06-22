// 引入自定义的错误码和数据库实例
const {SYSTEM_ERROR, NULL_ERROR} = require('../../../common/errorCode');
const db = require('../../../db/index')

// 定义一个 main 函数，该函数接收 req 和 res 两个参数
exports.main = (req, res) => {
    // 从请求体中获取博客 ID
    const {blogId} = req.body;
    // 如果博客 ID 不存在或者小于 0，返回 NULL_ERROR 错误码
    if (!blogId || blogId < 0) {
        return res.err(NULL_ERROR);
    }

    // 构建 SQL 查询语句，查询博客的评论列表
    const sql = `select * from blog_comment where blogId = ? and isDelete = 0`
    db.query(sql, blogId, async (err, results) => {
        if (err) return res.err(SYSTEM_ERROR);

        // 定义一个 promises 数组，用于存储每个查询评论回复的 Promise
        const promises = [];
        for (let i = 0; i < results.length; i++) {
            const id = results[i].id;

            // 构建 SQL 查询语句，查询评论的回复列表
            const sql = `select * from blog_comment_reply where blogCommentId = ?  and isDelete = 0`

            // 定义一个 Promise，查询评论回复并将结果存入对应的评论对象中
            const promise = new Promise((resolve, reject) => {
                db.query(sql, id, (err, result) => {
                    if (err) {
                        console.log(err);
                        // 如果查询出错，返回 SYSTEM_ERROR 错误码
                        return reject(SYSTEM_ERROR);
                    }
                    results[i].replyList = result;
                    resolve();
                })
            });

            // 将 Promise 添加进 promises 数组
            promises.push(promise);
        }

        // 等待所有 Promise 完成后，将查询到的评论列表对象返回给客户端
        await Promise.all(promises);

        return res.success(results);
    })
}


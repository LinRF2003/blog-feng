// 引入数据库文件   
const db = require('../../../db/index')
const {
    PARAMS_ERROR, SYSTEM_ERROR
} = require('../../../common/errorCode')

exports.main = async (req, res) => {
    let {id} = req.body;
    let {userId} = req.user;
    if (!id || id < 0) {
        res.err(PARAMS_ERROR);
    }

    // 查询点赞动态的用户列表
    const sql = `select userLikeList from dynamic where id = ?`;
    db.query(sql, id, (err, results) => {
        if (err) {
            console.log(err);
            res.err(SYSTEM_ERROR);
        }

        if (results.length < 1) {
            return res.err(PARAMS_ERROR, '动态id不存在')
        }

        if (!results[0].userLikeList || JSON.parse(results[0].userLikeList).length < 1) {
            const sql2 = `update dynamic set userLikeList = ? where id = ?`
            db.query(sql2, [`[${userId}]`, id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.err(SYSTEM_ERROR);
                }
                return res.sm('ok')
            })
            return;
        }
        let userLikeList = JSON.parse(results[0].userLikeList);
        // 判断 userLikeList 是否有当前用户id
        let flag = userLikeList.some(value => value == userId);
        if (flag) {
            userLikeList = userLikeList.filter(item => item !== userId); // [1,2,4,5]
        } else {
            userLikeList.push(userId);
        }
        userLikeList = JSON.stringify(userLikeList);
        // 改变点赞动态的用户列表
        const sql2 = `update dynamic set userLikeList = ? where id = ?`
        db.query(sql2, [userLikeList, id], (err, results) => {
            if (err) {
                console.log(err);
                return res.err(SYSTEM_ERROR);
            }

            return res.sm('ok')
        })
    })
}
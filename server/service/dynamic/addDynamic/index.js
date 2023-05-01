// 引入数据库文件   
const db = require('../../../db/index')
const {
    SYSTEM_ERROR, PARAMS_ERROR
} = require('../../../common/errorCode')

exports.main = async (req, res) => {
    // 获取客户端传送的数据
    const {
        content,
        imgUrlList
    } = req.body

    // 判断参数是否错误
    if (!content || content.length > 250) {
        return res.err(PARAMS_ERROR, '内容不能为空且不能大于250')
    }
    // 获取token中的用户信息
    const {
        userId,
    } = req.user;
    // 获取用户头像和用户名
    const userSql = `select userName, avatar from users where userId = ?`;
    await db.query(userSql, userId, (err, results) => {
        if(err){
            console.log(err)
            return res.err(SYSTEM_ERROR);
        }
        const {userName,avatar} = results[0];
        //定义博客数据
        let data = {
            content,
            userId,
            userName,
            avatar,
            imgUrlList
        }

        // 定义增加博客数据的sql语句
        const sql = `insert into dynamic set ?;`
        db.query(sql, data, (err, results) => {
            // 执行 SQL 语句失败
            if(err){
                console.log(err)
                return res.err(SYSTEM_ERROR);
            }
            if (results.affectedRows != 1) {
                return res.err(SYSTEM_ERROR, '添加失败')
            }
            return res.sm('发布动态成功');
        })
    })


}
// 引入数据库文件   
const db = require('../../../db/index')
const {NULL_ERROR, SYSTEM_ERROR, PARAMS_ERROR} = require("../../../common/errorCode");


exports.main = (req, res) => {
    console.log(req.body)
    // 取出 body 中的数据
    const {title, content, fatherTags, tags} = req.body;
    // 判断数据是否正确
    if (!title || !content || !fatherTags || !tags) {
        return res.err(NULL_ERROR);
    }
    // 判断标签是否大于5个
    if (!tags || eval(tags).length > 5) {
        return res.err(PARAMS_ERROR, '标签不能为空且不能大于5个');
    }
    // 判断父标签是否大于5个
    if (!fatherTags || eval(fatherTags).length > 3) {
        return res.err(PARAMS_ERROR, '父标签不能为空且不能大于3个');
    }
    const {userName, userId, avatar} = req.user;
    // 定义sql语句
    const sql = `insert into questions set ?`;
    // 定义添加问题的数据
    const data = {
        title, content, fatherTags, tags, userName, userId, avatar
    }
    db.query(sql, data, (err, results) => {
        if (err) {
            console.log(err)
            return res.err(SYSTEM_ERROR);
        }
        res.sm('添加问题成功')
    })
}


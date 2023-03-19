// 引入数据库文件   
const db = require('../../../db/index')
const {NULL_ERROR, SYSTEM_ERROR, PARAMS_ERROR} = require("../../../common/errorCode");


exports.main = (req, res) => {
    console.log(req.body)
    // 取出 body 中的数据
    const {title, content, fatherTags, tags, markdownContent, editorType = 0} = req.body;
    // 判断数据是否正确
    if (!title || !content || !fatherTags || !tags) {
        return res.err(NULL_ERROR);
    }
    // 判断标签是否大于5个
    if (eval(tags).length == 0 || eval(tags).length > 5) {
        return res.err(PARAMS_ERROR, '标签不能为空且不能大于5个');
    }
    // 判断父标签是否大于5个
    if (!fatherTags || eval(fatherTags).length > 3) {
        return res.err(PARAMS_ERROR, '父标签不能为空且不能大于3个');
    }
    // 判断编辑器类型
    if (!(editorType == 1 || editorType == 0)) {
        return res.err(PARAMS_ERROR, 'editorType 需为 1 或 0')
    }
    // 编辑器为markdwon判断是否传了markdown内容
    if (editorType == 1 && !markdownContent) {
        return res.err(NULL_ERROR, 'markdown编辑器下markdown内容不能为空');
    }
    const {userName, userId, avatar} = req.user;
    let str = content.replace(/<[^<>]+>/g, "");
    str = str.replace(/\s*/g, "");
    const summary = str.substring(0, 200);
    // 定义sql语句
    const sql = `insert into questions set ?`;
    // 定义添加问题的数据
    const data = {
        title, content, fatherTags, tags, userName, userId, avatar,summary
    }
    db.query(sql, data, (err, results) => {
        if (err) {
            console.log(err)
            return res.err(SYSTEM_ERROR);
        }
        res.sm('添加问题成功')
    })
}


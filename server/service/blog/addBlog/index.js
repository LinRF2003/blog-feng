// 引入数据库文件   
const db = require('../../../db/index')
const {
    NULL_ERROR, SYSTEM_ERROR, PARAMS_ERROR
} = require('../../../common/errorCode')

exports.main = async (req, res) => {
    // 获取token中的用户信息
    const {
        userId,
        userName
    } = req.user;
    // 获取客户端传送的数据
    const {
        title,
        content,
        tags,
        fatherTags,
        editorType,
        type,
        markdownContent,
        reprintUrl,
        allowComment, // 是否可以评论
        cover, // 封面
        summary // 博客摘要
    } = req.body
    // console.log(body);
    // 判断参数是否错误
    if (!title) {
        return res.err(NULL_ERROR, '标题不能为空')
    }
    if (!content) {
        return res.err(NULL_ERROR, '内容不能为空')
    }
    // 判断编辑器类型
    if (!(editorType == 1 || editorType == 0)) {
        return res.err(PARAMS_ERROR, 'editorType 需为 1 或 0')
    }
    // 判断文章类型
    if (!(type == 1 || type == 0)) {
        return res.err(PARAMS_ERROR, 'type 需为 1 或 0')
    }
    // 判断摘要是否为空且长度不大于200
    if (!summary || summary.length > 200) {
        return res.err(PARAMS_ERROR, '摘要不能为空且不能大于200')
    }
    // 编辑器为markdwon判断是否传了markdown内容
    if (editorType == 1 && !markdownContent) {
        return res.err(NULL_ERROR, 'markdown编辑器下markdown内容不能为空');
    }
    // 判断类型未转载时转载地址是否为空
    if (type == 1 && !reprintUrl) {
        if (reprintUrl.length > 200) {
            return res.err(PARAMS_ERROR, '转载地址不能大于200');
        }
        return res.err(NULL_ERROR, '类型为转载时转载地址不能为空');
    }

    // 判断标签是否大于5个
    if (!tags || eval(tags).length > 5) {
        return res.err(PARAMS_ERROR, '标签不能为空且不能大于5个');
    }
    // 判断父标签是否大于5个
    if (!fatherTags || eval(fatherTags).length > 3) {
        return res.err(PARAMS_ERROR, '父标签不能为空且不能大于3个');
    }

    // 定义博客数据
    let data = {
        title,
        content,
        userId,
        userName,
        cover: cover || null,
        allowComment: allowComment || 1,
        summary,
        editorType,
        markdownContent: markdownContent || null,
        type,
        reprintUrl: reprintUrl || null,
        tags,
        fatherTags
    }

    // 定义增加博客数据的sql语句
    const sql = `insert into blog set ?;`
    await db.query(sql, data, (err, results) => {
        // 执行 SQL 语句失败
        if (err) { return res.err(SYSTEM_ERROR) };
        if (results.affectedRows != 1) { return res.err(SYSTEM_ERROR, '发布失败') };
        // 博客数量加一
        const sql = `update users set blogCount = blogCount + 1 where userId = ${userId}`;
        db.query(sql, (err, results) => {
            console.log(4);
            if (err) { return res.err(SYSTEM_ERROR) };
            if (results.affectedRows != 1) { return res.err(SYSTEM_ERROR, '发布失败') };

            return res.sm('发布博客成功');
        })
    })

}
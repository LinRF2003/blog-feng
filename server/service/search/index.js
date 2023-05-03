const {getPage} = require("../methods");
const {PARAMS_ERROR, NULL_ERROR} = require("../../common/errorCode");


exports.main = (req, res) => {
    let {
        pageSize = 10, pageNo = 1, content, category
    } = req.body;
    if (!content) return res.err(NULL_ERROR);
    pageSize = parseInt(pageSize);
    pageNo = parseInt(pageNo);
    //
    if (category !== 'blog' && category !== 'question' && category !== 'user' && category !== 'dynamic') {
        return res.err(PARAMS_ERROR, '分类错误')
    }
    // 判断需要获取的分页类型
    // 定义sql
    let sql;
    if (category === 'blog') {
        // 定义sql
        sql = `select * from blog where concat(title,content,summary,fatherTags,tags) like '%${content}%' and isDelete = 0 order by createTime desc limit ?,?;
    select count(*) count from blog where concat(title,content,summary,fatherTags,tags) like '%${content}%' and isDelete = 0;`
    } else if (category === 'question') {
        // 定义sql
        sql = `select * from questions where concat(title,content,summary,fatherTags,tags) like '%${content}%' and isDelete = 0 order by createTime desc limit ?,?;
    select count(*) count from questions where concat(title,content,summary,fatherTags,tags) like '%${content}%' and isDelete = 0;`
    } else if (category === 'dynamic') {
        // 定义sql
        sql = `select * from dynamic where content like '%${content}%' and isDelete = 0 order by createTime desc limit ?,?;
    select count(*) count from dynamic where content like '%${content}%' and isDelete = 0;`
    } else if (category === 'user') {
        // 定义sql
        sql = `select userId,userName,introduction,avatar,sex from users where concat(userName,sex,introduction) like '%${content}%' and isDelete = 0 order by createTime desc limit ?,?;
    select count(*) count from users where concat(userName,sex,introduction) like '%${content}%' and isDelete = 0;`
    }

    getPage(res, sql, pageNo, pageSize);


}


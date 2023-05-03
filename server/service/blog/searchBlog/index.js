
const {NULL_ERROR} = require("../../../common/errorCode");
const {getPage} = require("../../methods/index");


exports.main = (req, res) => {
    let {
        pageSize = 10, pageNo = 1, content
    } = req.body;
    if (!content) return res.err(NULL_ERROR);
    pageSize = parseInt(pageSize);
    pageNo = parseInt(pageNo);

    // 定义sql
    const sql = `select * from blog where concat(title,content,summary,fatherTags,tags) like concat('%${content}%') and isDelete = 0 order by createTime desc limit ?,?;
    select count(*) count from blog where concat(title,content,summary,fatherTags,tags) like concat('%${content}%') and isDelete = 0;`
    getPage(res,sql, pageNo, pageSize);
}


const { getPage } = require("../../methods");
// order 排序类型
exports.main = async (req, res) => {
    let {
        pageSize = 10, pageNo = 1, tags = 'javascript|html|css|vue|react|node|java|python'
    } = req.body;
    pageSize = parseInt(pageSize);
    pageNo = parseInt(pageNo);
    if (tags === 'Node.js') {
        tags = 'nodejs'
    }

    let sql = `select id,title,cover,summary,views,commentCount,createTime,tags from blog where tags REGEXP "${tags}" and userId = 24 and isDelete = 0 order by createTime desc limit ?,?;
    select count(*) count from blog where tags  REGEXP "${tags}" and userId = 24 and isDelete = 0;`

    await getPage(res, sql, pageNo, pageSize);
}

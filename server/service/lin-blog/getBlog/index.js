const {getPage} = require("../../methods");
// order 排序类型
exports.main = async (req, res) => {
    let {
        pageSize = 10, pageNo = 1,tags = 'javascript|html|css|vue|react|node'
    } = req.body;
    pageSize = parseInt(pageSize);
    pageNo = parseInt(pageNo);
    console.log(tags)

    let sql = `select id,title,cover,summary,views,commentCount,createTime,tags from blog where tags  REGEXP "${tags}" and userId = 23 and isDelete = 0;
                     select count(*) count from blog where tags  REGEXP "${tags}" and userId = 23 and isDelete = 0;`

    await getPage(res, sql, pageNo, pageSize);
}

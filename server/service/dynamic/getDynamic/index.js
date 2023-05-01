const {getPage} = require("../../methods");
// order 排序类型
exports.main = async (req, res) => {
    let {
        pageSize = 10, pageNo = 1, order = 'new'
    } = req.body;
    pageSize = parseInt(pageSize);
    pageNo = parseInt(pageNo);
    let sql = '';
    if (order === 'hot') {
        sql = `select * from dynamic where isDelete = 0 order by views desc, createTime desc limit ?,?;
                     select count(*) count from dynamic where isDelete = 0;`

    } else {
        sql = `select * from dynamic where isDelete = 0 order by createTime desc limit ?,?;
        select count(*) count from dynamic where isDelete = 0`
    }
    await getPage(res, sql, pageNo, pageSize);
}
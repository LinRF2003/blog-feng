// 引入数据库文件
const db = require('../../../db/index')

const {
    SYSTEM_ERROR, PARAMS_ERROR
} = require('../../../common/errorCode')
const {getPage} = require("../../methods");
// order 排序类型

exports.main = async (req, res) => {
    let {
        pageSize = 10, pageNo = 1, id
    } = req.body;
    if (!id || id < 0) {
        return res.err(PARAMS_ERROR, 'id错误');
    }
    pageSize = parseInt(pageSize);
    pageNo = parseInt(pageNo);

    const sql = `select * from questions where isDelete = 0 and userId = ${id} order by createTime desc limit ?,?;
        select count(*) count from questions where isDelete = 0 and userId = ${id}`
    await getPage(res, sql, pageNo, pageSize);


}
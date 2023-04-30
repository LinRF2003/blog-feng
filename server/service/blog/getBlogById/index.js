// 引入数据库文件   
const {PARAMS_ERROR} = require('../../../common/errorCode')

const {getPage} = require("../../methods");

exports.main = async (req, res) => {

    let {
        pageSize = 10, pageNo = 1,id
    } = req.body;
    if (!id || id < 0) {
        return res.err(PARAMS_ERROR, 'id错误');
    }
    pageSize = parseInt(pageSize);
    pageNo = parseInt(pageNo);
    const sql = `select * from blog where userId = ${id} and isDelete = 0 order by views desc, createTime desc limit ?,?; 
                    select count(*) count from blog  where userId = ${id} and  isDelete = 0;`
    await getPage(res, sql, pageNo, pageSize);

}


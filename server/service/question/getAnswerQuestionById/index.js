// 引入数据库文件
const db = require('../../../db/index')

const {
   PARAMS_ERROR, SYSTEM_ERROR
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

    // 定义sql语句 获取评论过的博客信息
    const sql = `select distinct questionId from question_answer where userId = ${id}`
    db.query(sql, async (err, results) => {
        if (err) {
            console.log(err);
            res.err(SYSTEM_ERROR);
        }
        if (results.length < 1) {
            return res.success({
                pageNo,
                pageSize,
                totalCount: 0,
                pageTotal: 0,
                list: [],
            })
        }
        let idStr = ''
        for (const item of results) {
            idStr += `${item.questionId},`
        }
        idStr = idStr.substring(0, idStr.length - 1);
        const pageSql = `select * from questions where id in (${idStr}) and isDelete = 0 order by views desc, createTime desc limit ?,?;
                    select count(*) count from questions where id in (${idStr}) and  isDelete = 0;`
        await getPage(res, pageSql, pageNo, pageSize)
        // res.send({ code: 200, data: results })
    })

}
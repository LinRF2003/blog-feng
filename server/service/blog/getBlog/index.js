// 引入数据库文件   
const db = require('../../../db/index')

const {
    SYSTEM_ERROR
} = require('../../../common/errorCode')
// order 排序类型
exports.main = async (req, res) => {
    const {
        pageSize = 10, pageNo = 1, order = 'new'
    } = req.body;
    if (order === 'hot') {
        const sql = `select * from blog where isDelete = 0 order by views desc, createTime desc limit ?,?;
                     select count(*) count from blog where isDelete = 0;`
        db.query(sql, [(pageNo - 1) * pageSize, pageSize], (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                return res.err(SYSTEM_ERROR);
            }
            let pageTotal = parseInt(results[1][0].count / pageSize) + 1;
            res.successs({
                data: {
                    pageNo,
                    pageSize,
                    totalCount: results[1][0].count,
                    pageTotal,
                    list: results[0],

                },
                move: (pageNo + 1) * pageSize > pageTotal ? false : true
            })
        })
    } else {
        const sql = `select * from blog where isDelete = 0 order by createTime desc limit ?,?;
        select count(*) count from blog where isDelete = 0`
        await db.query(sql, [(pageNo - 1) * pageSize, pageSize], (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                return res.err(SYSTEM_ERROR)
            }
            let pageTotal = parseInt(results[1][0].count / pageSize) + 1;
            // console.log(results[1][0].count);
            res.successs({
                data: {
                    pageNo,
                    pageSize,
                    totalCount: results[1][0].count,
                    pageTotal,
                    list: results[0],

                },
                move: (pageNo + 1) * pageSize > pageTotal ? false : true
            })
        })
    } 
}
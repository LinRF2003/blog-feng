// 引入数据库文件   
const db = require('../../../db/index')

const {
    SYSTEM_ERROR
} = require('../../../common/errorCode')
// order 排序类型
exports.main = async (req, res) => {
    let {
        pageSize = 10, pageNo = 1, order = 'new', tag = '全部', fatherTag = '全部'
    } = req.body;
    pageSize = parseInt(pageSize);
    pageNo = parseInt(pageNo);
    if (tag === '全部') {
        tag = '';
    }
    if (fatherTag === '全部') {
        fatherTag = '';
    }
    // 执行sql语句方法
    const execute = async (sql) => {
        await db.query(sql, [(pageNo - 1) * pageSize, pageSize], (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                console.log(err)
                return res.err(SYSTEM_ERROR);
            }
            let totalCount = results[1][0].count;// 符合条件的总条数
            if (totalCount === 0) {
                return res.successs({
                    data: {
                        pageNo,
                        pageSize,
                        totalCount:0,
                        pageTotal:0,
                        list: [],
                    },
                    move: false
                })
            }
            let pageTotal = Math.ceil(totalCount / pageSize);
            return res.successs({
                data: {
                    pageNo,
                    pageSize,
                    totalCount,
                    pageTotal,
                    list: results[0],
                },
                move: (pageNo + 1) * pageSize <= pageTotal
            })
        })
    }
    if (order === 'hot') {
        const sql = `select * from blog where isDelete = 0 and tags like '%${tag}%' and fatherTags like '%${fatherTag}%' order by views desc, createTime desc limit ?,?;
                     select count(*) count from blog where isDelete = 0 and tags like '%${tag}%' and fatherTags like '%${fatherTag}%';`
        execute(sql);

    } else {
        const sql = `select * from blog where isDelete = 0 and tags like '%${tag}%' and fatherTags like '%${fatherTag}%' order by createTime desc limit ?,?;
        select count(*) count from blog where isDelete = 0 and tags like '%${tag}%' and fatherTags like '%${fatherTag}%'`
        execute(sql);
    }


}
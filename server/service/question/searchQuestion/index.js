// 引入数据库文件   
const db = require('../../../db/index')
const {NULL_ERROR, SYSTEM_ERROR} = require("../../../common/errorCode");


exports.main = (req, res) => {
    let {
        pageSize = 10, pageNo = 1, content
    } = req.body;
    if (!content) return res.err(NULL_ERROR);
    pageSize = parseInt(pageSize);
    pageNo = parseInt(pageNo);
    console.log(content)
    // 定义sql
    const sql = `select * from blog where concat(title,content,summary,fatherTags,tags) like concat('%${content}%') and isDelete = 0 order by createTime desc limit ?,?;
    select count(*) count from blog where concat(title,content,summary,fatherTags,tags) like concat('%',?,'%') and isDelete = 0;`

    db.query(sql, [ (pageNo - 1) * pageSize, pageSize, content], (err, results) => {

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
                    totalCount: 0,
                    pageTotal: 0,
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


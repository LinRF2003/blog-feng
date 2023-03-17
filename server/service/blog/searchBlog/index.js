// 引入数据库文件   
const db = require('../../../db/index')


exports.main = (req, res) => {
    if (!req.body.content) return res.status(500).send('请求参数不能为空')
    const sql = `select * from blog where concat(title,content,summary,cate_name) like concat('%',?,'%') and is_delete = 0 order by create_time desc limit ?,?;
    select count(*) count from blog where concat(title,content,summary,cate_name) like concat('%',?,'%') and is_delete = 0;`
    const pageSize = parseInt(req.body.pageSize) || PAGESIZE;
    const pageNo = parseInt(req.body.pageNo) || PAGENO;
    db.query(sql, [req.body.content, pageNo, pageSize, req.body.content], (err, results) => {

        if (err) return res.status(500).send(err)

        res.send({
            pageNo: pageNo,
            pageSize: pageSize,
            totalCount: results[1][0].count,
            pageTotal: parseInt(results[1][0].count / pageSize) + 1,
            list: results[0],
        })
    })
}


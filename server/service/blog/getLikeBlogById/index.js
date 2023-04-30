// 引入数据库文件
const {SYSTEM_ERROR, PARAMS_ERROR} = require('../../../common/errorCode')
const {getPage} = require("../../methods");
const db = require("../../../db");


exports.main = (req, res) => {
    let {
        pageSize = 10, pageNo = 1, id
    } = req.body;
    if (!id || id < 0) {
        return res.err(PARAMS_ERROR, 'id错误');
    }
    pageSize = parseInt(pageSize);
    pageNo = parseInt(pageNo);
    // 获取用户喜欢的博客列表
    const sql = `select likeBlog from users where userId = ?`;

    db.query(sql, id, async (err, results) => {
        if(err){
            console.log(err);
            res.err(SYSTEM_ERROR);
        }
        let likeBlog = results[0].likeBlog;
        // 没有数据
        if(!likeBlog || JSON.parse(likeBlog).length < 1){
            return res.success({
                pageNo,
                pageSize,
                totalCount: 0,
                pageTotal: 0,
                list: [],
            })
        }
        let likeBlogStr = likeBlog.substring(1,likeBlog.length-1)
        const pageSql = `select * from blog where id in (${likeBlogStr}) and isDelete = 0 order by views desc, createTime desc limit ?,?;
                    select count(*) count from blog where id in (${likeBlogStr}) and  isDelete = 0;`
        await getPage(res, pageSql, pageNo, pageSize)

    })
}


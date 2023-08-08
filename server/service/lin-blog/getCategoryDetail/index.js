const db = require("../../../db/index");
const { SYSTEM_ERROR } = require("../../../common/errorCode");
// 引入category文件
const { categoryList } = require('../getBlogCategoty/categoryList')
// order 排序类型
exports.main = async (req, res) => {
    let {
        pageSize = 10, pageNo = 1, tags
    } = req.body;
    pageSize = parseInt(pageSize);
    pageNo = parseInt(pageNo);

    let sql = `select id,title,cover,summary,views,commentCount,createTime,tags from blog where tags  REGEXP "${tags}" and userId = 24 and isDelete = 0 limit ?,?;
                     select count(*) count from blog where tags  REGEXP "${tags}" and userId = 24 and isDelete = 0;`

    // 博客列表数据
    let blogData = {};
    // 定义一个 Promise，查询评论回复并将结果存入对应的评论对象中
    const promise = new Promise((resolve, reject) => {

        db.query(sql, [(pageNo - 1) * pageSize, pageSize], (err, results) => {

            console.log(results);
            // 执行 SQL 语句失败
            if (err) {
                console.log(err)
                return res.err(SYSTEM_ERROR);
            }
            let totalCount = results[1][0].count;// 符合条件的总条数
            if (totalCount === 0) {
                blogData = {
                    pageNo,
                    pageSize,
                    totalCount: 0,
                    pageTotal: 0,
                    list: [],
                }
            } else {
                let pageTotal = Math.ceil(totalCount / pageSize);
                blogData = {
                    pageNo,
                    pageSize,
                    totalCount,
                    pageTotal,
                    list: results[0],
                }
            }

            resolve();
        })
    });
    await promise;
    const categoryData = categoryList.find(item => {
        return item.name === tags
    }) || {};
    return res.successs({ blogData, categoryData })
}

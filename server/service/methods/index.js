// 执行sql语句方法
const db = require("../../db/index");
const {SYSTEM_ERROR} = require("../../common/errorCode");
const getPage = async (res,sql, pageNo, pageSize) => {
    await db.query(sql, [(pageNo - 1) * pageSize, pageSize], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err)
            return res.err(SYSTEM_ERROR);
        }
        // console.log('methoid')
        // console.log(results)
        let totalCount = results[1][0].count;// 符合条件的总条数
        if (totalCount === 0) {
            return res.success({
                pageNo,
                pageSize,
                totalCount: 0,
                pageTotal: 0,
                list: [],
            })
        }
        let pageTotal = Math.ceil(totalCount / pageSize);
        return res.success({
            pageNo,
            pageSize,
            totalCount,
            pageTotal,
            list: results[0],
        })
    })

}

module.exports = {
    getPage
}
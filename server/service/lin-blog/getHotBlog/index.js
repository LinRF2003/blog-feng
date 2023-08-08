const db = require("../../../db")

// order 排序类型
exports.main = async (req, res) => {
    let sql = `select id,title,views from blog where  userId = 24 and isDelete = 0 order by views desc limit 0,10;`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.err(SYSTEM_ERROR);
        }
        return res.success(result);
    })
}

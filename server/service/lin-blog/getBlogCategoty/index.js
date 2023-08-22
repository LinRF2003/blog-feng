// 引入category文件
const db = require('../../../db');
const { categoryList } = require('./categoryList')

exports.main = async (req, res) => {
    const promises = [];
    for (let index = 0; index < categoryList.length; index++) {
        const tags = categoryList[index].name;
        let promise;
        // 查询 java 数据时需要把 javascript 的数据去除

        if (tags === 'Java') {
            let sql = `select count(*) count from blog where tags like "%${tags}%" and userId = 24 and isDelete = 0;
            select count(*) count from blog where tags like "%javascript%" and userId = 24 and isDelete = 0;`
            promise = new Promise((resolve, reject) => {

                db.query(sql, (err, result) => {

                    if (err) {
                        console.log(err);
                        return res.err(SYSTEM_ERROR);
                    }

                    categoryList[index].count = result[0].count - result[1].count;
                    console.log(categoryList[index]);
                    resolve();
                })
            })
        } else {
            let sql = `select count(*) count from blog where tags like "%${tags}%" and userId = 24 and isDelete = 0;`
            promise = new Promise((resolve, reject) => {

                db.query(sql, (err, result) => {

                    if (err) {
                        console.log(err);
                        return res.err(SYSTEM_ERROR);
                    }

                    categoryList[index].count = result[0].count;
                    console.log(categoryList[index]);
                    resolve();
                })
            })
        }



        promises.push(promise);
    }
    await Promise.all(promises);

    return res.success(categoryList);
}

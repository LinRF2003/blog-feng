// 引入category文件
const categoryList = require('./categoryList')

exports.main = async (req, res) => {
    res.successs(categoryList);
}

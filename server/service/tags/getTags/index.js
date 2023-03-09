// 引入tags文件
const tags = require('../tagsMap')

exports.main = async (req, res) => {
    res.successs(tags)
}


// 引入数据库文件   
const db = require('../../../db/index')

const {
    SYSTEM_ERROR
} = require('../../../common/errorCode')
const {getPage} = require("../../methods");
// order 排序类型
exports.main = async (req, res) => {
    let {
        pageSize = 10, pageNo = 1, order = 'new', tag = '全部', fatherTag = '全部'
    } = req.body;
    pageSize = parseInt(pageSize);
    pageNo = parseInt(pageNo);
    if (tag === '全部' || tag === '推荐') {
        tag = '';
    }
    if (fatherTag === '全部' || fatherTag === '推荐') {
        fatherTag = '';
    }
    let sql = '';
    if (order === 'hot') {
        sql = `select * from blog where isDelete = 0 and tags like '%${tag}%' and fatherTags like '%${fatherTag}%' order by views desc, createTime desc limit ?,?;
                     select count(*) count from blog where isDelete = 0 and tags like '%${tag}%' and fatherTags like '%${fatherTag}%';`

    } else {
        sql = `select * from blog where isDelete = 0 and tags like '%${tag}%' and fatherTags like '%${fatherTag}%' order by createTime desc limit ?,?;
        select count(*) count from blog where isDelete = 0 and tags like '%${tag}%' and fatherTags like '%${fatherTag}%'`
    }
    await getPage(res, sql, pageNo, pageSize);
}
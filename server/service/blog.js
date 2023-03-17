// 引入数据库文件   
const db = require('../db/index')


const PAGESIZE = 10 // 默认每页条数 
const PAGENO = 1    // 默认第几页 


// 保存博客
exports.saveBlog = (req, res) => {
    // 获取token中的用户信息
    const user = req.user
    // 获取客户端传送的数据
    const body = req.body
    // console.log(body);
    // 判断参数是否错误
    if (!(body.title && body.content && body.categoryId && body.editorType === '' && body.type === '')) {
        return res.status(500).send('必填参数不能为空')
    }
    // 编辑器为markdwon判断是否传了markdown内容
    if (body.editorType === 1 && !body.markdownContent) {
        return res.status(500).send('markdwon编辑器markdown内容不能为空')
    }
    // 判断类型未转载时转载地址是否为空
    if (body.type === 1 && !body.reprintUrl) {
        return res.status(500).send('类型为转载时转载地址不能为空')
    }

    // 根据分类ID、用户id 查询对应分类、用户的名 
    const cateSql = `select cate_name from category where cate_id = ?;
                    select user_name from users where user_id = ?`
    db.query(cateSql, [body.categoryId, user.user_id], (err, results) => {

        // 执行 SQL 语句失败
        if (err) return res.status(500).send(err)
        // 定义博客数据
        let data = {
            title: body.title,
            content: body.content,
            cate_id: body.categoryId,
            cate_name: results[0][0].cate_name,
            user_id: user.user_id,
            user_name: results[1][0].user_name,
            cover: body.cover || null,
            allow_comment: body.allowComment || 1,
            summary: body.summary,
            editorType: body.editorType,
            markdownContent: body.markdownContent || null,
            type: body.type,
            reprintUrl: body.reprintUrl || null
        }
        // 判断传过来的值有没有blogId 有则未修改博客、没有就增加博客
        if (body.blogId) {

            // 定义修改博客数据的sql语句
            const sql = 'update blog set ? where blog_id = ?'

            // 
            db.query(sql, [data, body.blogId], (err, results) => {
                // 执行 SQL 语句失败
                if (err) return res.status(500).send(err)
                if (results.changedRows !== 1) res.send('数据不存在，修改失败')
                res.send('修改博客成功')
            })

        } else {


            // 定义增加博客数据的sql语句
            const sql = `insert into blog set ?;
            update category set blog_count = blog_count + 1 where cate_id = ?;
            update users set blog_count = blog_count + 1 where user_id = ?;`

            // 
            db.query(sql, [data, data.cate_id, data.user_id], (err, results) => {
                // 执行 SQL 语句失败
                if (err) return res.status(500).send(err)
                return res.send('发布博客成功')
            })
        }
    })
}

// 删除博客
// 减少对应分类、用户的博客数量
exports.deleteBlog = (req, res) => {
    // 通过id查询对应的分类和用户id
    const sql = `select cate_id,user_id from blog where blog_id = ?`
    db.query(sql, req.body.blogId, (err, results) => {
        let user_id = results[0].user_id;
        let cate_id = results[0].cate_id;

        if (err) res.status(500).send(err)
        // 定义删除博客的sql语句
        const sql = `update blog set is_delete = 1 where blog_id = ?;
        update category set blog_count = blog_count - 1 where cate_id = ?;
        update users set blog_count = blog_count - 1 where user_id = ?;`
        db.query(sql, [req.body.blogId, cate_id, user_id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.status(500).send(err)

            if (results.affectedRows == 0) return res.send('数据不存在已被删除')
            res.send('删除成功')
        })
    })

}

// 添加或减少点赞数
exports.like =
// 获取我的博客
exports.myBlog = (req, res) => {
    const pageSize = parseInt(req.body.pageSize) || PAGESIZE;
    const pageNo = parseInt(req.body.pageNo) || PAGENO;
    // 定义获取我的博客的sql语句
    const sql = `select * from blog where user_id = ? and is_delete = 0 order by create_time desc limit ?,?;
    select count(*) count from blog where user_id = ? and is_delete = 0`

    db.query(sql, [req.user.user_id, (pageNo - 1) * pageSize, pageSize, req.user.user_id], (err, results) => {

        if (err) return res.send(err);
        res.send({
            pageNo: pageNo,
            pageSize: pageSize,
            totalCount: results[1][0].count,
            pageTotal: parseInt(results[1][0].count / pageSize) + 1,
            list: results[0],
        })
    })
}

// 获取博客评论
exports.getBlogComment = (req, res) => {
    // console.log(req.body);
    const sql = `select * from blog_comment where blog_id = ? order by create_time desc`
    db.query(sql, req.body.blogId, (err, results) => {
        if (err) res.status(500).send(err)
        res.send(results)
    })
}

// 获取喜欢博客列表
// SELECT * FROM blog where FIND_IN_SET(blog_id,'1,3,5,6')
// select blog_id from blog_like where user_id = 1;
exports.myLikeBlog = (req, res) => {
    const sql = `select blog_id from blog_like where user_id = ?`
    const pageSize = parseInt(req.body.pageSize) || PAGESIZE;
    const pageNo = parseInt(req.body.pageNo) || PAGENO;
    db.query(sql, req.user.user_id, (err, results) => {
        if (err) res.status(500).send(err)
        let strlist = results.map((obj) => { return obj.blog_id }).join(",");

        const sql = `SELECT * FROM blog where FIND_IN_SET(blog_id, ?) and is_delete = 0 order by create_time desc limit ?,?; select count(*) count from blog where FIND_IN_SET(blog_id, ?)`
        db.query(sql, [strlist, (pageNo - 1) * pageSize, pageSize, strlist], (err, results) => {
            if (err) res.status(500).send(err)

            res.send({
                pageNo: pageNo,
                pageSize: pageSize,
                totalCount: results[1][0].count,
                pageTotal: parseInt(results[1][0].count / pageSize) + 1,
                list: results[0],
            })
        })

    })
}


// 获取我评论的列表
exports.myCommentBlog = (req, res) => {
    const sql = `select distinct blog_id from blog_comment where user_id = ?`
    db.query(sql, req.user.user_id, (err, results) => {
        if (err) res.status(500).send(err)
        let strlist = results.map((obj) => { return obj.blog_id }).join(",");
        const pageSize = parseInt(req.body.pageSize) || PAGESIZE;
        const pageNo = parseInt(req.body.pageNo) || PAGENO;
        const sql = `SELECT * FROM blog where FIND_IN_SET(blog_id, ?) and is_delete = 0 order by create_time desc limit ?,?;select count(*) count from blog where FIND_IN_SET(blog_id, ?)`
        db.query(sql, [strlist, (pageNo - 1) * pageSize, pageSize, strlist], (err, results) => {
            if (err) res.status(500).send(err)

            res.send({
                pageNo: pageNo,
                pageSize: pageSize,
                totalCount: results[1][0].count,
                pageTotal: parseInt(results[1][0].count / pageSize) + 1,
                list: results[0],
            })
        })

    })
}

// 增加浏览量 
exports.addViews = (req, res) => {

    const sql = `update blog set views = views + 1 where blog_id = ?`
    db.query(sql, req.body.blogId, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.status(500).send(err)

        if (results.affectedRows != 0) return res.send('增加失败')
        res.send('增加成功')
    })
}


// 获取已删除的博客
exports.getDeleteBlog = (req, res) => {
    const pageSize = parseInt(req.body.pageSize) || PAGESIZE;
    const pageNo = parseInt(req.body.pageNo) || PAGENO;
    const sql = `select * from blog where is_delete = 1 and user_id = ? order by create_time desc limit ?,?;
    select count(*) count from blog where is_delete = 1 and user_id = ?`
    db.query(sql, [req.user.user_id, (pageNo - 1) * pageSize, pageSize, req.user.user_id], (err, results) => {
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

// 还原回收站中的博客
exports.reductionBlog = (req, res) => {
    const sql = `select cate_id from blog where blog_id = ?`;
    db.query(sql, req.body.blogId, (err, results) => {

        if (err) return res.status(500).send(err)

        const sql = `update blog set is_delete = 0 where blog_id = ?;
        update users set blog_count = blog_count + 1 where user_id = ?;
        update category set blog_count = blog_count + 1 where cate_id = ?`;
        db.query(sql, [req.body.blogId, req.user.user_id, results[0].cate_id], (err, results) => {

            if (err) return res.status(500).send(err)
            res.send('还原成功')
        })
    })

}

// 永久删除博客
exports.shredFileBlog = (req, res) => {
    const sql = `delete from blog where blog_id = ?`;
    db.query(sql, req.body.blogId, (err, results) => {
        console.log(err);
        if (err) return res.status(500).send(err)
        res.send('删除成功')
    })
}

// 模糊查询
exports.search = (req, res) => {

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
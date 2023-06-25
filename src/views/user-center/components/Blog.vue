<template>
  <div class="my-blog" v-loading.fullscreen.lock="loading">
    <div v-for="item in blogList" :key="item.id" class="content">
      <div  class="blog-content">
        <BlogItem :blogInfo="item"></BlogItem>
      </div>
      <div class="operate" v-if="$route.params.id == $store.state.userInfo?.userId">
        <el-button type="primary" round @click="updateBlog(item.id)"
        >修改
        </el-button
        >
        <el-button type="danger" round @click="deleteBlog(item.id)"
        >删除
        </el-button
        >
        <el-dialog title="提示" :visible.sync="dialogShow" width="30%">
          <span>你确定删除嘛</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogShow = false">取 消</el-button>
            <el-button type="primary" @click="define">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <PaginationItem
        v-if="!loading"
        :pageNo="pageNo"
        :pageSize="2"
        :totalCount="totalCount"
        :pageTotal="pageTotal"
        @changePageNo="changePageNo"
    ></PaginationItem>
    <Null v-if="blogList.length == 0 && !loading"></Null>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogList: [],
      dialogShow: false, //删除对话框
      blogId: "",
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      pageTotal: 0,
      loading: false,
    };
  },
  methods: {
    // 获取博客列表
    async getBlogList() {
      this.loading = true;
      let result = await this.$Request(
          "/blog/getBlogById", {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            id: this.$route.params.id
          }
      );
      if (result.code === 200) {
        this.blogList = result.data.list;
        this.pageNo = result.data.pageNo;
        this.pageSize = result.data.pageSize;
        this.totalCount = result.data.totalCount;
        this.pageTotal = result.data.pageTotal;
        this.$emit("changeCount", 'blog', result.data.totalCount)
        this.loading = false;
      }
    },
    // 获取需要请求的页码数
    changePageNo(val) {
      this.pageNo = val;
      this.getBlogList();
    },
    // 修改博客按钮
    updateBlog(blogId) {
      console.log(blogId)
      this.$router.push({
        name: "编辑博客",
        params: {
          blogId: blogId,
        },
      });
    },

    // 删除博客
    async deleteBlog(blogId) {
      this.dialogShow = true;
      this.blogId = blogId;
    },

    // 确认删除
    async define() {
      this.dialogShow = false;

      let result = await this.$Request("/blog/del", {
        id: this.blogId,
      });
      if (result.code === 200) {
        this.$Message.success('删除成功')
        this.getBlogList();
      }
    },

  },
  mounted() {
    this.getBlogList();
  },
};
</script>

<style lang="scss" scoped>
.my-blog {
  display: flex;
  flex-direction: column;
  // margin-left: 150px;
  .top {
    padding: 10px 0 20px;

    .el-icon-arrow-left {
      cursor: pointer;
    }

    .n {
      display: inline-block;
      font-weight: 550;
      margin-left: 5px;
    }
  }

  .content {
    display: flex;

    .blog-content {
      width: 100%;
      background: #fff;
    }

    .operate {
      display: flex;
      align-items: center;
      width: 20%;
      background: #fff;
    }
  }
}

.el-button.is-round {
  border-radius: 20px;
  padding: 12px 15px;
}

.blog-item {
  padding: 0px 0 20px;
}
</style>
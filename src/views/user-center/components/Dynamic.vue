<template>
  <div class="my-blog" v-loading.fullscreen.lock="loading">
    <div v-for="item in blogList" :key="item.blogId" class="content">
      <div class="blog-content" >
        <DynamicItem :dynamicInfo="item"></DynamicItem>
      </div>
    </div>
    <PaginationItem
        v-if="!loading"
        :pageNo="pageNo"
        :pageSize="pageSize"
        :totalCount="totalCount"
        :pageTotal="pageTotal"
        @changePageNo="changePageNo"
    ></PaginationItem>
    <Null v-if="blogList.length === 0 && !loading"></Null>
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
    async getLikeBlogList() {
      this.loading = true;
      let result = await this.$Request(
          "/dynamic/getById", {
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
        this.$emit("changeCount", 'dynamic', result.data.totalCount)
        this.loading = false;
      }
    },
    // 获取需要请求的页码数
    changePageNo(val) {
      this.pageNo = val;
      this.getBlogList();
    },
  },
  mounted() {
    this.getLikeBlogList();
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
.dynamic-item{
  padding: 0 0 15px;
}
</style>
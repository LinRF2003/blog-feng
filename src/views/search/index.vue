<template>
  <div v-loading.fullscreen.lock="loading" class="box">
    <div class="search">
      <el-input
          placeholder="请输入内容"
          v-model="content"
          class="input"
          @keyup.enter.native="search"
          clearable
      >
        <el-button slot="append" icon="el-icon-search" @click="search"
        >搜一下
        </el-button
        >
      </el-input>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleTab">
      <el-tab-pane label="博客" name="blog">
        <div class="content" v-if="List.length > 0">
          <div v-for="item in List" :key="item.id">
            <BlogItem :blogInfo="item" :like="likeBlogList?likeBlogList.indexOf(item.id) !== -1:false"></BlogItem>
          </div>
        </div>

      </el-tab-pane>
      <el-tab-pane label="问答" name="question">
        <div class="content" v-if="List.length > 0">
          <div v-for="item in List" :key="item.id">
            <QuestionItem :questionInfo="item"></QuestionItem>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="动态" name="dynamic">
        <div class="content" v-if="List.length > 0">
          <div v-for="item in List" :key="item.id">
            <DynamicItem :dynamicInfo="item"></DynamicItem>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户" name="user">
        <div class="user-content" v-if="List.length > 0">
          <div v-for="item in List" :key="item.id">
            <UserItem :userInfo="item"></UserItem>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <PaginationItem
        :pageNo="pageNo"
        :pageSize="pageSize"
        :totalCount="totalCount"
        :pageTotal="pageTotal"
        @changePageNo="changePageNo"
    ></PaginationItem>
    <Null v-if="totalCount === 0&&!loading"></Null>
  </div>
</template>

<script>

export default {
  data() {
    return {
      List: [],
      content: this.$route.query.content,
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      pageTotal: 0,
      loading: false,
      likeBlogList: null,
      activeName: '', // 当前选中分类
    };
  },
  methods: {
    // 搜索方法
    async search() {
      this.loading = true;
      if (this.content === '') {
        return this.$Message.warning("请求数据不能为空");
      }
      // 搜索内容与之前相同，不做改变
      if (this.content === this.$route.query.text && this.activeName === this.$route.params.category && this.pageNo === this.$route.query.pageNo) {
        return;
      }
      this.List = [];
      this.totalCount = 0;
      // 改变路由地址
      this.$router.replace(`/search/${this.activeName}?text=${this.content}&pageNo=${this.pageNo}`);

      let result = await this.$Request("/search", {
        category: this.activeName,
        content: this.content,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      });

      if (result.code === 200) {
        this.List = result.data.list;
        this.pageNo = result.data.pageNo;
        this.pageSize = result.data.pageSize;
        this.totalCount = result.data.totalCount;
        this.pageTotal = result.data.pageTotal;
        this.loading = false;
      }
    },

    // 搜索方法
    async init() {
      this.loading = true;
      let result = await this.$Request("/search", {
        category: this.activeName,
        content: this.content,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      });

      if (result.code === 200) {
        this.List = result.data.list;
        this.pageNo = result.data.pageNo;
        this.pageSize = result.data.pageSize;
        this.totalCount = result.data.totalCount;
        this.pageTotal = result.data.pageTotal;
        this.loading = false;
      }
    },
    // 获取用喜欢的博客id列表
    async getBlogLikeList() {
      let result = await this.$Request("/blog/getLikeList");
      if (result.code === 200) {
        this.likeBlogList = result.data.likeBlog;
      }
    },
    // 获取当前列表页
    changePageNo(val) {
      console.log(val)
      this.pageNo = val;
      this.search();
    },
    // 改变分类
    handleTab(tab, event) {
      // 修改为第一页
      this.pageNo = 1;
      this.search();
    },
  },
  mounted() {
    this.getBlogLikeList();
    this.content = this.$route.query.text;
    // 改变分类
    this.activeName = this.$route.params.category;
    if (this.$route.query.text != '') {
      // 获取搜索列表
      this.init();
    }
  },
}
</script>

<style lang="scss" scoped>
.box {
  max-width: 1000px;
  margin: 0 auto 20px;
}

.search {
  //position: fixed;
  width: 750px;
  //left: calc(50% - 375px);
  margin: 0 auto;

  .input {
    height: 50px;
  }

  :deep(.el-input__inner) {
    height: 50px;
  }
}
.user-content{
  display: flex;
  flex-wrap: wrap;
  height: 510px;
}

</style>
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
        <div v-if="blogList.length > 0">
          <div class="content">
            <div v-for="item in blogList" :key="item.id">
              <BlogItem :blogInfo="item" :like="likeBlogList?likeBlogList.indexOf(item.id) != -1:false"></BlogItem>
            </div>
          </div>
          <PaginationItem
              :pageNo="pageNo"
              :pageSize="pageSize"
              :totalCount="totalCount"
              :pageTotal="pageTotal"
              @changePageNo="changePageNo"
          ></PaginationItem>
          <Null v-if="totalCount == 0"></Null>
        </div>
      </el-tab-pane>
      <el-tab-pane label="问答" name="question">
        <div v-if="questionList.length > 0">
          <div class="content">
            <div v-for="item in questionList" :key="item.id">
              <QuestionItem :questionInfo="item"
                            :like="likeBlogList?likeBlogList.indexOf(item.id) != -1:false"></QuestionItem>
            </div>
          </div>
          <PaginationItem
              :pageNo="pageNo"
              :pageSize="pageSize"
              :totalCount="totalCount"
              :pageTotal="pageTotal"
              @changePageNo="changePageNo"
          ></PaginationItem>
          <Null v-if="totalCount == 0"></Null>
        </div>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
import BlogItem from "@/components/BlogItem";
import QuestionItem from "@/components/QuestionItem";

export default {
  data() {
    return {
      blogList: [],
      content: this.$route.query.content,
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      pageTotal: 0,
      loading: false,
      likeBlogList: null,
      activeName: 'blog', // 当前选中分类
      questionList: []
    };
  },
  components: {
    BlogItem,
    QuestionItem
  },
  methods: {
    // 搜索方法
    async search() {
      if (this.content == '') {
        return this.$Message.warning("请求数据不能为空");
      }
      // 搜索内容与之前相同，不做改变
      if (this.content == this.$route.query.text && this.activeName == this.$route.params.category && this.pageNo == this.$route.query.pageNo) {
        return;
      }
      // 清空数据
      this.blogList = [];
      this.questionList = [];
      // 改变路由地址
      this.$router.replace(`/search/${this.activeName}?text=${this.content}&pageNo=${this.pageNo}`);
      this.loading = true;
      if (this.activeName === 'blog') {
        let result = await this.$Request("/blog/search", {
          content: this.content,
          pageSize: this.pageSize,
          pageNo: this.pageNo,
        });

        if (result.code === 200) {
          this.blogList = result.data.list;
          this.pageNo = result.data.pageNo;
          this.pageSize = result.data.pageSize;
          this.totalCount = result.data.totalCount;
          this.pageTotal = result.data.pageTotal;
          this.loading = false;
        }
      } else {
        let result = await this.$Request("/question/search", {
          content: this.content,
          pageSize: this.pageSize,
          pageNo: this.pageNo,
        });

        if (result.code === 200) {
          this.questionList = result.data.list;
          this.pageNo = result.data.pageNo;
          this.pageSize = result.data.pageSize;
          this.totalCount = result.data.totalCount;
          this.pageTotal = result.data.pageTotal;
          this.loading = false;
        }
      }

    },
    // 搜索方法
    async init() {
      // 改变路由地址
      this.$router.replace(`/search/${this.activeName}?text=${this.content}&pageNo=${this.pageNo}`);
      this.loading = true;
      if (this.activeName === 'blog') {

        let result = await this.$Request("/blog/search", {
          content: this.content,
          pageSize: this.pageSize,
          pageNo: this.pageNo,
        });

        if (result.code === 200) {
          this.blogList = result.data.list;
          this.pageNo = result.data.pageNo;
          this.pageSize = result.data.pageSize;
          this.totalCount = result.data.totalCount;
          this.pageTotal = result.data.pageTotal;
          this.loading = false;
        }
      } else {
        this.questionList = [];
        let result = await this.$Request("/question/search", {
          content: this.content,
          pageSize: this.pageSize,
          pageNo: this.pageNo,
        });

        if (result.code === 200) {
          this.questionList = result.data.list;
          this.pageNo = result.data.pageNo;
          this.pageSize = result.data.pageSize;
          this.totalCount = result.data.totalCount;
          this.pageTotal = result.data.pageTotal;
          this.loading = false;
        }
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
      // this.$route.params.category = this.activeName;
      // 把原有数据清空
      // this.blogList = [];
      // this.questionList = [];
      // 修改为第一页
      this.pageNo = 1;
      this.search();
    }
  },
  mounted() {
    this.getBlogLikeList();
    this.content = this.$route.query.text;
    // 判断是否携带了分类
    if (!this.$route.params.category) {
      this.activeName = 'blog';
    } else {
      // 改变分类
      this.activeName = this.$route.params.category;
    }
    if (this.$route.query.text != '') {
      console.log(1)
      // 获取搜索列表
      this.init();
    }

  },
  // watch: {
  //   content(newVal, oldVal) {
  //     console.log(newVal)
  //     this.$router.replace(`/search?text=${newVal}`)
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.box {
  max-width: 1200px;
  margin: 0 auto;
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

</style>
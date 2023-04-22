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
        >搜一下</el-button
        >
      </el-input>
    </div>
    <div class="content">
      <div v-for="item in List" :key="item.blog_id">
        <BlogItem :item="item"></BlogItem>
      </div>
    </div>
    <Pagination
        :pageNo="pageNo"
        :pageSize="pageSize"
        :totalCount="totalCount"
        :pageTotal="pageTotal"
        @changePageNo="changePageNo"
    ></Pagination>
    <Null v-if="totalCount == 0"></Null>
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
    };
  },
  methods: {
    // 搜索方法
    async search() {
      this.loading = true;
      let result = await this.$Request({
        url: "/blog/search",
        method: "POST",
        data: {
          content: this.content,
        },
      });

      if (result.status === 200) {
        this.List = result.data.list;
        this.pageNo = result.data.pageNo;
        this.pageSize = result.data.pageSize;
        this.totalCount = result.data.totalCount;
        this.pageTotal = result.data.pageTotal;
        this.loading = false;
      }
    },

    // 获取当前列表页
    changePageNo(val) {
      this.pageNo = val;
      this.search();
    },
  },
  mounted() {
    // 获取搜索列表
    // this.search();
    this.content = this.$route.query.text;
  },
  watch:{
    content(newVal,oldVal){
      console.log(newVal)
      this.$router.replace(`/search?text=${newVal}`)
    }
  }
};
</script>

<style lang="scss" scoped>

.search {
  position: fixed;
  width: 750px;
  left: calc(50% - 375px);

  .input{
    height: 50px;
  }
  :deep(.el-input__inner){
    height: 50px;
  }
}
.content {
  padding-top: 60px;
}
</style>
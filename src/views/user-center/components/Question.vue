<template>
  <div>
    <div class="content">
      <router-link :to="`/questionDetail/${questionInfo.id}`"
                   target="_blank"
                   v-for="questionInfo in questionList"
                   :key="questionInfo.id">
        <QuestionItem :questionInfo="questionInfo"></QuestionItem>
      </router-link>

      <Null v-if="questionList.length == 0"></Null>
      <PaginationItem
          :pageNo="pageNo"
          :pageSize="pageSize"
          :totalCount="totalCount"
          :pageTotal="pageTotal"
          @changePageNo="changePageNo"
      ></PaginationItem>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      questionList: [], // 问题列表
      pageNo: 1, // 当前页码
      pageSize: 10, // 每页个数
      totalCount: 0, // 全部数量
      pageTotal: 0, // 总页面数
    }
  },
  methods: {
    // 获取用户问题列表
    async getQuestionList() {
      let result = await this.$Request('/question/getById', {
        // id: this.$route.params.id,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        id: 1
      })
      if (result.code === 200) {
        this.questionList = result.data.list;
        this.pageNo = result.data.pageNo;
        this.pageSize = result.data.pageSize;
        this.totalCount = result.data.totalCount;
        this.pageTotal = result.data.pageTotal;
        this.$emit("changeCount", 'question', result.data.totalCount)
      }
    },

    // 改变页数
    changePageNo(val) {
      this.pageNo = val;
      this.getQuestionList();
    },
  },
  mounted() {
    this.getQuestionList()

  }
}
</script>

<style scoped lang="scss">
.question-item {
  padding: 10px 0 20px;
}
.content{
  margin-top: -10px;
}
</style>

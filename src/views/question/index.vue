<template>
  <div class="question">
    <div class="left">
      <a
        :class="['tag', currentFT == '全部' ? 'bg-color' : '']"
        @click="changeTag('全部')"
        >全部</a
      >
      <a
        v-for="(tag, index) in fatherTags"
        :class="['tag', currentFT == tag ? 'bg-color' : '']"
        @click="changeTag(tag)"
        :key="index"
        >{{ tag }}</a
      >
    </div>
    <div class="content">
      <QuestionItem
        v-for="questionInfo in questionList"
        :key="questionInfo.id"
        :questionInfo="questionInfo"
      ></QuestionItem>
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
import QuestionItem from "@/components/QuestionItem";

export default {
  name: "Question",
  components: {
    QuestionItem,
  },
  data() {
    return {
      questionList: [], // 问题列表
      currentFT: "全部", //当前父标签
      pageNo: 1, // 当前页码
      pageSize: 10, // 每页个数
      totalCount: 0, // 全部博客数量
      pageTotal: 0, // 总页面数
    };
  },
  methods: {
    // 获取问题列表
    async getQuestionList(tag) {
      let result = await this.$Request("/question/get", {
        fatherTag: tag,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      });
      if (result.code === 200) {
        this.questionList = result.data.list;
        this.pageNo = result.data.pageNo;
        this.pageSize = result.data.pageSize;
        this.totalCount = result.data.totalCount;
        this.pageTotal = result.data.pageTotal;
      }
    },
    // 改变标签，获取新问题列表
    changeTag(tag) {
      this.pageNo = 1;
      this.currentFT = tag;
      this.getQuestionList(tag);
      // 改变路由地址
      this.$router.replace(`/question/${this.currentFT}?pageNo=1`);

    },
    // 改变页数
    changePageNo(val) {
      this.pageNo = val;
      // 改变路由地址
      this.$router.replace(`/question/${this.currentFT}?pageNo=${val}`);
      this.getQuestionList(this.currentFT);
    },
  },

  computed: {
    categoryTags() {
      return this.$store.state.categoryTags;
    },
    fatherTags() {
      return this.$store.state.fatherTagsList;
    },
  },
  mounted() {
    // vuex 中添加标签列表
    if (!this.$store.state.categoryTags) {
      this.$store.dispatch("getTags");
    }
    // 获取路由中的标签信息
    this.currentFT = this.$route.params.ft || '全部';
    this.pageNo =  this.$route.query.pageNo;
    this.getQuestionList();
  },
};
</script>

<style scoped lang="scss">
.question {
  display: flex;

  .left {
    width: 140px;
    position: fixed;
    height: calc(100vh - 78px);
    overflow-y: auto;
    background: #fff;

    .tag {
      display: block;
      font-size: 15px;
      padding: 6px 20px;
    }

    .tag:hover {
      background: var(--bg-color);
    }
  }

  .left::-webkit-scrollbar {
    display: none;
  }

  .content {
    margin-left: 160px;
    background: #fff;
    height: auto;
    flex: 1;
    padding-bottom: 20px;
  }
}
</style>

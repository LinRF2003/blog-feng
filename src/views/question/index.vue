<template>
  <div class="question">
    <div class="left">
      <a v-for="tag in fatherTags" class="tag">{{tag}}</a>
    </div>
    <div class="content">
      <QuestionItem v-for="questionInfo in questionList" :key="questionInfo.id"
                    :questionInfo="questionInfo"></QuestionItem>
    </div>

  </div>
</template>

<script>
import QuestionItem from "@/components/QuestionItem";
import {getFatherTags} from "@/utils/methods";

export default {
  name: 'Question',
  components: {
    QuestionItem,
  },
  data() {
    return {
      questionList: [], // 问题列表
      fatherTags:[], // 标签列表
    }
  },
  methods: {
    // 获取博客列表
    async getQuestionList() {
      let result = await this.$Request('/question/get');
      if (result.code === 200) {
        this.questionList = result.data.list;
      }
    }
  },
  mounted() {
    this.getQuestionList();
    this.fatherTags = getFatherTags(this.$store.state.categoryTags);
  }
}
</script>

<style scoped lang="scss">
.question {
  display: flex;

  .left{
    width: 140px;

    margin-right: 20px;
    height: calc(100vh - 78px);
    overflow-y: auto;
    background: #fff;
    .tag{
      display: block;
      font-size: 15px;
      padding:6px 20px ;
    }
    .tag:hover{
      background: var(--bg-color);
    }
  }
  .left::-webkit-scrollbar{
    display: none;
  }
  .content{
    background: #fff;
    flex:1;
  }
}
</style>

<template>
  <div class="question">
    <div class="left">
      <a :class="['tag',currentFT=='全部'?'bg-color':'']" @click="changeTag('全部')">全部</a>
      <a v-for="tag in fatherTags" :class="['tag',currentFT==tag?'bg-color':'']" @click="changeTag(tag)">{{ tag }}</a>
    </div>
    <div class="content">
      <QuestionItem v-for="questionInfo in questionList" :key="questionInfo.id"
                    :questionInfo="questionInfo"></QuestionItem>
      <Null v-if="questionList.length==0"></Null>
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
      currentFT: '全部',//当前父标签
    }
  },
  methods: {
    // 获取问题列表
    async getQuestionList(tag) {
      let result = await this.$Request('/question/get', {
        fatherTag: tag,
      });
      if (result.code === 200) {
        this.questionList = result.data.list;
      }
    },
    // 改变标签，获取新问题列表
    changeTag(tag) {
      this.currentFT = tag;
      this.getQuestionList(tag);
    }
  },
  computed: {
    categoryTags() {
      return this.$store.state.categoryTags
    },
    fatherTags() {
      return getFatherTags(this.$store.state.categoryTags)
    }
  },
  mounted() {
    // vuex 中添加标签列表
    if (!this.$store.state.categoryTags) {
      this.$store.dispatch('getTags');
    }
    this.getQuestionList();
  }
}
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
  }
}
</style>

<template>
  <div class="question-detail">
    <div class="top-content">
      <div class="top">
        <div class="avatar">
          <img :src="questionDetailInfo.avatar" v-if="questionDetailInfo.avatar">
          <img src="../../../assets/logo.png" v-else>
        </div>
        <div class="user-name">
          {{ questionDetailInfo.userName }}
        </div>
        <div class="time">
          {{ questionDetailInfo.createTime }}
        </div>
        <div class="views">
          浏览 {{ questionDetailInfo.views }}
        </div>
      </div>
      <div class="content">
        <div class="title">
          {{ questionDetailInfo.title }}
        </div>
        <div class="html" v-html="questionDetailInfo.content">
        </div>
      </div>

    </div>
    <!--  回答列表  -->
    <div class="answer-list">
      <div class="answer-text">
        回答({{questionDetailInfo.answerNum}})
      </div>
      <div class="answer-item" v-for="i in answerList" :ke="i.id">
        <div class="top info">
          <div class="avatar">
            <img :src="i.avatar" v-if="i.avatar">
            <img src="../../../assets/logo.png" v-else>
          </div>
          <div class="user-name">
            {{ i.userName }}
          </div>
          <div class="time">
            {{ i.createTime }}
          </div>
        </div>
        <div class="content" v-html="i.content">
        </div>
      </div>
    </div>
    <!--  回答  -->
    <div class="answer">
      <MarkdownEditor
          height="400px"
          @changeHtml="changeHtml"
          @changeMarkdownText="changeMarkdownText"
          ref="markdownEditor"
      ></MarkdownEditor>
      <div class="button">
        <el-button type="danger" @click="addAnswer">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//代码高亮样式
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";

export default {
  name: 'QuestionDetail',
  data() {
    return {
      questionDetailInfo: {},
      content: '',
      markdownContent: '',
      answerList: []
    }
  },
  methods: {
    // 获取问题详情数据
    async getQuestionDetail() {
      let result = await this.$Request('/question/getDetail', {id: this.$route.params.id})
      if (result.code === 200) {
        this.questionDetailInfo = result.data;
        this.$nextTick(() => {
          let blocks = document.querySelectorAll("pre");
          blocks.forEach((block) => {
            hljs.highlightBlock(block);
          });
        });
      }
    },
    // 获取回答列表
    async getAnswerList() {
      let result = await this.$Request('question/getAnswer', {questionId: this.$route.params.id});
      if (result.code === 200) {
        this.answerList = result.data;
      }
    },
    // 内容的双向绑定
    changeHtml(event) {
      this.content = event;
    },
    // markdown内容的绑定
    changeMarkdownText(event) {
      this.markdownContent = event;
    },
    // 添加回答
    async addAnswer() {
      if (!this.content || !this.markdownContent) {
        return this.$Message.warning('内容不能为空')
      }
      let result = await this.$Request('/question/addAnswer', {
        questionId: this.$route.params.id,
        content: this.content,
        markdownContent: this.markdownContent
      })
      if (result.code === 200) {
        // 清空编辑器中的内容
        this.$refs.markdownEditor.text ='';
        // 重新获取评论列表
        this.getAnswerList();
        // 给回答数加一
        this.questionDetailInfo.answerNum += 1;
      }

    }
  },
  mounted() {
    this.getQuestionDetail();
    this.getAnswerList();
  }
}
</script>

<style scoped lang="scss">
.top {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .avatar {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-right: 12px;
    border-radius: 50%;
    border: 1px solid #ccc;

    img {
      width: 30px;
    }
  }

  .user-name {
    margin-right: 12px;
  }

  .time {
    color: #676767;
    font-size: 12px;
  }

  .views {
    font-size: 14px;
    flex: 1;
    text-align: right;
  }
}

.question-detail {
  margin: 0 50px;

  .top-content {
    padding: 20px;
    background: #fff;

    .content {
      .title {
        font-size: 18px;
        font-weight: bold;
      }
    }

    .html {
      line-height: 26px;
    }
  }

  .answer-list {
    margin-top: 25px;

    .answer-text {
      background: #fff;
      margin-bottom: 10px;
      padding: 20px;
    }

    .answer-item {
      margin-top: 10px;
      background: #fff;
      padding: 20px;

      .info {
        margin-bottom: 10px;
      }

      .content {
        margin-left: 40px;
      }
    }

  }

  .answer {
    margin: 50px 0;

    .button {
      display: flex;
      justify-content: end;
      margin-top: 10px;
    }
  }
}


</style>

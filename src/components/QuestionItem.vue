<template>
  <div class="question-item">
    <div class="left">
      <div class="title">
        {{questionInfo.title}}
      </div>
      <div class="content">
        {{questionInfo.content}}
      </div>
      <div class="bottom">
        <div class="tags">
          <span class="tag" v-for="tag in JSON.parse(questionInfo.tags)">
            {{tag}}
          </span>
        </div>
        <div class="views">
          {{questionInfo.views}} 浏览
        </div>
        <div class="time">{{questionInfo.createTime}}</div>
      </div>
    </div>
    <div class="right">
      <div class="num">
        {{questionInfo.answerNum}}
      </div>
      <div class="text">回答</div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'QuestionItem',
  props: {
    questionInfo: {type: Object, required: true},
  },
  data(){
    return {
      tags:[], // 标签
    }
  },
}
</script>

<style scoped lang="scss">
.question-item{
  display: flex;
  padding: 10px 10px 15px;
  border-bottom: 1px #e6e6e6 solid;
  .left{
    flex: 1;
    width: 0;
    .title{
      color: #333;
      font-size: 18px;
      font-weight: 550;
    }
    .content{
      color: #555666;
      margin: 5px 0 8px;
      font-size: 14px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    .bottom{
      display: flex;
      align-items: center;
      font-size: 12px;
      .tags{
        margin-right: 10px;
        .tag{
          background-color: #ecf5ff;
          border:1px #d9ecff solid;
          color: #409EFF;
          padding: 2px 5px;
          margin-right: 5px;
        }
      }
      .views{
        margin-right: 15px;
      }
    }
  }
  .right{
    color: #333;
    font-size: 14px;
    min-width: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .num{
      padding-bottom: 5px;
    }
  }
}
</style>

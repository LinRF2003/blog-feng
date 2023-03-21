<template>
  <div class="question-detail">
    <div class="top">
      <div class="avatar">
        <img src="../../../assets/logo.png">
      </div>
      <div class="user-name">
        LINRUIFENG
      </div>
      <div class="time">
        2023-03-30 22:21
      </div>
      <div class="views">
        浏览 47
      </div>
    </div>
    <div class="content">
      <div class="title">
        怎么学习Vue?
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:'QuestionDetail',
}
</script>

<style scoped lang="scss">
.question-detail{
  margin: 0 50px;
  padding: 20px;
  background: #fff;
  .top{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .avatar{
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      overflow: hidden;
      margin-right: 15px;
      border-radius: 50%;
      border: 1px solid #ccc;
      img{
        width: 30px;
      }

    }
    .user-name{
      margin-right: 15px;
    }
    .time{
      color: #676767;
      font-size: 12px;
    }
    .views{
      font-size: 14px;
      flex: 1;
      text-align: right;
    }
  }
  .content{
    .title{
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>

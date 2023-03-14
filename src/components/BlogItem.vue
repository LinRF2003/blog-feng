<template>
  <div class="blog-item">
    <div class="top">
      <div  class="avatar">
        <img src="../assets/logo.png"></img>
      </div>
      <div class="name">
        {{ blogInfo.userName }}
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="time">{{ blogInfo.createTime }}</div>
    </div>
    <div class="content">
      <div class="left">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class="right">
        <div class="title">{{ blogInfo.title }}</div>
        <div class="summary">{{ blogInfo.summary }}</div>
        <div class="bottom">

          <div class="view">{{ blogInfo.views }}浏览量</div>
          <div class="like">{{blogInfo.likeCount}}点赞数</div>
          <div class="like">{{blogInfo.commentCount}}评论数</div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: '',
  props: {
    blogInfo: {type: Object, required: true}
  }
}
</script>

<style scoped lang="scss">
.blog-item {
  background: #fff;
  padding: 20px 20px 0;

  .top {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .avatar {
      display: flex;
      align-items: center;
      width: 32px;
      height: 32px;
      border: 1px solid #ccc;
      overflow: hidden;
      border-radius: 30px;
      img{
        width: 30px;
      }
    }
    .name{
      font-size: 14px;
      padding-left: 5px;
      line-height: 30px;
      color: #333;
    }
    .time{
      font-size: 13px;
      line-height: 30px;
      color: #666;
    }
  }
  .content{
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    .left{
      display: flex;
      align-items: center;
      width: 160px;
      height: 100px;
      overflow: hidden;
      img{
        width: 160px;
        max-height: 100px;
      }
    }
    .right{
      margin-left: 10px;
      .bottom{
        display: flex;
      }
    }
  }
}
</style>

<template>
  <div class="dynamic-item">
    <div class="top">
      <div class="avatar">
        <el-image
            style="width: 50px"
            :src="dynamicInfo?.avatar"
            :preview-src-list="[dynamicInfo?.avatar]"
            class="img">
        </el-image>
      </div>
      <div class="right">
        <router-link class="name" :to="`/userCenter/${dynamicInfo.userId}`">
          {{ dynamicInfo.userName }}
        </router-link>
        <div class="time">
          {{ dynamicInfo.createTime }}
        </div>
      </div>
    </div>
    <div class="center">
      <div class="content">{{ dynamicInfo.content }}</div>
      <div class="imgList">
        <el-image
            class="img"
            v-for="(src,index) in JSON.parse(dynamicInfo.imgUrlList)"
            :src="src"
            :preview-src-list="[src]"
            :key="index"
        >
        </el-image>
      </div>
    </div>
    <div class="bottom">
      <div class="like">赞 {{ dynamicInfo.userLikeList ? JSON.parse(dynamicInfo.userLikeList).length : 0 }}</div>
      <div class="like">评论 {{ dynamicInfo.commentCount }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DynamicItem",
  props: {
    // 问题数据
    dynamicInfo: {type: Object, required: true},
  }
};
</script>

<style scoped lang="scss">
.dynamic-item {
  background: #fff;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;

  .top {
    display: flex;

    .avatar {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      background: #fff;
      border: 1px solid #ddd;
      overflow: hidden;
    }

    .right {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .name {
        font-size: 15px;
        margin-bottom: 5px;
      }

      .time {
        font-size: 13px;
      }
    }
  }

  .center {
    padding: 15px 0;

    .content {
      margin-bottom: 10px;
    }

    .imgList {
      display: flex;

      .img {
        width: 100px;
        height: 100px;
        margin-right: 8.75px;
      }

      .img:last-child {
        margin-right: 0;
      }
    }
  }

  .bottom {
    display: flex;
    font-size: 13px;

    .like {
      margin-right: 15px;
    }
  }

}
</style>

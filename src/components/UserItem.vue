<template>
  <div class="user-item">
    <div class="bg">
      <div class="avatar">
        <el-image
            class="img"
            :src="userInfo.avatar"
            :preview-src-list="[userInfo.avatar]"
        ></el-image>
      </div>
      <router-link class="info" :to="`/userCenter/${userInfo.userId}`">
        <div class="name">
          {{ userInfo.userName }}
        </div>
        <div class="sex">
          {{ userInfo.sex }}
        </div>
      </router-link>
      <div class="desc">
        {{ userInfo.introduction }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: '',
  props: ["userInfo"],
}
</script>

<style scoped lang="scss">
.user-item {
  width: 200px;
  padding: 10px;

  margin-bottom: 20px;
  .bg{
    background: #fff;
    width: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 215px;
  }
  .avatar {
    margin-top: 10px;
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;

    .img {
      width: 120px;
    }
  }
  .info {
    display: flex;
    padding: 10px 0;
    align-items: center;

    .name {
      margin-right: 5px;
    }

    .sex {
      font-size: 14px;
    }
  }

  .desc {
    font-size: 13px;
    max-height: 48px;
    padding: 0 5px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  }
}
</style>

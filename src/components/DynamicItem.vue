<template>
  <div class="dynamic-item">
    <div class="top">
      <div class="avatar">
        <el-image
            style="width: 40px"
            :src="dynamicInfo?.avatar"
            :preview-src-list="[dynamicInfo?.avatar]"
            class="img">
        </el-image>
      </div>
      <div class="right">
        <router-link class="name" :to="`/userCenter/${dynamicInfo?.userId}`">
          {{ dynamicInfo?.userName }}
        </router-link>
        <div class="time">
          {{ dynamicInfo?.createTime }}
        </div>
      </div>
    </div>
    <div style="margin-left: 50px;">
      <div class="center">
        <div class="content">{{ dynamicInfo?.content }}</div>
        <div class="imgList">
          <el-image
              class="img"
              v-for="(src,index) in JSON.parse(dynamicInfo?.imgUrlList)"
              :src="src"
              :preview-src-list="[src]"
              :key="index"
          >
          </el-image>
        </div>
      </div>
      <div class="bottom">
        <div :class="['like',isLike ? 'active' : '']" @click="changeLike">
          赞 {{ likeCount }}
        </div>
        <div class="like" @click="() => {
         showComment = !showComment
        }">评论 {{ dynamicInfo.commentCount }}</div>
      </div>
      <div class="comment" v-if="showComment">
        <div class="add">
          <el-input v-model="commentContent" @keyup.enter.native="addDynamicComment"></el-input>
          <div class="reply" @click="addDynamicComment">
            回复
          </div>
        </div>
        <div class="item" v-for="item in dynamicCommentList">
          <div class="info">
            {{ item.userName }} : {{ item.content }}
          </div>
          <div class="time">
            {{item.createTime}}

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DynamicItem",
  props: {
    // 问题数据
    dynamicInfo: {type: Object, required: true},
  },
  data() {
    return {
      dynamicCommentList: [],
      isLike: false,
      likeCount: 0,
      choose: true,
      commentContent:"",
      showComment:false
    }
  },
  watch: {
    "$store.state.userInfo": function (newVal, oldVal) {
      this.isLike = this.dynamicInfo.userLikeList && JSON.parse(this.dynamicInfo.userLikeList).indexOf(this.$store.state.userInfo?.userId) !== -1
    }
  },
  methods: {
    // 改变点赞
    async changeLike() {
      if (this.choose) {
        this.choose = false;
        let result = await this.$Request("/dynamic/changeLikeList", {
          id: this.dynamicInfo.id,
        });

        if (result.code === 200) {
          this.isLike = !this.isLike;
          if (this.isLike) {
            this.likeCount += 1;
          } else {
            this.likeCount -= 1;
          }
        }
        // 1秒内只能触发一次请求
        setTimeout(() => {
          this.choose = true;
        }, 1000);
      }
    },
    // 获取动态评论列表
    async getDynamicCommentList() {
      let result = await this.$Request("/dynamic/getComment", {
        dynamicId: this.dynamicInfo.id
      })
      if (result.code === 200) {
        this.dynamicCommentList = result.data;
      }
    },
    async addDynamicComment() {
      let result = await this.$Request("/dynamic/addComment", {
        content:this.commentContent,
        dynamicId: this.dynamicInfo.id
      })
      if(result.code === 200){
        // 清空原有数据
        this.commentContent="";
        // 评论数加一
        this.dynamicInfo.commentCount += 1;
        this.getDynamicCommentList();
      }
    }
  },
  mounted() {
    this.isLike = this.dynamicInfo.userLikeList && JSON.parse(this.dynamicInfo.userLikeList).indexOf(this.$store.state.userInfo?.userId) !== -1;
    this.likeCount = this.dynamicInfo.userLikeList ? JSON.parse(this.dynamicInfo.userLikeList).length : 0;

    this.getDynamicCommentList();
  },
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
      width: 42px;
      height: 42px;
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
        width: 90px;
        height: 90px;
        margin-right: 10px;
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
      cursor: pointer;
    }
  }

  .comment {
    margin-top: 15px;

    font-size: 14px;

    .item {
      background: #f7f9fa;
      padding: 10px;
      .time{
        font-size: 12px;
        color: #666;
        margin-top: 5px;
      }
    }
    .add{
      display: flex;
      margin-bottom: 10px;
      .reply{
        width: 80px;
        background: #16b998;
        display: flex;
        align-items: center;
        justify-content:center;
        margin: 0 10px;
        color: #fff;
        font-size: 17px;
        cursor: pointer;
      }
    }
  }
}
</style>

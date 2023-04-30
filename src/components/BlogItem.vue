<template>
  <div class="blog-item">
    <div class="top">
      <div class="avatar">
        <img src="../assets/logo.png" alt=""/>
      </div>
      <router-link class="name" :to="`/userCenter/${blogInfo.userId}`">
        {{ blogInfo.userName }}
      </router-link>
      <el-divider direction="vertical"></el-divider>
      <div class="time">{{ blogInfo.createTime }}</div>
    </div>
    <div class="content">
      <div class="left" v-if="blogInfo.cover">
        <el-image
            class="image"
            :src="blogInfo.cover"
            :preview-src-list="[blogInfo.cover]"
        >
        </el-image>
      </div>

      <div class="right">
        <a class="title" target="_blank" @click="addViews"
        >{{ blogInfo.title }}
        </a>
        <div class="summary">{{ blogInfo.summary }}</div>
        <div class="bottom">
          <div class="view">{{ blogInfo.views }} 浏览</div>
          <a :class="['like', isLike ? 'active' : '']" @click="changeLike"
          >{{ blogInfo.likeCount }} 赞</a
          >
          <div class="like">{{ blogInfo.commentCount }} 评论</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      choose: true,
      isLike:false
    };
  },
  props: {
    blogInfo: {type: Object, required: true},
    like: {
      type: Boolean,
    },
  },
  methods: {
    // 增加浏览量
    addViews() {
      this.$Request("/blog/addViews", {id: this.blogInfo.id});
      let routeData = this.$router.resolve({
        name: "博客详情",
        params: {id: this.blogInfo.id},
        // query: {id: this.blogInfo.id, isLike: this.isLike}
      });
      window.open(routeData.href, "_blank");

      // this.$router.push(`/blogdetail/${this.blogInfo.id}`);
    },
    // 改变点赞
    async changeLike() {
      if (this.choose) {
        this.choose = false;
        let result = await this.$Request("/blog/changeLikeNum", {
          count: !this.isLike ? 1 : -1,
          id: this.blogInfo.id,
        });

        if (result.code === 200) {
          this.isLike = !this.isLike;
          if (this.isLike) {
            this.blogInfo.likeCount += 1;
          } else {
            this.blogInfo.likeCount -= 1;
          }
        }
        // 1秒内只能触发一次请求
        setTimeout(() => {
          this.choose = true;
        }, 1000);
      }
    },
  },
  mounted() {
    if (this.like) {
      this.isLike = this.like;
    }
  },
};
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

      img {
        width: 30px;
      }
    }

    .name {
      font-size: 14px;
      padding-left: 5px;
      line-height: 30px;
      color: #333;
    }

    .time {
      font-size: 13px;
      line-height: 30px;
      color: #666;
    }
  }

  .content {
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;

    .left {
      overflow: hidden;
      background: #f4f4f4;

      .image {
        text-align: center;
        //width: 160px;
        height: 100px;
      }
    }

    .right {
      min-width: 160px;
      min-height: 100px;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        font-size: 18px;
        font-weight: bold;
        color: var(--main-color);
        text-decoration: underline;
        overflow: hidden;
        text-overflow: ellipsis;
        // 只要超过宽度就换行，不论中文还是英文
        word-break: break-all;
        //最多展示两行
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }

      .summary {
        font-size: 14px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        // 只要超过宽度就换行，不论中文还是英文
        word-break: break-all;
        //最多展示两行
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: 1.2em;
        max-height: 2.4em;
      }

      .bottom {
        display: flex;
        font-size: 14px;
        color: #333;

        .view,
        .like {
          margin-right: 15px;
        }
      }
    }

  }
}
</style>

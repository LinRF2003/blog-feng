<template>
  <div class="user-center" v-loading.fullscreen.lock="loading">
    <div class="left">
      <div class="top">
        <div class="editor" v-if="$route.params.id == $store.state.userInfo?.userId"
             @click="() => {
         $router.push('/user')
        }">
          编辑资料
        </div>
        <div class="img">
          <el-image
              style="width: 120px"
              :src="userInfo?.avatar"
              :preview-src-list="[userInfo?.avatar]">
          </el-image>
        </div>
        <div class="info">
          <div class="name">
            {{ userInfo?.userName }}
          </div>
          <div class="sex">
            {{ userInfo?.sex }}
          </div>
        </div>
        <div class="desc">
          {{ userInfo?.introduction }}
        </div>
      </div>
      <div class="bottom">
        <div class="item">
          <div class="item-left">
            博客
          </div>
          <div class="item-right">
            {{ blogCount }}
          </div>
        </div>
        <div class="item">
          <div class="item-left">
            评论
          </div>
          <div class="item-right">
            {{ commentCount }}
          </div>
        </div>
        <div class="item">
          <div class="item-left">
            获赞
          </div>
          <div class="item-right">
            {{ likeCount }}
          </div>
        </div>
        <div class="item">
          <div class="item-left">
            问答
          </div>
          <div class="item-right">
            {{ questionCount }}
          </div>
        </div>
        <div class="item">
          <div class="item-left">
            回答
          </div>
          <div class="item-right">
            {{ answerCount }}
          </div>
        </div>
        <div class="item">
          <div class="item-left">
            动态
          </div>
          <div class="item-right">
            {{ dynamicCount }}
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="博客" name="blog">
          <BLog @changeCount="changeCount"></BLog>
        </el-tab-pane>
        <el-tab-pane label="评论" name="comment">
          <Comment @changeCount="changeCount" v-if="currentSelectName === 'comment'"></Comment>
        </el-tab-pane>
        <el-tab-pane label="点赞" name="like">
          <like @changeCount="changeCount" v-if="currentSelectName === 'like'"></like>
        </el-tab-pane>
        <el-tab-pane label="问答" name="question">
          <Question @changeCount="changeCount" v-if="currentSelectName === 'question'"></Question>
        </el-tab-pane>
        <el-tab-pane label="回答" name="answer">
          <Answer @changeCount="changeCount" v-if="currentSelectName === 'answer'"></Answer>
        </el-tab-pane>
        <el-tab-pane label="动态" name="dynamic" >
          <Dynamic @changeCount="changeCount" v-if="currentSelectName === 'dynamic'"></Dynamic>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// 导入组件
import BLog from "@/views/user-center/components/Blog";
import Question from "@/views/user-center/components/Question";
import Like from "@/views/user-center/components/Like";
import Answer from "@/views/user-center/components/Answer";
import Comment from "@/views/user-center/components/Comment";
import Dynamic from "@/views/user-center/components/Dynamic";

export default {
  name: '',
  data() {
    return {
      userInfo: {},
      activeName: 'blog',
      blogCount: 0,
      questionCount: 0,
      likeCount: 0,
      answerCount: 0,
      commentCount: 0,
      dynamicCount: 0,
      loading: false,
      currentSelectName:"",
    }
  },
  components: {
    BLog,
    Question,
    Like,
    Answer,
    Comment,
    Dynamic
  },
  methods: {
    handleClick(e) {
      this.currentSelectName = e.name;
    },
    // 改变数量
    changeCount(type, count) {
      if (type === 'blog') {
        this.blogCount = count;
      } else if (type === 'like') {
        this.likeCount = count
      } else if (type === 'question') {
        this.questionCount = count;
      } else if (type === 'answer') {
        this.answerCount = count;
      } else if (type === 'comment') {
        this.commentCount = count;
      } else if (type === 'dynamic') {
        this.dynamicCount = count;
      }
    },
    // 获取用户信息
    async getUserInfo() {
      this.loading = true;
      let result = await this.$Request('/user/get', {
        userId: this.$route.params.id
      })
      if (result.code === 200) {
        this.userInfo = result.userInfo
        this.loading = false;
      }
    }
  },
  mounted() {
    this.getUserInfo();
  },
  watch: {
    // 监听路由id变化，防止点击个人中心时不切换自己的信息
    '$route.params.id': () => {
      location.reload();
    }
  }
}
</script>

<style scoped lang="scss">
.user-center {
  margin: 0 auto;
  display: flex;

  .left {
    width: 220px;

    .top {
      padding: 10px 15px;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;

      .editor {
        position: relative;
        left: -70px;
        font-size: 14px;
        color: #409EFF;
        cursor: pointer;
      }

      .img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        background: #eeeeee;
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
      }
    }

    .bottom {
      padding: 15px;
      margin-top: 15px;
      background: #ffffff;

      .item {
        display: flex;
        justify-content: space-between;
        color: #333;
        font-size: 14px;
        padding-bottom: 10px;
      }

      .item:last-child {
        padding-bottom: 0;
      }
    }
  }

  .right {
    flex: 1;
    margin-left: 10px;
    background: #fff;
    padding: 0 15px;
  }
}
</style>

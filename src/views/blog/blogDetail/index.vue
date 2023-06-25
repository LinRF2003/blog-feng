<template>
  <div class="container" v-loading.fullscreen.lock="loading">
    <!-- 内容区域 -->
    <div class="left">
      <div class="blog-title">{{ blogInfo.title }}</div>
      <div class="detail-blog-info">
        <div class="blog-createTime">{{
            blogInfo.createTime
          }}
        </div>
        作者：
        <router-link class="user-name" :to="`/userCenter/${blogInfo.userId}`">{{ blogInfo.userName }}</router-link>
        类型：
        <div class="type">{{ blogInfo.type == 0 ? "原创" : "转载" }}</div>
        <div v-if="blogInfo.type == 1" class="reprint">
          转载地址：
          <a
              :href="`${
              blogInfo.reprintUrl.indexOf('http') == 0
                ? blogInfo.reprintUrl
                : 'http://' + blogInfo.reprintUrl
            }`"
              target="_blank"
          >{{ blogInfo.reprintUrl }}</a
          >
        </div>
      </div>
      <div id="content" class="content" v-html="blogInfo.content"></div>
    </div>
    <!-- 目录结构 -->
    <div class="right">
      <div class="top-title">目录结构</div>
      <div class="title">
        <div v-if="!catelog.length" class="catalog">空空如也</div>
        <a
            class="item"
            v-for="item in catelog"
            :key="item.id"
            :href="'#' + item.id"
            :style="{ marginLeft: `${15 * item.leval}px` }"
        >
          {{ item.title }}
        </a>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment" v-if="blogInfo.allowComment" id="comment">
      <div style="font-weight: 550; margin-bottom: 10px; font-size: 18px">评论</div>
      <!-- 评论框 -->
      <div class="comment-box">
        <div class="comment-box-avatar">
          <img :src="$store.state.userInfo?.avatar" alt="">
        </div>
        <div class="input-box">
          <textarea class="input" v-model="commentContent"
                    placeholder="善言结善语，恶语伤人心"></textarea>
          <el-button
              type="primary"
              class="button" @click="addComment">发布评论
          </el-button>
        </div>
      </div>
      <!-- 评论列表 -->
      <div v-for="item in commentList" :key="item.id">
        <CommentItem :item="item" :current-user-id="blogInfo.userId" @deleteComment="deleteComment"
                     @addCommentReply="addCommentReply"></CommentItem>
      </div>

    </div>
    <!-- 左边固定点赞评论 -->
    <div class="float">
      <div :class="['like', like ? 'bg-color' : '']" @click="changeLike">
        <i class="el-icon-thumb"></i>
        <div class="count">{{ blogInfo.likeCount }}</div>
      </div>
      <a href="#comment" class="pinglun"
      ><i class="el-icon-chat-line-round"></i>
        <div class="count">{{ blogInfo.commentCount }}</div>
      </a
      >
    </div>
  </div>
</template>

<script>
//代码高亮样式
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
import {formatDate} from "@/utils/methods";
import CommentItem from "@/components/CommentItem";

export default {
  name: "BlogDetail",
  data() {
    return {
      blogInfo: {},
      catelog: [], // 目录结构
      commentList: [], // 评论列表
      // operationText: "展开",
      // limitBtnShow: false,
      showEditor: false,
      commentContent: "",
      loading: false,
      like: null,
      choose: true, //控制点赞操作
    };
  },
  components: {
    CommentItem
  },
  methods: {
    // 根据路由博客id获取博客详情
    async getBlogDetail() {
      this.loading = true;
      let result = await this.$Request(
          "/blog/getDetail",
          {id: this.$route.params.id},
      );

      if (result.code === 200) {
        this.blogInfo = result.data[0];
        this.loading = false;
      }
      // 生成目录结构
      //   给每个标题添加跳转
      this.$nextTick(() => {
        let content = document.querySelector("#content");

        let nodes = content.childNodes;

        const catalog = [];
        let tags = ["H1", "H2", "H3", "H4", "H5", "H6"];
        let index = 0;
        nodes.forEach((item) => {
          // console.log(1);
          let tagName = item.tagName;
          if (!tags.includes(tagName)) {
            return;
          }
          index++;
          let id = "log" + index;
          item.setAttribute("id", id);
          catalog.push({
            id: id,
            title: item.innerText,
            leval: Number.parseInt(tagName.substring(1)),
          });
        });
        this.catelog = catalog;

        let blocks = document.querySelectorAll("pre");
        blocks.forEach((block) => {
          hljs.highlightBlock(block);
        });
      });
    },

    // 获取评论列表
    async getCommentList() {
      let result = await this.$Request(
          "/blog/getComment",
          {
            blogId: this.$route.params.id,
          },
      );

      if (result.code === 200) {
        this.commentList = result.data;
      }
    },

    // 添加评论框显示
    showComment() {
      this.showEditor = true;
    },
    // 评论框变化
    handleInput($event) {
      console.log($event.target);
      this.content = $event.target.innerHTML;
    },
    // 评论框取消
    changeShow() {
      this.showEditor = false;
    },

    // 添加评论
    async addComment() {
      let result = await this.$Request(
          "/blog/addComment",
          {
            content: this.commentContent,
            blogId: this.blogInfo.id,
            avatar: this.$store.state.userInfo.avatar,
            userName: this.$store.state.userInfo.userName,
            userId: this.$store.state.userInfo.userId
          },
      );
      // 重新获取评论
      if (result.code === 200) {
        this.commentList.unshift({
          id: result.id,
          userId: this.$store.state.userInfo.userId,
          content: this.commentContent,
          avatar: this.$store.state.userInfo.avatar,
          userName: this.$store.state.userInfo.userName,
          createTime: formatDate(new Date()),
          replyList:[]
        })
        this.commentContent = "";
        this.blogInfo.commentCount += 1;
        this.showEditor = false;
        this.$Message.success("添加评论成功");
      }
    },
    // 评论是否有展开
    // toggleLimit() {
    //   const box = document.getElementsByClassName("content");
    //   const line = box.style["-webkit-line-clamp"];
    //   box.style["-webkit-line-clamp"] = line === "3" ? 100 : 3;
    //   this.operationText = line === "3" ? "关闭" : "展开";
    // },

    // init
    // init() {
    //   console.log(document.getElementsByClassName("comment-content"));
    //   this.limitBtnShow =
    //     document.getElementsByClassName("comment-content").clientHeight >= 60;
    //   console.log(document.getElementsByClassName("detail"));
    //   document.getElementsByClassName("detail")[0].innerHTML("展开");
    // },

    // 改变点赞
    async changeLike() {
      if (this.choose) {
        this.choose = false;
        let result = await this.$Request(
            "/blog/changeLikeNum",
            {
              count: !this.like ? 1 : -1,
              id: this.$route.params.id,
            }
        );
        // console.log(result);
        if (result.code === 200) {
          this.like = !this.like;
          if (this.like) {
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
    async getLikeState() {
      let result = await this.$Request('/blog/getLikeState', {id: this.$route.params.id});
      if (result.code === 200) {
        this.like = result.data;
      }
    },
    // 删除评论
    async deleteComment(id) {
      let result = await this.$Request('/blog/delComment', {commentId: id, blogId: this.$route.params.id});
      if (result.code === 200) {
        this.$Message.success("删除评论成功");
        // 删除评论
        this.commentList = this.commentList.filter((item) => {
          return item.id !== id
        })
      }
    },
    // 添加评论回复
    async addCommentReply(info, callback) {
      console.log(info)
      let result = await this.$Request("/blog/addBlogCommentReply", {
        content: info.content,
        blogCommentId: info.id,
        toUserId: info.toUserId,
        toUserName: info.toUserName
      })
      if (result.code === 200) {
        // 添加回复评论replyList
        const obj = this.commentList.find(item => item.id === info.id
        )
        console.log(obj)
          obj.replyList.unshift({
            id: result.id,
            blogCommentId: info.id,
            userId: this.$store.state.userInfo.userId,
            content: info.content,
            avatar: this.$store.state.userInfo.avatar,
            userName: this.$store.state.userInfo.userName,
            toUserName: info.toUserName,
            createTime: formatDate(new Date()),
            toUserId: info.toUserId
          })
        callback("添加成功");
      }
    },

  },
  mounted() {
    // 获取博客详情
    this.getBlogDetail();
    // 获取博客列表
    this.getCommentList();
    // 获取喜欢状态
    this.getLikeState();
    // 获取用户信息
    this.$store.dispatch("getUserInfo");
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding-top: 18px;
  width: 1200px;
  padding-bottom: 30px;

  .left {
    padding: 10px 20px;
    width: 75%;
    background: #fff;

    .content {
      line-height: 26px;
    }

    .blog-title {
      font-weight: bold;
      font-size: 28px;
    }

    .detail-blog-info {
      margin-top: 10px;
      display: flex;
      font-size: 14px;
      padding: 15px 10px;
      background: #f4f4f4;
      color: #666;

      .user-name,
      .blog-createTime,
      .cate-name,
      .type {
        margin-right: 20px;
      }

      .user-name,
      .cate-name,
      .type,
      a {
        color: #1890ff;
      }

      .reprint {
        display: flex;
      }
    }
  }

  .right {
    background: #fff;
    width: 300px;
    position: fixed;
    top: 18px;
    left: calc(50% + 315px);
    padding: 10px;

    .top-title {
      padding-left: 10px;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
      line-height: 40px;
    }

    .title {
      max-height: 500px;
      overflow: auto;

      .catalog {
        text-align: center;
        margin-top: 5px;
        color: #999;
      }
    }

    .item {
      font-size: 14px;
      display: block;
      color: #333;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 5px 0;
    }
  }

  .comment {
    margin-top: 20px;
    background: #fff;
    padding: 10px 20px;
    width: 75%;

    .comment-box {
      display: flex;

      .comment-box-avatar {
        margin-right: 10px;
        border: 1px solid #ccc;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;

        img {
          width: 50px;
          height: 50px;
        }
      }

      .input-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .input {
          width: 100%;
          min-height: 120px;
          background-color: rgb(247, 248, 249);
          font-family: 微软雅黑;
          font-size: 15px;
          resize: none;
          padding: 10px 12px;
          border-image: initial;
          border-radius: 5px;
          border: 1px solid rgb(247, 248, 249);
          outline: none;
          box-sizing: border-box;
        }

        .input:focus {
          border-color: #80c0db;
        }

        .button {
          margin-top: 15px;
          //margin-right: 10px;
          width: 100px;
        }
      }
    }


    div[contenteditable]:empty:not(:focus):before {
      content: attr(placeholder);
      color: #aaa;
    }

  }

  .float {
    top: 200px;
    left: 10px;
    position: fixed;

    .like {
      cursor: pointer;
      margin-bottom: 20px;
    }

    .like,
    .pinglun {
      display: block;
      width: 60px;
      height: 60px;
      background: #fff;
      border-radius: 60px;
      text-align: center;

      .count {
        color: #000;
        width: 20px;
        position: relative;
        left: 40px;
        top: -60px;
        background: #ddd;
        border-radius: 10px;
      }

      i {
        font-size: 30px;
        line-height: 60px;
        color: #666;
      }
    }

  }
}
</style>
<style lang="scss">
.container {
  .left {
    .content {
      img {
        width: 100%;
      }
    }
  }
}

.hljs {
  padding: 1em;
}

img {
  width: 500px;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
</style>
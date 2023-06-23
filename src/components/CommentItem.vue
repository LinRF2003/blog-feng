<template>
  <div class="item">
    <div class="avatar">
      <img :src="item.avatar" v-if="item.avatar"/>
    </div>
    <div class="info">
      <div class="name">
        <div class="auto" v-if="item.userId == currentUserId">
          作者本人
        </div>
        {{ item.userName }}
      </div>
      <div class="comment-content" v-html="item.content"></div>
      <div class="bot">
        <div class="time" style="display:flex;">{{ item.createTime }}
        </div>
        <div class="comment-reply-button"
        >
          <div class="reply" @click="showReplyCommentBox">回复</div>
        </div>
        <div class="del-button" @click="deleteComment(item.id)"
             v-show="item.userId === $store.state.userInfo.userId">
          删除
        </div>
      </div>
      <ReplyCommentInput @addCommentReply="addCommentReply" :id="item.id" :toUserName="item.userName" :toUserId="item.userId"
                         :replyUserName="item.userName"
                         bgColor="rgb(247, 248, 249)"
                         v-show="showReplyBox"></ReplyCommentInput>
      <div class="reply-list">
        <ReplyItem v-for="replyItem in item.replyList"
                   :replyItem="replyItem"
        @deleteReply="deleteReply"
        @addCommentReply2="addCommentReply2"></ReplyItem>
      </div>
    </div>
  </div>

</template>

<script>

import ReplyItem from "@/components/ReplyItem";
import ReplyCommentInput from "@/components/ReplyCommentInput";

export default {
  name: 'CommentItem',
  data() {
    return {
      showReplyBox: false
    }
  },
  props: ["item", "currentUserId"],
  components: {
    ReplyCommentInput,
    ReplyItem
  },
  methods: {
    // 删除评论
    async deleteComment(id) {
      this.$emit("deleteComment", id)
    },
    // 显示回复框
    showReplyCommentBox() {
      this.showReplyBox = !this.showReplyBox;
    },
    // 添加回复评论
    async addCommentReply(info, callback) {
      this.$emit("addCommentReply", info,res=>{
        // 关闭评论框
        this.showReplyBox = false;
        callback("添加成功")
      });
    },
    // 添加回复的回复评论
    addCommentReply2(info,callback) {
      this.$emit("addCommentReply", info,res=>{
        // 关闭评论框
        callback("添加成功")
      });
    },
      // 删除回复
    async deleteReply(id) {
      let result = await this.$Request("/blog/delBlogCommentReply", {
        id
      })
      if(result.code === 200) {
        this.$Message.success("删除成功");
        this.item.replyList =  this.item.replyList.filter(item=>item.id!=id)
      }
    },


  },
  mounted() {
    console.log(this.item)
  }
}
</script>

<style lang="scss" scoped>

.item {
  display: flex;
  padding-top: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
  position: relative;


  .avatar {
    min-width: 82px;
    height: 82px;
    border-radius: 82px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    overflow: hidden;

    img {
      width: 80px;
    }
  }

  .info {
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;

    .name {
      display: flex;
      color: #666;
      margin-bottom: 10px;
      font-size: 14px;

      .auto {
        margin-right: 4px;
        color: #1890ff;
      }
    }

    .bot {
      display: flex;
      align-items: center;
      margin-top: 10px;
      width: 90%;

      .del-button {
        cursor: pointer;
        opacity: 0;
        color: red;
        font-size: 14px;
        transition: .3s;
      }

      .comment-reply-button {
        flex: 1;

        font-size: 14px;
        margin-left: 8px;

        .reply {
          cursor: pointer;
        }
      }

      .time {

        font-size: 12px;
      }

    }

    .comment-content {
      color: #4d4d4d;
      line-height: 20px;
      width: 90%;
    }

    .reply-list {
      border-radius: 10px;
      margin-top: 10px;
      width: 90%;
      overflow: hidden;


    }
  }
}

.item:hover .del-button {
  opacity: 1 !important;
}
</style>

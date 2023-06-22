<template>
  <div class="reply-item">
    <div class="reply-list-avatar">
      <img :src="replyItem.avatar" class="img">
    </div>
    <div class="reply-list-info">
      <div class="reply-list-info-name">
        {{ replyItem.userName }} 回复 {{ replyItem.toUserName }}
      </div>
      <div class="content">
        {{ replyItem.content }}
      </div>
      <div class="b">
        <div class="time">
          {{ replyItem.createTime }}
        </div>
        <div class="reply-button"
        >
          <span @click="showReplyCommentBox">回复</span>

        </div>
        <div class="reply-delete-button" v-show="replyItem.userId === $store.state.userInfo.userId"
             @click="deleteReply(replyItem.id)">
          删除
        </div>
      </div>
      <ReplyCommentInput
          v-show="showReplyBox"
          bgColor="#fff"
          :replyUserName="replyItem.userName"
          @addCommentReply="addCommentReply2"
          :id="replyItem.blogCommentId"
          :toUserId="replyItem.userId"
          :toUserName="replyItem.userName"
      ></ReplyCommentInput>
    </div>
  </div>
</template>

<script>
import ReplyCommentInput from "@/components/ReplyCommentInput";

export default {
  name: 'ReplyItem',
  data() {
    return {
      showReplyBox: false
    }
  },
  components: {
    ReplyCommentInput
  },
  props: ["replyItem"],
  methods: {
    // 显示回复框
    showReplyCommentBox() {
      this.showReplyBox = !this.showReplyBox;
    },
    // 添加回复的回复评论
    addCommentReply2(info,callback) {
      this.$emit("addCommentReply2", info,res=>{
        // 关闭评论框
        this.showReplyBox = false;
        callback("添加成功")
      });
    },
    // 删除回复
    deleteReply(id){
      this.$emit("deleteReply",id)
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-item {
  display: flex;
  background: #f7f8f9;
  padding: 15px;

  .reply-list-avatar {
    display: flex;
    align-items: center;
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;
    .img {
      width: 30px;
    }
  }

  .reply-list-info {
    width: 100%;
    margin-left: 8px;

    .reply-list-info-name {
      line-height: 30px;
      font-size: 14px;
    }
    .content{
      width: 550px;
      word-wrap: break-word;
      //white-space: pre-wrap;
    }
    .b {
      margin-top: 8px;
      display: flex;
      font-size: 12px;
      width: 90%;

      .reply-button {
        flex: 1;
        margin-left: 8px;
        span{
          cursor: pointer;

        }
      }

      .reply-delete-button {
        opacity: 0;
        color: red;
        cursor: pointer;
      }
    }
  }

  .reply-list-info:hover .reply-delete-button {
    opacity: 1 !important;
  }
}
</style>

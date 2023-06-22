<template>
  <div class="reply-input-box">
            <textarea class="input" v-model="commentContent"
                      :placeholder="'回复'+replyUserName"
            :style="`border: 1px solid  ${bgColor};    background-color: ${bgColor};`"></textarea>
    <el-button
        type="primary"
        class="button" @click="addCommentReply">发布
    </el-button>
  </div>
</template>

<script>

export default {
  name: '',
  data() {
    return {
      commentContent: ""
    }
  },
  props: ["id","replyUserName","bgColor","toUserId","toUserName"],
  methods: {
    // 发布回复评论
    addCommentReply() {
      console.log(this)
      this.$emit("addCommentReply", {content: this.commentContent, id: this.id,toUserId:this.toUserId,toUserName:this.toUserName},res=>{
        // 清除评论框内容
        this.commentContent = "";
        // 弹出添加成功
        this.$Message.success("添加回复成功")
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.reply-input-box {
  margin-top: 10px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .input {
    width: 100%;
    min-height: 80px;
    font-family: 微软雅黑;
    font-size: 15px;
    resize: none;
    padding: 10px 12px;
    //border-width: initial;
    //border-style: none;
    //border-color: initial;
    border-image: initial;
    border-radius: 5px;

    outline: none;
    box-sizing: border-box;
  }

  .input:focus {
    border-color: #80c0db!important;
  }

  .button {
    margin-top: 15px;
    //margin-right: 10px;
    //width: 60px;
    //text-align: center;
  }
}
</style>

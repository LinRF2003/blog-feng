<template>
  <div class="add-question">
    <div class="left">
      <MarkdownEditor
          @changeMarkdownText="changeMarkdownText"
          @changeHtml="changeHtml"
      ></MarkdownEditor>
    </div>
    <div class="right">
      <div class="title">
        <div class="text">添加标题</div>
        <el-input
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 14 }"
            v-model="title"
            class="input"
            placeholder="请输入标题"
        ></el-input>
      </div>
      <div class="tags">
        <div class="text">标签</div>
        <div class="add-tag" @click="showTagSelect=true">
          <el-tag
              :key="tag"
              v-for="tag in tags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              style="margin: 5px;cursor: pointer"

          >
            {{ tag }}
          </el-tag>
          <span class="l"  v-show="tags.length<5">+</span>
          <span class="r" v-show="tags.length<1" >至少添加一个标签</span>
        </div>
        <TagSelect
            @logout="logout"
            @changeTags="changeTags"
            :categoryTags="categoryTags"
            v-if="showTagSelect"
            :tagsMap="tagsMap"
            :left="-220"
            :top="75"
        ></TagSelect>
      </div>

      <el-button
          type="primary"
          class="submit-button"
          round
          @click="submitQuestion"
      >发布问题
      </el-button
      >
    </div>

  </div>
</template>

<script>
import TagSelect from "@/components/TagSelect.vue";

export default {
  name: "AddQuestion",
  components: {
    TagSelect,
  },
  data() {
    return {
      content: "",
      markdownContent: "",
      title: "",
      questionList: [], // 问题列表
      currentFT: "全部", //当前父标签
      tags: [],
      fatherTags: [],
      editorType: 1,
      showTagSelect: false,
      tagsMap:new Map()
    };
  },
  methods: {
    // 标签选择器退出方法
    logout() {
      this.showTagSelect = false;
    },
    // 改变选择标签列表
    changeTags(tagsMap) {
      this.tags = [...tagsMap.keys()];
      console.log(this.tags);
      this.tagsMap = tagsMap;
      this.fatherTags = JSON.stringify([...new Set(tagsMap.values())]);
      console.log(this.fatherTags);
    },
    // 内容的双向绑定
    changeHtml(event) {
      this.content = event;
    },
    // markdown内容的绑定
    changeMarkdownText(event) {
      this.markdownContent = event;
      console.log(this.markdownContent)
    },
    // 删除标签
    handleClose(tag) {
      let i = this.tags.indexOf(tag);
      this.tags.splice(i, 1);
      // // 删除数据
      // this.tagsMap.delete(tag);
    },
    // 提交问题
    async submitQuestion() {
      if(!this.content){
        this.$Message.warning("内容不能为空");
        return;
      }
      if(!this.title){
        this.$Message.warning("标题不能为空")
        return;
      }
      if(this.tags.length < 1){
        this.$Message.warning("标签不能为空")
        return;
      }
      let result = await this.$Request("/question/add", {
        title: this.title,
        content: this.content,
        fatherTags: this.fatherTags,
        tags: JSON.stringify(this.tags),
        markdownContent: this.markdownContent,
      });
      if (result.code === 200) {
        this.$Message.success("添加问题成功");
        // 刷新页面，清除数据
        location.reload();
      }
    },
  },
  computed: {
    categoryTags() {
      return this.$store.state.categoryTags;
    },
  },
  mounted() {
    // vuex 中添加标签列表
    if (!this.$store.state.categoryTags) {
      this.$store.dispatch("getTags");
    }
  },
};
</script>

<style scoped lang="scss">
.add-question {
  display: flex;

  .left {
    flex: 1;
  }

  .right {
    padding: 20px;
    margin-left: 15px;
    background: #fff;
    width: 300px;
    font-size: 14px;
    position: relative;

    .title {
      padding-bottom: 20px;
      border-bottom: 1px #ddd solid;

      :deep(.el-textarea__inner) {
        max-height: 300px;
      }
    }

    .text {
      margin-bottom: 10px;
    }

    .tags {
      padding-top: 20px;
      position: relative;

      .add-tag {
        color: #368cdd;
        .l {
          padding: 3px 5px;
          background: #ecf5ff;
          font-weight: 700;
          margin-right: 5px;
          cursor: pointer;
        }

        .r {
          font-size: 13px;
          cursor: pointer;
        }
      }
    }

    .submit-button {
      position: absolute;
      left: 50px;
      bottom: 30px;
      display: block;
      width: 200px;
    }
  }
}

</style>

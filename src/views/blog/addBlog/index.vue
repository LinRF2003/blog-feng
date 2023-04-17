<template>
  <div class="add-blog">
    <input
      type="text"
      placeholder="请输入文章标题"
      class="title"
      v-model="blogInfo.title"
      autofocus
    />

    <MarkdownEditor
      @changeMarkdownText="changeMarkdownText"
      @changeHtml="changeHtml"
    ></MarkdownEditor>
    <div class="detail">
      <div class="ti">文章设置</div>
      <div class="content">
        <el-form
          ref="blogInfo"
          :model="blogInfo"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="博客封面">
            <!-- 封面上传 -->
            <UploadPic
              class="upload"
              @getImageUrl="getImageUrl"
              :imageUrl="blogInfo.cover"
            ></UploadPic>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <div class="allow-comment">
              <el-radio-group v-model="blogInfo.type" class="radio">
                <el-radio :label="0">原创</el-radio>
                <el-radio :label="1">转载</el-radio>
                <el-form-item
                  label="原文地址"
                  v-if="blogInfo.type"
                  prop="reprintUrl"
                >
                  <el-input v-model="blogInfo.reprintUrl"></el-input>
                </el-form-item>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="标签" prop="tags" class="tags">
            <el-tag
              :key="tag"
              v-for="tag in blogInfo.tags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              style="margin: 0 5px"
            >
              {{ tag }}
            </el-tag>
            <el-button size="small" @click="dialogVisibleTags = true"
              >+ New Tag</el-button
            >
            <el-dialog
              title="标签"
              :visible.sync="dialogVisibleTags"
              width="30%"
              :before-close="closeDialog"
              center
              :modal="false"
              class="dialog"
            >
              <div class="dialog-content">
                <div class="left">
                  <div
                    :class="['ft', currentFatherTag === tag ? 'active' : '']"
                    v-for="(tag, index) in fatherTags"
                    :key="index"
                    @click="changeFatherTag(tag)"
                  >
                    {{ tag }}
                  </div>
                </div>
                <div class="right">
                  <el-tag
                    v-for="(tag, index) in tags"
                    :key="index"
                    :class="[
                      'tag',
                      blogInfo.tags.indexOf(tag) !== -1 ? 'tag-active' : '',
                    ]"
                    @click="clickTags(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
              </div>
            </el-dialog>
          </el-form-item>
          <el-form-item label="评论">
            <div class="allow-comment">
              <el-radio-group v-model="blogInfo.allowComment">
                <el-radio :label="1">允许</el-radio>
                <el-radio :label="0">不允许</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="博客摘要" prop="summary" class="summary">
            <el-input
              v-model="blogInfo.summary"
              type="textarea"
              placeholder="请输入摘要"
              :autosize="{ minRows: 4, maxRows: 4 }"
              resize="none"
            >
            </el-input>
            <a class="get" @click="getSummary"> 获取文章前200个字 </a>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="addBlog" class="add">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getSonTags } from "@/utils/methods";

export default {
  name: "AddBlog",
  data() {
    return {
      tagsMap: new Map(),
      currentFatherTag: "",
      tags: "",
      // 博客信息
      blogInfo: {
        content: "",
        markdownContent: "",
        title: "",
        allowComment: 1, // 博客评论
        summary: "", // 博客摘要
        cover: "", // 封面
        editorType: 1,
        type: null,
        reprintUrl: null, // 转载地址
        tags: [],
        fatherTags: [],
      },
      dialogVisibleTags: false, // 标签提示框
      // 表单验证
      rules: {
        categoryId: [{ required: true, message: "请选择博客分类" }],
        type: [{ required: true, message: "请选择类型" }],
        reprintUrl: [{ required: true, message: "请输入原文地址" }],
        summary: [
          { required: true, message: "不能为空" },
          {
            max: 200,
            min: 20,
            message: "字数在20-200之间",
          },
        ],
        tags: [{ required: true, message: "不能为空" }],
      },
    };
  },
  methods: {
    // 内容的双向绑定
    changeHtml(event) {
      this.blogInfo.content = event;
    },
    // markdown内容的绑定
    changeMarkdownText(event) {
      this.blogInfo.markdownContent = event;
    },
    // 获取封面图片链接
    getImageUrl(e) {
      this.blogInfo.cover = e;
    },
    // 删除tags的方法
    handleClose(tag) {
      let i = this.blogInfo.tags.indexOf(tag);
      this.blogInfo.tags.splice(i, 1);
      // 删除数据
      this.tagsMap.delete(tag);
    },
    // 关闭标签对话框
    closeDialog() {
      this.dialogVisibleTags = false;
    },

    // 改变当前父标签
    changeFatherTag(tag) {
      // 更改标签内容
      this.currentFatherTag = tag;
      // this.tags = [];
      // let tags = this.categoryTags[tag].tags;
      // for (const Tag in tags) {
      //   this.tags.push(tags[Tag]);
      // }
      this.tags = getSonTags(this.categoryTags, tag);
    },
    // 点击子标签
    clickTags(tag) {
      // 判断tags中是否已有此标签
      let i = this.blogInfo.tags.indexOf(tag);
      if (i !== -1) {
        this.blogInfo.tags.splice(i, 1);
        // 删除数据
        this.tagsMap.delete(tag);
        return;
      }
      // 判断标签是否超过5个
      if (this.blogInfo.tags.length >= 5) {
        return this.$Message.warning("标签不能超过五个");
      }
      // 设置标签map 利于查找父标签
      this.tagsMap.set(tag, this.currentFatherTag);
      let ft = new Set();
      // 转换下父标签数据
      for (const item of this.tagsMap.values()) {
        ft.add(item);
      }
      // 父标签不能大于3个
      if (ft.size > 3) {
        return this.$Message.warning("父标签不能大于三个");
      }
      this.blogInfo.tags.push(tag);
    },
    // 添加博客
    addBlog() {
      // 判断标题和内容是否为空
      if (!this.blogInfo.title || !this.blogInfo.content) {
        return this.$Message.warning("标题和内容不能为空");
      }
      if (this.blogInfo.title.length < 5) {
        return this.$Message.warning("标题不能少于五位");
      }
      let str = this.blogInfo.content.replace(/<[^<>]+>/g, "");
      str = str.replace(/\s*/g, "");
      if (str.length < 20) {
        return this.$Message.warning("内容不能少于20位");
      }
      // 判断博客详情是否正确
      this.$refs["blogInfo"].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        let ft = new Set();
        // 转换下父标签数据
        for (const item of this.tagsMap.values()) {
          ft.add(item);
        }
        let tags = JSON.stringify(this.blogInfo.tags);
        let fatherTags = JSON.stringify([...ft]);
        let result = await this.$Request("/blog/add", {
          ...this.blogInfo,
          tags,
          fatherTags,
        });
        if (result.code === 200) {
          this.$Message.success("发布成功");
          // 刷新页面，清除数据
          location.reload();
          // 跳转路由
        }
      });
    },
    // 获取文章前150个字
    getSummary() {
      let str = this.blogInfo.content.replace(/<[^<>]+>/g, "");
      str = str.replace(/\s*/g, "");
      this.blogInfo.summary = str.substring(0, 200);
    },
  },
  mounted() {
    if (!this.$store.state.categoryTags) {
      this.$store.dispatch("getTags");
    }
    // setTimeout(() => {
    //   console.log(this.fatherTags[0]);
    //   this.tags = getSonTags(
    //     this.$store.state.categoryTags,
    //     this.fatherTags[0]
    //   );
    //   this.currentFatherTag = this.fatherTags[0];
    // }, 1000);
  },
  computed: {
    categoryTags() {
      return this.$store.state.categoryTags;
    },
    fatherTags() {
      return this.$store.state.fatherTagsList;
    },
  },
  watch: {
    // categoryTags: function (newval, oldval) {
    //   this.tags = getSonTags(newval, this.fatherTags[0]);
    //   this.currentFatherTag = this.fatherTags[0];
    // },
    fatherTags: function (newval, oldval) {
      this.tags = getSonTags(this.$store.state.categoryTags, newval[0]);
      this.currentFatherTag = newval[0];
    },
  },

  // watch:{
  //   dialogVisibleTags:function(val,oldval){
  //     if(val) {
  //       let body = document.querySelector('.add-blog');
  //       console.log(body);
  //       body.addEventListener('click',() => {
  //        this.dialogVisibleTags = false;
  //       },true)
  //     }else{
  //       let body = document.querySelector('.add-blog');
  //       body.removeEventListener('click',() => {
  //         this.dialogVisibleTags = true;
  //       },true)
  //     }
  //   }
  // }
};
</script>

<style scoped lang="scss">
.add-blog {
  width: 88vw;
  margin: 0 auto;
  min-width: 1000px;

  .title {
    display: block;
    min-width: 1000px;
    //width: 60%;
    border: 0;
    outline: none;
    background: #f4f4f4;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    margin: 0 auto 16px;
    font-size: 25px;
    color: #333;
  }

  .detail {
    position: relative;
    width: 1000px;
    margin: 50px auto;
    background: #fff;
    padding: 40px;

    .ti {
      padding-bottom: 10px;
      font-size: 18px;
      font-weight: 550;
    }

    .add {
      position: absolute;
      bottom: -40px;
      right: 40px;
    }

    .content {
      padding: 40px;
      background: #fff;
      border: 1px solid #ccc;

      .radio {
        display: flex;
        align-items: center;
        height: 44px;

        :deep(input) {
          width: 500px;
        }
      }

      .tags {
        :deep(el-form-item__content) {
          position: relative;
        }

        .dialog {
          position: absolute;
          //right: -60px;
          top: -300px;
          width: 500px;
          height: 300px;
          //border:1px solid #ccc;
          :deep(.el-dialog__body) {
            padding: 0;
          }

          .dialog-content {
            padding: 10px;
            display: flex;

            .left {
              padding: 0 20px;
              max-height: 230px;
              overflow-y: scroll;
              min-width: 104px;

              .ft:hover {
                color: var(--main-color);
              }
            }

            .right {
              padding: 0 10px;

              .tag {
                margin: 0 5px;
              }

              .tag-active {
                background: var(--bg-color);
              }
            }
          }

          :deep(.el-dialog) {
            margin: 0 !important;
            width: 500px !important;
            height: 300px;
            border: 1px solid #ccc;
          }

          :deep(.el-dialog__header) {
            border-bottom: 1px solid #ccc;
            padding: 0 20px;
            font-weight: bold;

            .deep {
              top: 12px;
            }
          }
        }
      }

      .summary {
        position: relative;

        .get {
          position: absolute;
          right: 5px;
          top: 65px;
          font-size: 13px;
        }
      }
    }
  }
}
</style>

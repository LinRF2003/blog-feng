<template>
  <div class="add-blog">
    添加博客
    <MarkdownEditor class="editor"
                    markdownText="12341"
                    @changeMarkdownText="changeMarkdownText"
                    @changeHtml="changeHtml"
    ></MarkdownEditor>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor.vue'

export default {
  name: 'AddBlog',
  data(){
    return {
      // 博客信息
      blogInfo:{
        content:"",
        markdownContent:"",
      },
    }
  },
  components: {
    MarkdownEditor
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
  }
}
</script>

<style scoped lang="scss">
.add-blog {
  .editor{
    width: 88vw;
    margin: 0 auto;
  }
}
</style>

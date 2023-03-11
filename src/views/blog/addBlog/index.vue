<template>
  <div>
    添加博客
    <MarkdownEditor></MarkdownEditor>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor.vue'
export default {
  name: 'AddBlog',
  components:{
    MarkdownEditor
  }
}
</script>

<style>
</style>

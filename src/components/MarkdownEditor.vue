<template>
  <v-md-editor
      v-model="text"
      height="700px"
      @change="changeContent"
      @upload-image="handleUploadImage"
      :disabled-menus="[]"
      :toc-nav-position-right="true"
      @fullscreen-change="changeFull"

  ></v-md-editor>
</template>

<script>

import Vue from 'vue';
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';

VMdEditor.Codemirror = Codemirror;

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

Vue.use(VMdEditor);

export default {
  data() {
    return {
      text: "",
      editor: "",
    };
  },
  props: ["markdownText"],
  methods: {
    changeContent(text, html) {
      this.$emit("changeMarkdownText", text);
      this.$emit("changeHtml", html);
    },
    async handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容

      let data = new FormData();
      data.append("img", files[0]);
      data.append("type", "1");

      let result = await this.$Request(
          "/imgUpload",
          data,
          {
            headers: {
              'Content-Type': "multipart/form-data",
            },
          }
      );
      // 返回的数据
      insertImage({
        url: result.data.path,
        desc: result.data.name,
      });


    }
    ,
    // 切换全屏状态时触发的事件
    changeFull(isFullscreen) {
      if (isFullscreen) {
        this.editor.style.width = '100vw';
      } else {
        this.editor.style.width = '88vw';
      }
    }
  },
  mounted() {
    if (this.markdownText) {
      this.text = this.markdownText;
    }
    this.editor = document.querySelector('.v-md-editor');
  },

};
</script>

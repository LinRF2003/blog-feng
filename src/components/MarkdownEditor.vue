<template>
  <v-md-editor v-model="text" height="700px"></v-md-editor>
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
      text: '',
    };
  },
};
// export default {
//   data() {
//     return {
//       text: "",
//     };
//   },
//   props: ["height", "markdown"],
//   methods: {
//     changeContent(text, html) {
//       this.$emit("changeM", text);
//       this.$emit("change", html);
//     },
//     // async handleUploadImage(event, insertImage, files) {
//     //   // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
/*    //*/
/*    //   let data = new FormData();*/
/*    //   data.append("img", files[0]);*/
/*    //   data.append("type", "1");*/
/*    //*/
/*    //   let result = await this.$request({*/
/*    //     method: "POST",*/
/*    //     url: "/imgUpload",*/
/*    //     data: data,*/
/*    //     headers: {*/
/*    //       enctype: "multipart/form-data",*/
/*    //     },*/
/*    //   });*/
/*    //*/
/*    //   // 返回的数据*/
//     //   insertImage({
//     //     url: result.data.data.path,
//     //     desc: result.data.data.name,
//     //   });
//     // },
//   },
// };
</script>

<style>
.CodeMirror-scroll {
  padding-bottom: 10px !important;
}
</style>
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import { Button, Form, FormItem, Input, Checkbox, Radio, RadioGroup, Image, Select, Option, Upload, Tag, Dialog, Divider, Loading, Pagination, DatePicker, Dropdown, DropdownMenu, DropdownItem, Tabs, TabPane } from 'element-ui';
Vue.use(Button);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Image);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Upload);
Vue.use(Tag);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Divider);
Vue.use(Pagination);
Vue.use(DatePicker);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
// 引入路由
import router from './router/index.js'
// 引入vuex
import store from '@/store/index';
// 引入基础样式
import '@/assets/base.scss'
// 引入封装axios的请求
import Request from "@/utils/Request";
Vue.prototype.$Request = Request;
// 引入封装的message
import Message from '@/utils/Message';
Vue.prototype.$Message = Message;
// 引入全局上传文件的路径
import { UploadAction } from './utils/config';
Vue.prototype.$UploadAction = UploadAction;


// 引入markdonw编辑器
import MarkdownEditor from "@/components/MarkdownEditor";
// 引入上传图片的全局组件
import UploadPic from '@/components/UploadPic';
import Null from "@/components/Null";
// 引入分页器组件
import PaginationItem from '@/components/PaginationItem'
// 引入博客item
import BlogItem from '@/components/BlogItem'//
import UserItem from '@/components/UserItem'//
// 引入问题item
import QuestionItem from '@/components/QuestionItem'
import DynamicItem from '@/components/DynamicItem'
Vue.component('UploadPic', UploadPic)
Vue.component('Null', Null)
Vue.component('PaginationItem', PaginationItem)
Vue.component('MarkdownEditor', MarkdownEditor)
Vue.component('BlogItem', BlogItem)
Vue.component('QuestionItem', QuestionItem)
Vue.component('DynamicItem', DynamicItem)
Vue.component('UserItem', UserItem)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

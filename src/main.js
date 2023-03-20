import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import { Button,Form,FormItem,Input,Checkbox,Radio,RadioGroup,Image,Select,Option,Upload,Tag,Dialog,Divider,Loading,Pagination} from 'element-ui';
Vue.use(Button);
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


// 引入上传图片的全局组件
import UploadPic from '@/components/UploadPic';
import Null from "@/components/Null";
// 引入分页器组件
import PaginationItem from '@/components/PaginationItem'
Vue.component('UploadPic', UploadPic)
Vue.component('Null', Null)
Vue.component('PaginationItem', PaginationItem)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

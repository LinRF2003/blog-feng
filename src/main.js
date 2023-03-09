import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import { Button,Form,FormItem,Input,Checkbox} from 'element-ui';
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
// 引入路由
import router from './router/index.js'
// 引入基础样式
import '@/assets/base.scss'
// 引入封装axios的请求
import Request from "@/utils/Request";
Vue.prototype.$Request = Request;
// 引入封装的message
import Message from '@/utils/Message';
Vue.prototype.$Message = Message;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

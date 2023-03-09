import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入路由
import router from './router/index.js'

// 引入封装axios的请求
import request from "@/utils/request";
Vue.prototype.$Request = request

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

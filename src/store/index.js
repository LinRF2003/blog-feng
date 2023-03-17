import Vue from 'vue';
import Vuex from 'vuex';
import Request from "@/utils/Request";

Vue.use(Vuex);
//不是在生产环境debug为true
const debug = process.env.NODE_ENV !== 'production';
//创建Vuex实例对象
const store = new Vuex.Store({
    strict: debug,//在不是生产环境下都开启严格模式
    state: {
        categoryTags: null,
    },
    getters: {},
    mutations: {
        SETCATEGORYTAGS(state, tags) {
            state.categoryTags = tags
        },



    },
    actions: {
        // 获取标签
        async getTags({commit}) {
            let result = await Request('/tags/get');
            if (result.code === 200) {
                commit("SETCATEGORYTAGS", result.categoryTags);
            }
        },
        /*
         todo
          state中定义父标签数组， 增加传入父标签获取子标签数组，页面中需要自己做好数据变化
         */
    }
})
export default store;

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
        fatherTagsList:[],
        userInfo:null, // 用户信息
    },
    getters: {},
    mutations: {
        // 设置分类标签
        SETCATEGORYTAGS(state, tags) {
            state.categoryTags = tags
        },
        // 设置父标签
        SETFATHERTAGS(state,ft){
            state.fatherTagsList = ft;
        },
        // 设置用户信息
        SETUSERINFO(state,userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        // 获取标签
        async getTags({commit}) {
            let result = await Request('/tags/get');
            if (result.code === 200) {
                commit("SETCATEGORYTAGS", result.categoryTags);
                // 获取父标签列表
                let ft = [];
                for (const tag in  result.categoryTags) {
                    ft.push(tag);
                }
                commit("SETFATHERTAGS",ft)
            }
        },
        // 获取用户信息
        async getUserInfo({commit}) {
            let result = await Request('/user/get');
            if(result.code === 200) {
                commit("SETUSERINFO", result.userInfo);
            }
        }
    }
})
export default store;

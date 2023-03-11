import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* 配置路由 */
const routes = [
    {
        path: '/',
        component: () => import('@/layout/basicLayout.vue'), //页面框架
        children: [
            {
                path: '/',
                meta: {activePath: "/"}, //参数
                component: () => import('@/views/blog/index.vue'),
            },
            {
                path: '/question',
                meta: {activePath: "/question"}, //参数
                component: () => import('@/views/question/index.vue'),
            },
            {
                path: '/user',
                meta: {activePath: "/user"}, //参数
                component: () => import('@/views/user/index.vue'),
            },
        ]
    },
    {
        path:'/addblog',
        component:()=>import('@/views/blog/addBlog/index.vue')
    },
    {
        path: '/login', // 登录
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/register',  // 注册
        component: () => import('@/views/register/index.vue')
    },
]

/* 实例化路由 */
const router = new VueRouter({
    routes,            // （简写）相当于 routes: routes
    mode: "history",  // 去掉网站里的#/
})

// 全局守卫:前置守卫（在路由跳转之间进行判断）
router.beforeEach((to, from, next) => {
    // 获取存储localStorage的token
    let token = window.localStorage.getItem('token') || ''
    // 获取存储token的开始时间
    const tokenStartTime = window.localStorage.getItem('tokenStartTime')
    // 定义token过期时间 后端时间为30天  前端定义15天
    const timeOver = 15 * 24 * 60 * 60 * 1000
    // 当前时间
    let date = new Date().getTime()
    // 如果大于说明是token过期了
    if (date - tokenStartTime > timeOver) {
        token = null
    }

    if (!token) {
        // 如果去登录注册页，不用token
        if (to.path == '/register' || to.path == '/login') {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }

})
/* 导出路由模块 */
export default router
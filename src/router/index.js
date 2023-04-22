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
                path: '/addQuestion',
                meta: {activePath: "/question"}, //参数
                component: () => import('@/views/question/addQuestion/index.vue'),
            },
            {
                path: '/questionDetail/:id',
                meta: {activePath: "/question"}, //参数
                component: () => import('@/views/question/questionDetail/index.vue'),
            },
            {
                path: '/user',
                meta: {activePath: "/user"}, //参数
                component: () => import('@/views/user/index.vue'),
                children: [
                    {
                        path: '/',
                        name: '个人信息',
                        meta: {activePath: "/user", activePath2: "/myinfo"},
                        component: () => import('@/views/user/myInfo/index.vue'),
                    },
                    {
                        path: 'account',
                        name: '账号设置',
                        meta: {activePath: "/user", activePath2: "/AS"},
                        component: () => import('@/views/user/account/index.vue'),
                        children: [
                            {
                                path: 'password',
                                name: '修改密码',
                                meta: {activePath: "/user", activePath2: "/AS", title: "修改密码"},
                                component: () => import('@/views/user/account/password/index.vue'),
                            },
                            {
                                path: 'email',
                                name: '修改邮箱',
                                meta: {
                                    activePath: "/user", activePath2: "/AS", title: "修改邮箱"
                                },
                                component: () => import('@/views/user/account/email/index.vue'),
                            }
                        ]
                    }
                ]
            },
            {
                path: '/search',
                name:"搜索",
                // meta: {activePath: "/question"}, //参数
                component: () => import('@/views/search/index.vue'),
            }
        ]
    },
    {
        path: '/addblog',
        component: () => import('@/views/blog/addBlog/index.vue')
    },
    {
        path: '/blogdetail/:id',
        name: '博客详情',
        component: () => import('@/views/blog/blogDetail/index.vue'),
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
    routes,
    mode: "history",  // 去掉网站里的#/
})

// 全局守卫:前置守卫（在路由跳转之间进行判断）
router.beforeEach((to, from, next) => {
    // 获取存储localStorage的token
    let token = window.localStorage.getItem('token') || '';
    // 获取存储token的开始时间
    const tokenStartTime = window.localStorage.getItem('tokenStartTime');
    // 定义token过期时间 后端时间为30天  前端定义3天
    const timeOver = 3 * 24 * 60 * 60 * 1000;
    // 当前时间
    let date = new Date().getTime();
    // 如果大于说明是token过期了
    if (date - tokenStartTime > timeOver) {
        token = null
    }

    if (!token) {
        // 如果去登录注册页，不用token
        if (to.path == '/register' || to.path == '/login') {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }

})
/* 导出路由模块 */
export default router;
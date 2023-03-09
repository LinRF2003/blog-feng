import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

/* 配置路由 */
const routes = [
    {
        path: '/',
            component: () => import('@/layout/basicLayout.vue'), //页面框架
    },

    // {
    //     path: '/',
    //     component: () => import('@/views/framework.vue'), //页面框架
    //     children: [
    //         {
    //             path: '/',
    //             // name: '博客',
    //             meta: { activePath: "/" }, //参数
    //             component: () => import('@/views/blog/blog.vue'),
    //             children: [
    //
    //                 {
    //                     path: 'likeblog',
    //                     name: '我赞',
    //                     meta: { activePath: "/" }, //参数
    //                     component: () => import('@/views/blog/myLike.vue'),
    //                 },
    //                 {
    //                     path: 'commentblog',
    //                     name: '我评',
    //                     meta: { activePath: "/" }, //参数
    //                     component: () => import('@/views/blog/myComment.vue'),
    //                 },
    //             ]
    //         },
    //         {
    //             path: 'search',
    //             name: '搜索',
    //             meta: { activePath: "/" }, //参数
    //             component: () => import('@/views/search/search.vue'),
    //         },
    //         {
    //             path: '/editblog',
    //             name: '编辑博客',
    //             meta: { activePath: "/" }, //参数
    //             component: () => import('@/views/blog/editBlog.vue'),
    //         },
    //         {
    //             path: '/myblog',
    //             name: '我的博客',
    //             meta: { activePath: "/" }, //参数
    //             component: () => import('@/views/blog/myBlog.vue'),
    //         },
    //         // {
    //         //     path: '/blogdetail/:blogId',
    //         //     name: '博客详情',
    //         //     meta: { activePath: "/" }, //参数
    //         //     component: () => import('@/views/blog/blogDetail.vue'),
    //         // },
    //         {
    //             path: '/category',
    //             name: '专栏分栏',
    //             meta: { activePath: "/category" },
    //             component: () => import('@/views/category/category.vue'),
    //         },
    //         {
    //             path: '/categorydetail/:categoryId',
    //             name: '分类详情',
    //             meta: { activePath: "/category" }, //参数
    //             component: () => import('@/views/category/categoryDetail.vue'),
    //         },
    //         {
    //             path: '/question',
    //             name: '问答',
    //             meta: { activePath: "/question" },
    //             component: () => import('@/views/question/question.vue'),
    //         },
    //         {
    //             path: '/dynamic',
    //             name: '动态',
    //             meta: { activePath: "/dynamic" },
    //             component: () => import('@/views/dynamic/dynamic.vue'),
    //         },
    //         {
    //             path: '/my',
    //             meta: { activePath: "/my" },
    //             component: () => import('@/views/my/my.vue'),
    //             children: [
    //                 {
    //                     path: '/',
    //                     name: '个人信息',
    //                     meta: { activePath: "/my", activePath2: "/myinfo" },
    //                     component: () => import('@/views/my/myInfo.vue'),
    //                 },
    //                 {
    //                     path: 'recovery',
    //                     name: '回收站',
    //                     meta: { activePath: "/my", activePath2: "/recovery" },
    //                     component: () => import('@/views/my/recovery.vue'),
    //                 },
    //                 {
    //                     path: 'accountsettings',
    //                     name: '账号设置',
    //                     meta: { activePath: "/my", activePath2: "/AS" },
    //                     component: () => import('@/views/my/accountSettings.vue'),
    //                     children: [
    //                         {
    //                             path: 'password',
    //                             name: '修改密码',
    //                             meta: { activePath: "/my", activePath2: "/AS", title: "修改密码" },
    //                             component: () => import('@/views/my/account/password.vue'),
    //                         },
    //                         {
    //                             path: 'phone',
    //                             name: '修改手机',
    //                             meta: {
    //                                 activePath: "/my", activePath2: "/AS", title: "修改手机"
    //                             },
    //                             component: () => import('@/views/my/account/phone.vue'),
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //
    //     ]
    // },
    // {
    //     path: '/blogdetail/:blogId',
    //     name: '博客详情',
    //     meta: { activePath: "/" }, //参数
    //     component: () => import('@/views/blog/blogDetail.vue'),
    // },
    {
        path: '/login', // 登录
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/register',    // 注册
        component: () => import('@/views/register/index.vue')
    },
    // {
    //     path: '/test',    // 注册
    //     component: () => import('@/components/EditorMarkdown.vue')
    // }
]

/* 实例化路由 */
const router = new VueRouter({
    routes,            // （简写）相当于 routes: routes
    mode: "history",  // 去掉网站里的#/
})

//全局守卫:前置守卫（在路由跳转之间进行判断）
// router.beforeEach((to, from, next) => {
//
//     // 获取存储localStorage的token
//     let token = window.localStorage.getItem('token') || ''
//     // 获取存储token的开始时间
//     const tokenStartTime = window.localStorage.getItem('tokenStartTime')
//     // 后台给出的token有效时间，一个星期 单位 是秒
//     // 我们自己定义6天过期，让用户重新登录一下， 用户总不可能在一个页面挂机一天吧
//     const timeOver = 10 * 60 * 10 * 1000
//     // 当前时间
//     let date = new Date().getTime()
//     // 如果大于说明是token过期了
//     if (date - tokenStartTime > timeOver) {
//         token = null
//     }
//
//     if (!token) {
//         // 如果去登录注册页，不用token
//         if (to.path == '/register' || to.path == '/login') {
//             next()
//         } else {
//             next('/login')
//         }
//     } else {
//         next()
//     }
//
// })
/* 导出路由模块 */
export default router
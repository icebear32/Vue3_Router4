import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        title: string
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), //历史模式
    routes: [
        {
            path: '/',
            component: () =>import('../views/Login.vue'),
            meta: {
                title: "登录页面"
            }
        },
        {
            path: '/index',
            component: () =>import('../views/Index.vue'),
            meta: {
                title: "首页"
            }
        }
    ]
})

export default router //将路由缺省暴露出去，其他文件才可访问
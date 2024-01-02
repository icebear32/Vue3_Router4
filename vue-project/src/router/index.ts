import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), //历史模式
    routes: [
        {
            path: '/',
            component: () =>import('../views/Login.vue')
        },
        {
            path: '/index',
            component: () =>import('../views/Index.vue')
        }
    ]
})

export default router //将路由缺省暴露出去，其他文件才可访问
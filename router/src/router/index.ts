import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 路由表映射
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: 'Login',
        component: () => import('../components/login.vue') //引入需要用的组件
    },
    {
        path: "/reg",
        name: 'Reg',
        component: () => import('../components/reg.vue') //引入需要用的组件
    },
    {
        path: "/list",
        name: 'List',
        component: () => import('../components/demo01/list.vue') //引入需要用的组件
    },
    {
        path: "/detail",
        name: 'Detail',
        component: () => import('../components/demo01/detail.vue') //引入需要用的组件
    },
    {
        path: "/list2",
        name: 'List2',
        component: () => import('../components/demo01/list2.vue') //引入需要用的组件
    },
    {
        path: "/detail2/:name/:price/:id", // 配置要传递的参数
        name: 'Detail2',
        component: () => import('../components/demo01/detail2.vue') //引入需要用的组件
    }
]

const router = createRouter({
    history: createWebHistory(), //历史模式
    routes //路由规则
})

export default router //将路由缺省暴露出去，其他文件才可访问
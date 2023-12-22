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
    },
    {
        path: "/father", // 配置要传递的参数
        name: 'Father',
        component: () => import('../components/demo02/father.vue'), //引入需要用的组件
        children: [
            {
                path: "child1", // 配置要传递的参数
                name: 'Child1',
                component: () => import('../components/demo02/child1.vue') //引入需要用的组件
            },
            {
                path: "child2", // 配置要传递的参数
                name: 'Child2',
                component: () => import('../components/demo02/child2.vue') //引入需要用的组件
            }
        ]
    },
    {
        path: '/root',
        component: () => import('../components/demo03/root.vue'),
        children: [
            {
                path: '/user1',
                components: {
                    default: () => import('../components/demo03/A.vue')
                }
            },
            {
                path: '/user2',
                components: {
                    bbb: () => import('../components/demo03/B.vue'),
                    ccc: () => import('../components/demo03/C.vue')
                }
            }
        ]
    },
    {
        path: '/root1',
        component: () => import('../components/demo04/root.vue'),
        // redirect: '/user3', //第一种：字符串形式配置，访问/ 重定向到 /user （地址栏显示/,内容为/user路由的内容）
        // redirect: {
        //     path: '/user3'
        // }, // 对象形式配置
        redirect: to => {
            console.log(to, '=>')

            return {
                path: '/user3',
                query: {
                    name: 'ich'
                }
            }
        }, // 函数模式（可以传参）
        // 将 /root1 别名为 /roota，意味着当用户访问 /roota 时，URL 仍然是 /user3，但会被匹配为用户正在访问 /root1
        alias: ['/roota', '/rootb', '/rootc'], // 别名
        children: [
            {
                path: '/user3',
                components: {
                    default: () => import('../components/demo04/A.vue')
                }
            },
            {
                path: '/user4',
                components: {
                    bbb: () => import('../components/demo04/B.vue'),
                    ccc: () => import('../components/demo04/C.vue')
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(), //历史模式
    routes //路由规则
})

export default router //将路由缺省暴露出去，其他文件才可访问
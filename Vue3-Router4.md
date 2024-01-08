[TOC]



# Vue3-Router4



## 安装

```
npm init vite@latese
```



```
npm install vue-router -S
```



在**src的components**目录下创建login.vue和reg.vue

```vue
<script setup lang="ts">
</script>

<template>
    <div class="login">Login</div>
</template>

<style>
.login {
    background: red;
    height: 400px;
    width: 400px;
    font-size: 20px;
    color: white;
}
</style>

```

```vue
<script setup lang="ts">
</script>

<template>
    <div class="reg">Reg</div>
</template>

<style>
.reg {
    background: green;
    height: 400px;
    width: 400px;
    font-size: 20px;
    color: white;
}
</style>

```



**src/main.ts**，添加使用**router**插件，启动路由（在main.ts中引入路由）

```ts
import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```



在**src**目录下创建**router**文件夹，在**router**下创建路由映射**index.ts**

```ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 路由表映射
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import('../components/login.vue') //引入需要用的组件
    },
    {
        path: "/reg",
        component: () => import('../components/reg.vue') //引入需要用的组件
    }
]

const router = createRouter({
    history: createWebHistory(), //历史模式
    routes //路由规则
})

export default router //将路由缺省暴露出去，其他文件才可访问
```



**src/App.vue**

router-view：路由出口，路由匹配到的组件将渲染在这里（显示请求过来的页面 ）

router-link：使用router-link指令使用路由，to中写的路径会在路由表映射中进行匹配，然后加载对应的组件

```vue
<script setup lang="ts">
</script>

<template>
  <div>
    <h1>hello world</h1>
    <div>
      <router-link to="/">Login</router-link>
      <router-link to="/reg" style="margin-left: 10px;">Reg</router-link>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>

```



## 命名路由-编程式导航

**router/index.ts**

```ts
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
    }
]

const router = createRouter({
    history: createWebHistory(), //历史模式
    routes //路由规则
})

export default router //将路由缺省暴露出去，其他文件才可访问
```

**src/App.vue**

直接通过a href也可以跳转但是会刷新页面

```vue
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter() // router 的实例方法

const toLogin = (url: string) => {
  router.push(url)
}


const toReg = (url: string) => {
  router.push({
    path: url
  })
}

const toLoginName = (url: string) => {
  router.push({
    name: url
  })
}
</script>

<template>
  <div>
    <div>
      <h3>命名路由</h3>
      <router-link :to="{ name: 'Login' }">Login</router-link>
      <router-link :to="{ name: 'Reg' }" style="margin-left: 10px;">Reg</router-link>
      <h3>a标签跳转</h3>
      <a href="/reg">a-reg</a>
      <h3>编程式导航</h3>
      <button @click="toLogin('/')">字符串模式-Login</button>
      <button @click="toReg('/reg')" style="margin-left: 10px;">对象模式-Reg</button>
      <button @click="toLoginName('Login')" style="margin-left: 10px;">命名模式-Login</button>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

```



## 历史记录

replace的使用

横跨历史

**src/App.vue**

```vue
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter() // router 的实例方法

const toPage = (url: string) => {
  router.replace(url)
}

const next = () => {
  //前进 数量不限于1
  router.go(1)
}

const prev = () => {
  //后退
  router.back()
}
</script>

<template>
    <div>
      <h3>replace的使用</h3>
      <h4>replace的使用 router-link</h4>
      <router-link replace to="/">Login</router-link>
      <router-link replace style="margin-left:10px" to="/reg">Reg</router-link>
      <h4>replace的使用 编程式导航</h4>
      <button @click="toPage('/')">Login</button>
      <button @click="toPage('/reg')" style="margin-left:10px">Reg</button>
      <h3>横跨历史</h3>
      <button @click="next">前进</button>
      <button @click="prev" style="margin-left:10px">后退</button>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

```



## 路由传参



### Query路由传参

编程式导航 使用router push 或者 replace 的时候 改为对象形式新增 query 必须传入一个对象



创建**list.json和list.vue、detail.vue**

```json
{
    "data": [
        {
            "name": "电脑",
            "price": 10000,
            "id": 1
        },
        {
            "name": "手机",
            "price": 5000,
            "id": 2
        },
        {
            "name": "平板",
            "price": 8000,
            "id": 3
        }
    ]
}
```

list.vue

```vue
<script setup lang="ts">
import { data } from './list.json'
import { useRouter } from 'vue-router'

const router = useRouter()

type Item = {
    name: string;
    price: number;
    id: number;
}

const toDetail = (Item: Item) => {
    router.push({
        name: 'Detail',
        query: Item
    })
}
</script>

<template>
    <div>列表页面</div>
    <table cellpadding="0" class="table" border="1">
        <thead>
            <tr>
                <th>商品</th>
                <th>价格</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr :key="item.id" v-for="item in data">
                <th>{{ item.name }}</th>
                <th>{{ item.price }}</th>
                <th>
                    <button @click="toDetail(item)">详情</button>
                </th>
            </tr>
        </tbody>
    </table>
</template>

<style>
.table {
    width: 400px;
}
</style>

```

detail.vue

**接受参数**，使用 useRoute 的 query

```vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router' // 取值用：useRoute

const route = useRoute()
const router = useRouter()
</script>

<template>
    <div>
        <h3>详情页面</h3>
        <button @click="router.back()">返回</button>
        <div>品牌：{{ route.query?.name }}</div>
        <div>价格：{{ route.query?.price }}</div>
        <div>ID：{{ route.query?.id }}</div>
    </div>
</template>

<style></style>

```



**router/index.ts**

```ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 路由表映射
const routes: Array<RouteRecordRaw> = [
    {
        path: "/list",
        name: 'List',
        component: () => import('../components/list.vue') //引入需要用的组件
    },
    {
        path: "/detail",
        name: 'Detail',
        component: () => import('../components/detail.vue') //引入需要用的组件
    }
]

const router = createRouter({
    history: createWebHistory(), //历史模式
    routes //路由规则
})

export default router //将路由缺省暴露出去，其他文件才可访问
```



**App.vue**

```vue
<script setup lang="ts">
</script>

<template>
  <div>
    <div>
      <h3>路由传参</h3>
      <router-link :to="{ name: 'List' }">list页面</router-link>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

```

运行到浏览器查看，list.vue的数据可以传到detail.vue中展示



### Params路由传参

编程式导航 使用router push 或者 replace 的时候 改为对象形式并且只能使用name，path无效，然后传入params

创建**list2.json和list2.vue、detail2.vue**

list2.json

```json
{
    "data": [
        {
            "name": "电脑2",
            "price": 20000,
            "id": 1
        },
        {
            "name": "手机2",
            "price": 10000,
            "id": 2
        },
        {
            "name": "平板2",
            "price": 16000,
            "id": 3
        }
    ]
}
```

list2.vue

```vue
<script setup lang="ts">
import { data } from './list2.json'
import { useRouter } from 'vue-router'

const router = useRouter()

type Item = {
    name: string;
    price: number;
    id: number;
}

const toDetail2 = (item: Item) => {
    router.push({
        name: 'Detail2',
        params: item
    })
}
</script>

<template>
    <div>列表页面</div>
    <h3>Params路由传参</h3>
    <table cellpadding="0" class="table" border="1">
        <thead>
            <tr>
                <th>商品</th>
                <th>价格</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr :key="item.id" v-for="item in data">
                <th>{{ item.name }}</th>
                <th>{{ item.price }}</th>
                <th>
                    <button @click="toDetail2(item)">详情</button>
                </th>
            </tr>
        </tbody>
    </table>
</template>

<style>
.table {
    width: 400px;
}
</style>

```

detail2.vue

```vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router' // 取值用：useRoute

const route = useRoute()
const router = useRouter()
</script>

<template>
    <h2>详情页面</h2>
    <div>
        <h3>Params路由传参</h3>
        <button @click="router.back()">返回</button>
        <div>品牌：{{ route.params?.name }}</div>
        <div>价格：{{ route.params?.price }}</div>
        <div>ID：{{ route.params?.id }}</div>
    </div>
</template>

<style></style>

```

**router/index.ts**

```ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 路由表映射
const routes: Array<RouteRecordRaw> = [
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
```



App.vue

```vue
<script setup lang="ts">
</script>

<template>
    <div>
      <h3>路由传参</h3>
      <router-link :to="{ name: 'List' }">list页面-Query路由传参</router-link>
      <router-link :to="{ name: 'List2' }" style="margin-left: 10px;">list页面-Params路由传参</router-link>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

```

运行到浏览器查看，list2.vue的数据可以传到detail2.vue中展示



## 嵌套路由

一些应用程序的 UI 由多层嵌套的组件组成



在**src\components**创建目录**demo02**，并创建**father.vue，child1.vue，child2.vue**

father.vue

```vue
<script setup lang="ts">

</script>

<template>
    <div>
        <h1>父路由</h1>
        <div>
            <router-link :to="{ name: 'Child1' }">child1</router-link>
            <router-link :to="{ name: 'Child2' }" style="margin-left: 10px;">child2</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<style></style>
```

child1.vue

```vue
<script setup lang="ts">

</script>

<template>
    <div>
        <h2>子路由1</h2>
    </div>
</template>

<style></style>
```

child2.vue

```vue
<script setup lang="ts">

</script>

<template>
    <div>
        <h2>子路由2</h2>
    </div>
</template>

<style></style>
```

路由配置，**router/index.ts**，`children` 配置只是另一个路由数组

```ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 路由表映射
const routes: Array<RouteRecordRaw> = [
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
    }
]

const router = createRouter({
    history: createWebHistory(), //历史模式
    routes //路由规则
})

export default router //将路由缺省暴露出去，其他文件才可访问
```

**src/App.vue**

```vue
<script setup lang="ts">
</script>

<template>
    <div>
      <h3>嵌套路由</h3>
      <router-link :to="{ name: 'Father' }">嵌套路由-父路由</router-link>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

```

运行到浏览器，进入父路由，再点击子路由，在父路由部分继续显示子路由内容



### 嵌套路由使用场景

* 平时开发中，应用的有些界面是由多层级组件组合而来的，这种情况下，url各部分通常对应某个嵌套的组件，`vue-router`中可以使用嵌套路由表示这种关系
* 表现形式是在两个路由间切换时，它们有公用的视图内容。此时通常提取一个父组件，内部放上`<router-view>`，从而形成物理上的嵌套，和逻辑上的嵌套对应起来。定义嵌套路由时使用`children`属性组织嵌套关系
* 原理上是在`router-view`组件内部判断其所处嵌套层级的深度，将这个深度作为匹配组件数组`matched`的索引，获取对应渲染组件并渲染。



## 命名视图

命名视图可以在同一级（同一个组件）中展示更多的路由视图，而不是嵌套显示

App.vue

```vue
<script setup lang="ts">
</script>

<template>
    <div>
      <h3>命名视图</h3>
      <router-link to="/root">root</router-link>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

```

router/index.ts

```ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 路由表映射
const routes: Array<RouteRecordRaw> = [
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
    }
]

const router = createRouter({
    history: createWebHistory(), //历史模式
    routes //路由规则
})

export default router //将路由缺省暴露出去，其他文件才可访问
```

root.vue

```vue
<template>
    <div>
        <router-link to="/user1">user1</router-link>
        <router-link to="/user2" style="margin-left: 10px;">user2</router-link>
        <hr>
        <router-view></router-view>
        <router-view name="bbb"></router-view>
        <router-view name="ccc"></router-view>
    </div>
</template>
```

A.vue

```vue
<template>
    <div>Aaa</div>
</template>
```

B.vue

```vue
<template>
    <div>Bbb</div>
</template>
```

C.vue

```vue
<template>
    <div>Ccc</div>
</template>
```



## 重定向-别名

访问/ 重定向到 /user （地址栏显示/,内容为/user路由的内容）



将**命名视图**的root.vue、A.vue、B.vue、C.vue复制到新目录

App.vue

```vue
<script setup lang="ts">
</script>

<template>
    <div>
      <h3>重定向-别名</h3>
      <router-link to="/root1">root</router-link>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

```

**router/index.tx**，进行路由配置

```ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 路由表映射
const routes: Array<RouteRecordRaw> = [
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
```



## 导航守卫



### 全局前置守卫

**router.beforeEach**

```ts
router.beforeEach((to, form, next) => {
    console.log(to, form);
    next()
})
```

* 每个守卫方法接收三个参数：
  * to: Route， 即将要进入的目标 路由对象
  * from: Route，当前导航正要离开的路由
  * next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)
  * next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址
  * next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。



案例：权限判断

**src目录创建views目录，并创建 Index.vue 和 Login.vue **

Index.vue

```vue
<script setup lang="ts">

</script>

<template>
    Index
</template>

<style scoped>
</style>

```

Login.vue

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { type FormItemRule, type FormInstance, ElMessage } from 'element-plus'

const router = useRouter()

type Form = {
    user: string,
    password: string
}
type Rules = {
    [k in keyof Form]?: Array<FormItemRule>
}
const formInline = reactive<Form>({
    user: '',
    password: '',
})
const form = ref<FormInstance>()
const rules = reactive<Rules>({
    user: [
        {
            required: true,
            message: '请输入账号',
            type: "string",
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            type: "string",
        }
    ]
})

const onSubmit = () => {
    // console.log('submit!', form.value)
    form.value?.validate((validate) => {
        if (validate) {
            router.push('./index')
            localStorage.setItem('token', '1')
        } else {
            ElMessage.error('请输入完整')
        }
    })
}
</script>

<template>
    <div class="login">
        <el-card class="box-card">
            <el-form ref="form" :rules="rules" :model="formInline" class="demo-form-inline">
                <el-form-item prop="user" label="账号：">
                    <el-input v-model="formInline.user" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item prop="password" label="密码：">
                    <el-input v-model="formInline.password" type="password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<style scoped>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}
</style>

```

**src/router/index.ts**

```ts
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
```

App.vue

```vue
<script setup lang="ts">

</script>

<template>
    <RouterView />
</template>

<style>
* {
    padding: 0;
    margin: 0;
}

html,
body #app {
    height: 100%;
    overflow: hidden;
}</style>

```

main.ts

```ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

const whileList = ['/']
router.beforeEach((to, from, next) => {
    if (whileList.includes(to.path) || localStorage.getItem('token')) {
        next()
    } else {
        next('/')
    }
})

app.mount('#app')

```



### 后置守卫

使用场景一般可以用来做loadingBar

也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身

```ts
router.afterEach((to,from)=>{
    Vnode.component?.exposed?.endLoading()
})
```



**src/components/loadingBar.vue**，loadingBar 组件

```vue
<script setup lang="ts">
import { ref } from 'vue'

let speed = ref<number>(1)
let bar = ref<HTMLElement>()
let timer = ref<number>(0)

const startLoading = () => {
    let dom = bar.value as HTMLElement
    speed.value = 1
    console.log(dom)
    timer.value = window.requestAnimationFrame(function fn() {
        if (speed.value < 90) {
            speed.value += 1
            dom.style.width = speed.value + '%'
            timer.value = window.requestAnimationFrame(fn)
        } else {
            speed.value = 1
            window.cancelAnimationFrame(timer.value)
        }
    })
}
const endLoading = () => {
    let dom = bar.value as HTMLElement
    setTimeout(() => {
        window.requestAnimationFrame(() => {
            speed.value = 100
            dom.style.width = speed.value + '%'
        })
    }, 1000)
}
// onMounted(() => {
//     startLoading()
//     endLoading()
// })

defineExpose({
    startLoading,
    endLoading
})
</script>

<template>
    <div>
        <div class="wraps">
            <div ref="bar" class="bar"></div>
        </div>
    </div>
</template>

<style scoped lang="less">
.wraps {
    position: fixed;
    top: 0;
    width: 100%;
    height: 2px;

    .bar {
        height: inherit;
        width: 0;
        background: blue;
    }
}
</style>

```

**src/main.ts**

```ts
import { createApp, createVNode, render } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import loadingBar from './components/loadingBar.vue'

// console.log(loadingBar)
const Vnode = createVNode(loadingBar)
render(Vnode, document.body)
console.log(Vnode)

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

const whileList = ['/']

// 前置守卫
router.beforeEach((to, from, next) => {
    Vnode.component?.exposed?.startLoading()
    if (whileList.includes(to.path) || localStorage.getItem('token')) {
        next()
    } else {
        next('/')
    }
})

// 后置守卫
router.afterEach((to, from) => {
    Vnode.component?.exposed?.endLoading()
})

app.mount('#app')

```



## 路由元信息

通过路由记录的 `meta` 属性可以定义路由的**元信息**。使用路由元信息可以在路由中附加自定义的数据，例如：

- 权限校验标识
- 路由组件的过渡名称
- 路由组件持久化缓存 (keep-alive) 的相关配置
- 标题名

可以在**导航守卫**或者是**路由对象**中访问路由的元信息数据

**src/main.ts**

```ts
// 前置守卫
router.beforeEach((to, from, next) => {
    if (whileList.includes(to.path) || localStorage.getItem('token')) {
        document.title = to.meta.title
        Vnode.component?.exposed?.startLoading()
        next()
    } else {
        next('/')
    }
})
```



**src/router/index.ts**

报错：不能将类型“unknown”分配给类型“string”

解决：

```ts
declare module 'vue-router' {
    interface RouteMeta {
        title: string
    }
}
```



```ts
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
```



## 路由过度动效

想要在你的路径组件上使用转场，并对导航进行动画处理，你需要使用 **v-slot API**

想让每个路由的组件有不同的过渡，可以将**元信息**和动态的 `name` 结合在一起，放在`<transition>` 上

**src/router/index.ts**

```ts
import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        title: string,
        transition: string
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), //历史模式
    routes: [
        {
            path: '/',
            component: () => import('../views/Login.vue'),
            meta: {
                title: "登录页面",
                transition:"animate__fadeInUp",
            }
        },
        {
            path: '/index',
            component: () => import('../views/Index.vue'),
            meta: {
                title: "首页",
                transition:"animate__bounceIn",
            }
        }
    ]
})

export default router //将路由缺省暴露出去，其他文件才可访问
```



App.vue

```vue
<script setup lang="ts">
import 'animate.css'
</script>

<template>
    <router-view #default="{ route, Component }">
        <transition :enter-active-class="`animate__animated ${route.meta.transition}`">
            <component :is="Component"></component>
        </transition>
    </router-view>
</template>
```



## 滚动行为

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。vue-router 可以自定义路由切换时页面如何滚动



当创建一个 Router 实例，可以提供一个 `scrollBehavior` 方法

scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

scrollBehavior 返回滚动位置的对象信息

**login.vue**

```vue
<template>
    <div style="width: 100%;height: 1000px;background: black;">
        <div style="color: aliceblue;font-size: 100px;">
            滚动行为
        </div>
    </div>
    <div class="login">
        ...
    </div>
</template>
```

**src/router/index.ts**

```ts
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), //历史模式
    scrollBehavior: (to, from, savePosition) => {
        console.log(to, '==============>', savePosition);
        return new Promise((r) => {
            setTimeout(() => {
                r({
                    top: 10000
                })
            }, 2000);
        })
    },
    routes: [
        ...
    ]
})
```



## 怎么实现路由懒加载？

- 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。利用路由懒加载我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样会更加高效，是一种优化手段。

- 一般来说，对所有的路由**都使用动态导入**是个好主意。

- 给`component`选项配置一个返回 Promise 组件的函数就可以定义懒加载路由。例如：

  `{ path: '/users/:id', component: () => import('./views/UserDetails') }`

- 结合注释`() => import(/* webpackChunkName: "group-user" */ './UserDetails.vue')`可以做webpack代码分块

  vite中结合[rollupOptions](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#使用-vite)定义分块

- 路由中不能使用异步组件



## router-link 和 router-view 的作用是什么？

* vue-router`中两个重要组件`router-link`和`router-view`，分别起到路由导航和组件内容渲染作用`
* `vue-router`会监听`popstate`事件，点击`router-link`之后页面不会刷新，而是拿出当前path去和routes中path匹配，获得匹配组件之后，^router-view`会将匹配组件渲染出来。`
* `router-link`默认会生成a标签，点击后取消默认跳转行为而是执行一个`navigate`方法，它会`pushState`以激活事件处理函数，重新匹配出一个路由`injectedRoute`;`router-view`的渲染函数依赖这个路由，它根据该路由获取要渲染的组件并重新渲染它。



## History 模式和 Hash 模式有何区别?

设置模式：

```ts
const router = createRouter({
    history: createWebHashHistory(), // Hash 模式
    history: createWebHistory(), // History 模式
    history: createMemoryHistory(), // Memory 模式
})
```

用起来一样

```vue
<router-link to="/about">Go To About</router-link>
```

区别（`url`形式）

```
hash: http://xx.com/#/about
history: http://xx.com/about
```



* `vue-router`有3个模式，其中`history`和`hash`更为常用。两者差别主要在显示形式和部署上。
* `hash`模式在地址栏显示的时候是已哈希的形式：`#/xxx`，这种方式使用和部署都比较简单；`history`模式`url`看起来更优雅美观，但是应用在部署时需要做特殊配置，web服务器需要做回退处理，否则会出现刷新页面404的问题。
* 在实现上不管哪种模式，最终都是通过监听`popstate`事件触发路由跳转处理，`url`显示不同只是显示效果上的差异。




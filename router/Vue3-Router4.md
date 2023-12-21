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




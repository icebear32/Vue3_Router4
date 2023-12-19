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


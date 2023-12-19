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
    <h1>hello world</h1>
    <div>
      <router-link to="/">Login</router-link>
      <router-link to="/reg" style="margin-left: 10px;">Reg</router-link>
    </div>
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

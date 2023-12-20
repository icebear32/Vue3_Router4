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

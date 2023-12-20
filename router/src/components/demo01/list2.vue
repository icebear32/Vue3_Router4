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

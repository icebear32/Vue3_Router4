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
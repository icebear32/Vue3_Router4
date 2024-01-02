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

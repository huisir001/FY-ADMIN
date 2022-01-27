<!--
 * @Description: 登录
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-07 14:52:06
 * @LastEditTime: 2022-01-27 09:56:05
-->
<template>
    <div class="login">
        <el-form ref="loginForm" :rules="loginFormRules" :model="loginFormData"
            class="login-form-box">
            <h3>{{ TITLE }}</h3>
            <h5>账号密码登录</h5>
            <el-form-item prop="username">
                <el-input v-model="loginFormData.username" clearable placeholder="账号"
                    @keyup.enter="onSubmit">
                    <template #prefix>
                        <fy-icon name="user" size="14" color="var(--el-text-color-placeholder)" />
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginFormData.password" clearable
                    placeholder="密码" @keyup.enter="onSubmit">
                    <template #prefix>
                        <fy-icon name="key" size="14" color="var(--el-text-color-placeholder)" />
                    </template>
                </el-input>
            </el-form-item>
            <el-button type="primary" round @click="onSubmit" class="btn-go">登录</el-button>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { TITLE } from 'settings'
import { reactive, ref, Ref } from 'vue'
import { useStore } from '@/store'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'

// store
const Store = useStore()

// ref
const loginForm: Ref = ref(null)

// 登录表单数据
const loginFormData: IUserInfo = reactive({
    username: '',
    password: '',
})

// 表单验证
const loginFormRules: FormRulesMap = reactive({
    username: {
        required: true,
        message: '请输入账号',
        trigger: 'blur',
    },
    password: {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
    },
})

// 提交
const onSubmit = () => {
    // 验证
    loginForm.value.validate(async (valid: boolean) => {
        if (valid) {
            // 登录
            await Store.dispatch('user/login', loginFormData)
            return true
        }
        return false
    })
}
</script>

<style scoped lang="scss">
.login {
    width: 100%;
    height: 100vh;
    background-image: url(../../assets/images/login_bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form-box {
        background: #fff;
        border-radius: 10px;
        text-align: center;
        padding: 30px 40px;
        transform: translateY(-6vh);
        h5 {
            margin-top: 5px;
            margin-bottom: 16px;
            font-weight: 400;
        }
        .btn-go {
            width: 100%;
        }
    }
}
</style>

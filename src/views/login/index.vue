<!--
 * @Description: 登录
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-07 14:52:06
 * @LastEditTime: 2021-09-07 19:09:51
-->
<template>
    <div class="login">
        <el-form ref="loginForm" :rules="loginFormRules" :model="loginFormData">
            <h2>{{title}}</h2>
            <h3>账号密码登录</h3>
            <el-form-item prop="username">
                <el-input v-model="loginFormData.username" clearable placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginFormData.password" clearable
                    placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item class="btn-go">
                <el-button type="primary" round @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
 
<script lang="ts">
const { title } = require('@/settings/system')
import { defineComponent, reactive, ref, Ref } from 'vue'
import { useStore } from 'vuex'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'

export default defineComponent({
    name: 'Login',
    setup() {
        // store
        const Store = useStore()

        // ref
        const loginForm: Ref = ref(null)

        // 登录表单数据
        const loginFormData: ISignupData = reactive({
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
                    await Store.dispatch('login', loginFormData)

                    return true
                }
                return false
            })
        }

        return {
            title,
            loginForm,
            loginFormData,
            loginFormRules,
            onSubmit,
        }
    },
})
</script>
 
<style scoped lang="scss">
</style>

<!--
 * @Description: 登录
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-07 14:52:06
 * @LastEditTime: 2021-09-14 15:27:42
-->
<template>
    <div class="login">
        <el-form ref="loginForm" :rules="loginFormRules" :model="loginFormData"
            class="login-form-box">
            <h3>{{Title}}</h3>
            <h5>账号密码登录</h5>
            <el-form-item prop="username">
                <el-input v-model="loginFormData.username" clearable placeholder="账号"
                    prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginFormData.password" clearable
                    placeholder="密码" prefix-icon="el-icon-key"></el-input>
            </el-form-item>
            <el-button type="primary" round @click="onSubmit" class="btn-go">登录</el-button>
        </el-form>
    </div>
</template>
 
<script lang="ts">
const { Title } = require('@/settings/system')
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
                    await Store.dispatch('user/login', loginFormData)

                    return true
                }
                return false
            })
        }

        return {
            Title,
            loginForm,
            loginFormData,
            loginFormRules,
            onSubmit,
        }
    },
})
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
            margin-bottom: 16px;
            font-weight: 400;
        }
        .btn-go {
            width: 100%;
        }
    }
}
</style>

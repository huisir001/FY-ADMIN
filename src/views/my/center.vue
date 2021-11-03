<!--
 * @Description: 个人中心
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-24 14:56:00
 * @LastEditTime: 2021-11-03 13:33:51
-->
<template>
    <el-tabs type="card" v-model="activeTabName" class="zui-my-tabs">
        <el-tab-pane label="基本信息" name="base">
            <el-form label-position="left" label-width="50px" :model="userInfoFormData">
                <el-form-item label="头像" style="height:64px;">
                    <z-file-library type="pic" @on-selected="avatarSelected">
                        <el-image class="avatar" :src="userInfoFormData.avatar||defaultAvatar" />
                    </z-file-library>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="userInfoFormData.username" placeholder="请输入账号，用于登录">
                    </el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="userInfoFormData.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="userInfoFormData.email"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="userInfoFormData.phone"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="userInfoFormData.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                        <el-radio :label="0">保密</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitBaseUserinfo">保存</el-button>
                    <el-button @click="resetBaseUserinfo">重置</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="其他资料" name="others">
            <el-form label-position="left" label-width="80px">
                <el-form-item label="所属部门">
                    保安部
                </el-form-item>
                <el-form-item label="所属角色">
                    管理员
                </el-form-item>
                <el-form-item label="岗位名称">
                    保安
                </el-form-item>
                <el-form-item label="拥有权限">
                    权限
                </el-form-item>
                <el-form-item label="创建时间">
                    2020-12-19
                </el-form-item>
                <el-form-item label="备注">
                    备注
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="pass">
            <el-form label-position="left" label-width="80px" :model="resetPassFormData">
                <el-form-item label="旧密码">
                    <el-input v-model="resetPassFormData.oldPass" placeholder="请输入旧密码">
                    </el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="resetPassFormData.newPass" placeholder="请输入新密码">
                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="resetPassFormData.surePass" placeholder="请再次输入新密码">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitPassword">保存</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>
 
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from '@/store'
// import { ElMessage } from 'element-plus'
import defaultAvatar from '@/assets/images/avatar.svg'
import ZFileLibrary from '@/components/FileLibrary/index.vue'

export default defineComponent({
    name: 'Center',
    components: { ZFileLibrary },
    setup() {
        const Store = useStore()
        const activeTabName = ref('base')
        // const userInfo = computed(() => Store.state.user.userInfo)

        // 用户信息copy
        let userInfoFormData = ref(Store.getters.copyUserInfo)

        // 图片选择
        const avatarSelected = (file: any) => {
            console.log(file)
            userInfoFormData.value.avatar = file.url
        }

        // 保存用户信息
        const onSubmitBaseUserinfo = () => {
            console.log(userInfoFormData)
        }

        // 重置为原值
        const resetBaseUserinfo = () => {
            userInfoFormData.value = Store.getters.copyUserInfo
            console.log(userInfoFormData)
        }

        // 修改密码form
        const resetPassFormData = reactive({
            oldPass: '',
            newPass: '',
            surePass: '',
        })

        // 修改密码
        const onSubmitPassword = () => {
            console.log(resetPassFormData)
        }

        return {
            activeTabName,
            userInfoFormData,
            onSubmitBaseUserinfo,
            resetBaseUserinfo,
            defaultAvatar,
            avatarSelected,
            resetPassFormData,
            onSubmitPassword,
        }
    },
})
</script>
 
<style scoped lang="scss">
.zui-my-tabs:deep(.el-tabs__content) {
    padding: 20px;
    background-color: var(--el-color-info-lighter);
    border-radius: var(--el-border-radius-small);
}
.avatar {
    width: 64px;
    height: 64px;
    display: block;
}
</style>
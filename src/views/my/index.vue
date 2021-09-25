<!--
 * @Description: 个人中心
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-24 14:56:00
 * @LastEditTime: 2021-09-25 15:52:18
-->
<template>
    <el-tabs type="card" v-model="activeTabName" @tab-click="tabChange" class="zui-my-tabs">
        <el-tab-pane label="基本信息" name="base">
            <el-form label-position="left" label-width="50px" :model="userInfoFormData">
                <el-form-item label="头像">
                    <!-- <el-upload class="avatar-uploader" action="/api/upload"
                        accept="image/png, image/jpeg" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="userInfoFormData.avatar" :src="userInfoFormData.avatar"
                            class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                    <el-image class="avatar" :src="userInfoFormData.avatar||defaultAvatar" />
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="userInfoFormData.username"></el-input>
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
        <el-tab-pane label="其他" name="othter">其他</el-tab-pane>
    </el-tabs>
</template>
 
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { ElMessage } from 'element-plus'
import defaultAvatar from '@/assets/images/avatar.svg'

export default defineComponent({
    name: 'My',
    setup() {
        const Store = useStore()
        const activeTabName = ref('base')
        const tabChange = (e: any) => {
            console.log(e)
        }
        // const userInfo = computed(() => Store.state.user.userInfo)

        // 用户信息copy
        let userInfoFormData = ref(Store.getters.copyUserInfo)

        // 图片选择
        const handleAvatarSuccess = (res: any, file: { raw: any }) => {
            console.log('11111111111111', res)
            //本地选择的缓存图片  URL.createObjectURL(file.raw)
            userInfoFormData.value.avatar = URL.createObjectURL(file.raw)
        }

        // 图片上传前钩子
        const beforeAvatarUpload = (file: { type: string; size: number }) => {
            const allowType = file.type === 'image/jpeg' || file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!allowType) {
                ElMessage.error('图片格式有误!')
                return false
            }
            if (!isLt2M) {
                ElMessage.error('上传图片不允许超过2MB!')
                return false
            }
            return true
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

        return {
            activeTabName,
            tabChange,
            userInfoFormData,
            handleAvatarSuccess,
            beforeAvatarUpload,
            onSubmitBaseUserinfo,
            resetBaseUserinfo,
            defaultAvatar,
        }
    },
})
</script>
 
<style scoped lang="scss">
.zui-my-tabs:deep(.el-tabs__content) {
    padding: 20px;
    background-color: #f4f5f7;
    border-radius: var(--el-border-radius-small);
}
.avatar-uploader {
    display: inline-flex;
    &:deep(.el-upload) {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
            border-color: #409eff;
        }
    }
    .avatar-uploader-icon {
        font-size: 25px;
        color: #8c939d;
        width: 64px;
        height: 64px;
        line-height: 64px;
        text-align: center;
    }
}
.avatar {
    width: 64px;
    height: 64px;
    display: block;
}
</style>
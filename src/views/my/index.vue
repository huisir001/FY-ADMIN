<!--
 * @Description: 个人中心
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-24 14:56:00
 * @LastEditTime: 2021-09-24 18:22:50
-->
<template>
    <el-tabs type="card" v-model="activeTabName" @tab-click="tabChange" class="zui-my-tabs">
        <el-tab-pane label="基本信息" name="base">
            <el-form label-position="left" label-width="50px" :model="userInfo">
                <el-form-item label="头像">
                    <el-upload class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="userInfo.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="userInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="userInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="userInfo.sex"></el-input>
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
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
    name: 'My',
    setup() {
        const Store = useStore()
        const activeTabName = ref('base')
        const tabChange = (e: any) => {
            console.log(e)
        }
        // 用户信息
        const userInfo = computed(() => Store.state.user.userInfo)

        const handleAvatarSuccess = (res, file) => {
            userInfo.avatar = URL.createObjectURL(file.raw)
        }

        const beforeAvatarUpload = (file) => {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('Avatar picture must be JPG format!')
            }
            if (!isLt2M) {
                this.$message.error('Avatar picture size can not exceed 2MB!')
            }
            return isJPG && isLt2M
        }

        return {
            activeTabName,
            tabChange,
            userInfo,
            handleAvatarSuccess,
            beforeAvatarUpload,
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
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
    }
}
</style>
<!--
 * @Description: 个人中心
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-24 14:56:00
 * @LastEditTime: 2021-09-28 15:22:08
-->
<template>
    <el-tabs type="card" v-model="activeTabName" @tab-click="tabChange" class="zui-my-tabs">
        <el-tab-pane label="基本信息" name="base">
            <el-form label-position="left" label-width="50px" :model="userInfoFormData">
                <el-form-item label="头像" style="height:64px;">
                    <FileLibrary type="pic" @on-selected="avatarSelected">
                        <el-image class="avatar" :src="userInfoFormData.avatar||defaultAvatar" />
                    </FileLibrary>
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
// import { ElMessage } from 'element-plus'
import defaultAvatar from '@/assets/images/avatar.svg'
import FileLibrary from '@/components/FileLibrary/index.vue'

export default defineComponent({
    name: 'My',
    components: { FileLibrary },
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

        return {
            activeTabName,
            tabChange,
            userInfoFormData,
            onSubmitBaseUserinfo,
            resetBaseUserinfo,
            defaultAvatar,
            avatarSelected,
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
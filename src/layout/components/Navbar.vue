<!--
 * @Description: 导航栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:29:15
 * @LastEditTime: 2021-09-22 18:53:24
-->
<template>
    <div class="navbar">
        <div class="zui-nav-left">
            <div class="sidebar-collapse-btn" :class="{reverse:sidebarCollapse}"
                @click="sidebarCollapseChenge">
                <el-icon :size="22" color="var(--el-text-color-regular)">
                    <Fold />
                </el-icon>
            </div>
            <div class="breadCrumbs">
                <div v-for="(item,index) in breadCrumbs" :key="item.title">
                    {{index>1 ? ' / ':''}}{{item.title}}</div>
            </div>
        </div>
        <div class="zui-nav-right">
            <el-dropdown size="medium" trigger="click" @command="userNavChange">
                <div class="user-nav el-dropdown-link">
                    <div class="name">{{userInfo.username}}</div>
                    <img class="avatar" :src="userInfo.avatar">
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="0">个人中心</el-dropdown-item>
                        <el-dropdown-item command="1">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
 
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { Fold } from '@element-plus/icons'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import defaultAvatar from '@/assets/images/avatar.svg'

export default defineComponent({
    name: 'Navbar',
    components: {
        Fold,
    },
    setup() {
        const Store = useStore()
        const Route = useRoute()

        // 面包屑
        const breadCrumbs = computed(() =>
            Route.matched.map((item) => ({
                title: item.meta.title || item.name,
                path: item.path,
            }))
        )

        // 侧边栏状态
        const sidebarCollapse = computed(() => Store.state.temp.sidebarCollapse)

        // 侧边栏展开收缩
        const sidebarCollapseChenge = () => {
            Store.commit('temp/changeSidebarCollapse')
        }

        // 用户信息
        const userInfo = computed(() => ({
            username: (Store.state.user.userInfo || {}).username,
            avatar: (Store.state.user.userInfo || {}).avatar || defaultAvatar,
        }))

        // 用户下拉菜单事件
        const userNavChange = (e: any) => {
            switch (e) {
                case '0':
                    useRouter().push({ name: 'UserCenter' })
                    break
                case '1':
                    ElMessageBox.confirm('您即将要登出，是否继续 ?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            Store.dispatch('user/logout')
                        })
                        .catch(() => {})
                    break
            }
        }

        return {
            breadCrumbs,
            userInfo,
            sidebarCollapse,
            sidebarCollapseChenge,
            userNavChange,
        }
    },
})
</script>
 
<style scoped lang="scss">
.navbar {
    width: 100%;
    height: 50px;
    background: var(--color-navbar-bg);
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    .zui-nav-left,
    .zui-nav-right {
        height: 100%;
        display: flex;
        align-items: center;
    }
    .zui-nav-right {
        .user-nav {
            display: flex !important;
            align-items: center;
            margin-right: 10px;
            cursor: pointer;
            .name {
                margin-right: 15px;
            }
            img.avatar {
                height: 32px;
                width: 32px;
                border-radius: var(--el-border-radius-circle);
            }
        }
    }
    .sidebar-collapse-btn {
        padding: 9px;
        height: 40px;
        width: 40px;
        cursor: pointer;
        &.reverse {
            transform: rotate(180deg);
        }
    }
}
</style>
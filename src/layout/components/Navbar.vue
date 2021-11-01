<!--
 * @Description: 导航栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:29:15
 * @LastEditTime: 2021-11-01 20:55:28
-->
<template>
    <div class="navbar">
        <div class="zui-nav-left">
            <div class="sidebar-collapse-btn nav-item" :class="{reverse:sidebarCollapse}"
                @click="sidebarCollapseChenge">
                <icon name="fold" :size="22" color="var(--el-text-color-regular)" />
            </div>
            <div v-if="$store.state.theme.showBreadcrumb" class="breadCrumbs nav-item">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="item in breadCrumbs" :key="item.title"
                        :to="{ path: item.path }" :class="{redirect:item.redirect}">{{item.title}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="zui-nav-right">
            <div class="theme-nav nav-item" @click="showThemeDrawer = true">
                <icon name="theme" :size="20" color="var(--el-text-color-regular)" />
            </div>
            <el-dropdown size="medium" trigger="click" @command="userNavChange">
                <div class="user-nav el-dropdown-link nav-item">
                    <div class="name">{{userInfo.nickname || userInfo.username}}</div>
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
    <ThemeSetDrawer v-model="showThemeDrawer" />
</template>
 
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import defaultAvatar from '@/assets/images/avatar.svg'
import ThemeSetDrawer from '@/components/ThemeSetDrawer/index.vue'

export default defineComponent({
    name: 'Navbar',
    components: {
        ThemeSetDrawer,
    },
    setup() {
        const Store = useStore()
        const Route = useRoute()
        const Router = useRouter()

        // 面包屑
        const breadCrumbs = computed(() => {
            let crumbs = Route.matched
                .filter((item) => item.name !== 'Home')
                .map((item) => ({
                    title: item.meta.title || item.name,
                    path: item.path,
                    redirect: item.redirect,
                }))

            // 面包屑中添加首页
            if (!crumbs.find((item) => item.path === '/')) {
                crumbs.unshift({
                    title: '首页',
                    path: '/',
                    redirect: undefined,
                })
            }
            return crumbs
        })

        // 侧边栏状态
        const sidebarCollapse = computed(() => Store.state.sys.sidebarCollapse)

        // 侧边栏展开收缩
        const sidebarCollapseChenge = () => {
            Store.commit('sys/changeSidebarCollapse')
        }

        // 用户信息
        const userInfo = computed(() => ({
            nickname: (Store.state.user.userInfo || {}).nickname,
            username: (Store.state.user.userInfo || {}).username,
            avatar: (Store.state.user.userInfo || {}).avatar || defaultAvatar,
        }))

        // 用户下拉菜单事件
        const userNavChange = (e: any) => {
            switch (e) {
                case '0':
                    Router.push({ name: 'Center' })
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
            showThemeDrawer: ref(false),
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
        .nav-item {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 0 10px;
            height: 32px;
            color: var(--el-text-color-regular);
        }
    }
    .zui-nav-right {
        .user-nav {
            .name {
                margin-right: 10px;
            }
            img.avatar {
                height: 32px;
                width: 32px;
                border-radius: var(--el-border-radius-circle);
            }
        }
    }
    .sidebar-collapse-btn {
        &.reverse {
            transform: rotate(180deg);
        }
    }
    .breadCrumbs {
        cursor: unset !important;
        &:deep(.el-breadcrumb) {
            height: 14px;
            overflow: hidden;
            .redirect .is-link {
                font-weight: normal;
                color: var(--el-text-color-regular);
                cursor: unset;
                &:hover {
                    color: var(--el-text-color-regular);
                }
            }
        }
    }
}
@media screen and (max-width: 400px) {
    .breadCrumbs {
        display: none !important;
    }
}
</style>
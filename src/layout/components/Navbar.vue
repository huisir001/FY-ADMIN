<!--
 * @Description: 导航栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:29:15
 * @LastEditTime: 2022-01-14 14:46:01
-->
<template>
    <div class="navbar">
        <div class="fy-nav-left">
            <div class="sidebar-collapse-btn nav-item" :class="{reverse:sidebarCollapse}"
                @click="sidebarCollapseChenge">
                <fy-icon name="fold" :size="22" color="var(--color-navbar-text)" />
            </div>
            <div v-if="$store.state.theme.showBreadcrumb" class="breadCrumbs nav-item">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="item in breadCrumbs" :key="item.title"
                        :to="{ path: item.path }" :class="{redirect:item.redirect}">{{item.title}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="fy-nav-right">
            <div class="theme-nav nav-item" @click="showThemeDrawer = true">
                <fy-icon name="theme" :size="20" color="var(--color-navbar-text)" />
            </div>
            <el-dropdown size="medium" trigger="click" @command="userNavChange">
                <div class="user-nav el-dropdown-link nav-item">
                    <div class="name">{{userInfo.nickname || userInfo.username}}</div>
                    <img class="avatar" :src="userInfo.avatar">
                </div>
                <template #dropdown>
                    <el-dropdown-menu style="width:90px">
                        <el-dropdown-item command="0">个人中心</el-dropdown-item>
                        <el-dropdown-item command="1">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <ThemeSetDrawer v-model="showThemeDrawer" />
</template>
 
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import defaultAvatar from '@/assets/images/avatar.svg'
import ThemeSetDrawer from './ThemeSet.vue'

const Store = useStore()
const Route = useRoute()
const Router = useRouter()

// 主题配置抽屉
const showThemeDrawer = ref(false)

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
</script>
 
<style scoped lang="scss">
.navbar {
    width: 100%;
    height: 50px;
    background: var(--color-navbar-bg);
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    .fy-nav-left,
    .fy-nav-right {
        height: 100%;
        display: flex;
        align-items: center;
        .nav-item {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 0 10px;
            height: 32px;
            color: var(--color-navbar-text);
        }
    }
    .fy-nav-right {
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
            .el-breadcrumb__inner.is-link {
                font-weight: normal;
                color: var(--color-navbar-text);
                &:hover {
                    color: var(--color-navbar-text-hov);
                }
            }
            .el-breadcrumb__item:last-child .el-breadcrumb__inner {
                &:hover {
                    color: var(--color-navbar-text);
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
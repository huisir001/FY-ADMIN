<!--
 * @Description: 导航栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:29:15
 * @LastEditTime: 2022-08-09 18:05:31
-->
<template>
    <div class="navbar">
        <div class="fy-nav-left">
            <div class="sidebar-collapse-btn nav-item" :class="{reverse:sidebarCollapse}"
                @click="sidebarCollapseChenge">
                <fy-icon name="fold" :size="22" color="var(--color-navbar-text)" />
            </div>
            <div v-if="themeStore.showBreadcrumb" class="breadCrumbs nav-item">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="item in breadCrumbs" :key="item.title"
                        @click="bindMenuClick(item)" :class="{isLink:item.type!==MenuType.cat}">
                        {{item.title}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="fy-nav-right">
            <div class="nav-item" @click="fullScreen">
                <fy-icon :name="fullScreenIcon" :size="20" color="var(--color-navbar-text)" />
            </div>
            <div class="nav-item" @click="$router.push({name:'Message'})">
                <fy-icon name="Bell" :size="20" color="var(--color-navbar-text)" />
            </div>
            <el-dropdown size="medium">
                <div class="nav-item">
                    <fy-icon name="Lang" :size="20" color="var(--color-navbar-text)" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-if="$getLocale()=='en'" @click="$setLocale('zh')">简体中文
                        </el-dropdown-item>
                        <el-dropdown-item v-else @click="$setLocale('en')">English
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div class="theme-nav nav-item" @click="showThemeDrawer = true">
                <fy-icon name="theme" :size="20" color="var(--color-navbar-text)" />
            </div>
            <el-dropdown size="medium" trigger="click" @command="userNavChange">
                <div class="user-nav el-dropdown-link nav-item">
                    <div class="name">{{userInfo.nickname || userInfo.username}}</div>
                    <img class="avatar" :src="userInfo.avatar">
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="0">{{$t('components.Navbar.5hcu1c307r00')}}
                        </el-dropdown-item>
                        <el-dropdown-item command="1">{{$t('components.Navbar.5hcu1c30f6g0')}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <ThemeSetDrawer v-model="showThemeDrawer" />
</template>

<script lang="ts">
export default {
    name: 'Navbar',
}
</script>
 
<script lang="ts" setup>
import { computed, ref, watch, getCurrentInstance } from 'vue'
import { useUserStore,useSysStore,useThemeStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import defaultAvatar from '@/assets/images/avatar.svg'
import ThemeSetDrawer from './ThemeSet.vue'
import { MenuType, launchFullScreen, exitFullscreen, isFullScreen } from '@/ui/helpers'
import menuJump from './menuJump'

const t = getCurrentInstance()!.appContext.config.globalProperties.$t
const userStore = useUserStore()
const sysStore = useSysStore()
const themeStore = useThemeStore()
const Route = useRoute()
const Router = useRouter()

// 主题配置抽屉
const showThemeDrawer = ref(false)

// 面包屑
const breadCrumbs = computed(() => {
    let crumbs: any[] = []
    if (Route.name !== 'Home' && Route.name !== 'Dashboard' && Route.path !== '/') {
        const Menus = userStore.menus
        const currMenu = Menus.find((item) => {
            if (Route.name === 'Frame') {
                return item.id === Route.params.id
            } else {
                return item.id === Route.name
            }
        })

        if (currMenu) {
            crumbs.unshift(currMenu)
            ;(function getParentMenu(menu?: IMenu) {
                if (menu && menu.parentId) {
                    let parentMenu = Menus.find((item) => item.id === menu.parentId)
                    crumbs.unshift(parentMenu)
                    getParentMenu(parentMenu)
                }
            })(currMenu)
        } else {
            crumbs = Route.matched.map((item) => ({
                title: item.meta.title,
                id: item.name,
                type: MenuType.route,
            }))
        }
    }

    // 面包屑中添加预定义的路由
    crumbs.unshift({
        title: t('components.Navbar.5hcu1c30hq00'),
        id: 'Home',
        type: MenuType.route,
    })

    return crumbs
})

// 面包屑菜单点击
const bindMenuClick = (menu: IMenu) => {
    if (menu.id !== Route.name) {
        menuJump(menu, Router)
    }
}

// 侧边栏状态
const sidebarCollapse = computed(() => sysStore.sidebarCollapse)

// 侧边栏展开收缩
const sidebarCollapseChenge = () => {
    sysStore.changeSidebarCollapse()
}

// 用户信息
const userInfo = computed(() => ({
    nickname: (userStore.userInfo || {}).nickname,
    username: (userStore.userInfo || {}).username,
    avatar: (userStore.userInfo || {}).avatar || defaultAvatar,
}))

// 全屏按钮icon
const fullScreenIcon = ref('FullScreen')

// 窗口高度
const visibleAreaHeight = computed(() => sysStore.visibleAreaHeight)

// 监听窗口高度变化判断是否全屏来切换全屏ICON
watch(
    visibleAreaHeight,
    () => {
        fullScreenIcon.value = isFullScreen() ? 'ExitFullScreen' : 'FullScreen'
    },
    { immediate: true }
)

// 全屏
const fullScreen = () => {
    if (!isFullScreen()) {
        launchFullScreen(document.documentElement)
    } else {
        exitFullscreen()
    }
}

// 捕获F11全屏
window.addEventListener('keydown', (e) => {
    if (e.keyCode === 122 || e.key === 'F11') {
        fullScreen()
        e.preventDefault()
        return false
    }
})

// 用户下拉菜单事件
const userNavChange = (e: any) => {
    switch (e) {
        case '0':
            Router.push({ name: 'Center' })
            break
        case '1':
            ElMessageBox.confirm(
                t('components.Navbar.5hcu1c30erw0'),
                t('components.Navbar.5hcu1c30jkc0'),
                {
                    confirmButtonText: t('components.Navbar.5hcu1c30kog0'),
                    cancelButtonText: t('components.Navbar.5hcu1c30mww0'),
                    type: 'warning',
                }
            )
                .then(() => {
                    userStore.logout()
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
            &:hover {
                color: var(--el-color-primary);
                i {
                    --color: var(--el-color-primary) !important;
                }
            }
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
            .el-breadcrumb__item {
                .el-breadcrumb__inner {
                    color: var(--color-navbar-text);
                }
                &.isLink .el-breadcrumb__inner {
                    cursor: pointer;
                    &:hover {
                        color: var(--color-navbar-text-hov);
                    }
                }
                &:last-child .el-breadcrumb__inner {
                    cursor: text;
                    &:hover {
                        color: var(--color-navbar-text);
                    }
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
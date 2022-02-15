<!--
 * @Description: 侧边栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:28:59
 * @LastEditTime: 2022-02-15 14:02:30
-->
<template>
    <div class="sidebar">
        <div class="logo-box">
            <img v-show="sidebarCollapse" src="../../assets/images/logo_icon_w.svg">
            <img v-show="!sidebarCollapse" src="../../assets/images/logo.svg">
        </div>
        <div class="menu-box">
            <el-menu class="fy-sidebar-menu" :collapse-transition="false"
                background-color="transparent" text-color="var(--color-sidebar-font)"
                active-text-color="var(--color-sidebar-font)" :collapse="sidebarCollapse">
                <template v-for="menu in Menus" :key="menu.id">
                    <el-menu-item v-if="!menu.children || !menu.children.length" :index="menu.id"
                        @click="bindMenuClick(menu)">
                        <fy-icon v-if="menu.icon" :name="menu.icon"
                            color="var(--color-sidebar-font)" />
                        <template #title>
                            {{menu.title}}
                        </template>
                    </el-menu-item>
                    <el-sub-menu v-else :index="menu.id">
                        <template #title>
                            <fy-icon v-if="menu.icon" :name="menu.icon"
                                color="var(--color-sidebar-font)" @click="bindMenuClick(menu)" />
                            <span @click="bindMenuClick(menu)">{{menu.title}}</span>
                        </template>
                        <template v-for="sub1 in menu.children" :key="sub1.id">
                            <el-menu-item v-if="!sub1.children || !sub1.children.length"
                                :index="sub1.id" :class="{act:$route.name==sub1.id}"
                                @click="bindMenuClick(sub1)">
                                <fy-icon v-if="sub1.icon" :name="sub1.icon"
                                    color="var(--color-sidebar-font)" />
                                {{sub1.title}}
                            </el-menu-item>
                            <el-sub-menu v-else :index="sub1.id">
                                <template #title>
                                    <fy-icon v-if="sub1.icon" :name="sub1.icon"
                                        color="var(--color-sidebar-font)"
                                        @click="bindMenuClick(sub1)" />
                                    <span @click="bindMenuClick(sub1)">{{sub1.title}}</span>
                                </template>
                                <el-menu-item v-for="sub2 in sub1.children" :key="sub2.id"
                                    :index="sub2.id" :class="{act:$route.name==sub2.id}"
                                    @click="bindMenuClick(sub2)">
                                    <fy-icon v-if="sub2.icon" :name="sub2.icon"
                                        color="var(--color-sidebar-font)" />
                                    <span>{{sub2.title}}</span>
                                </el-menu-item>
                            </el-sub-menu>
                        </template>
                    </el-sub-menu>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Sidebar',
}
</script>
 
<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { rawList2Tree } from '@/utils/common'
import bindMenuJump from './bindMenuJump'

const Store = useStore()
const Router = useRouter()

// 菜单
const Menus = computed(() => rawList2Tree(Store.getters.copyUserMenu))

// 侧边栏收放
const sidebarCollapse = computed(() => Store.state.sys.sidebarCollapse)

// 菜单点击
const bindMenuClick = (menu:IMenu)=> bindMenuJump(menu,Router,Store)
</script>
 
<style scoped lang="scss">
@import '@/assets/styles/mixin.scss';
.sidebar {
    background: var(--color-sidebar-bg);
    .logo-box {
        height: 80px;
        line-height: 80px;
        text-align: center;
        img {
            width: auto;
            height: auto;
            max-width: 210px;
            max-height: 40px;
        }
    }
    .menu-box {
        @include hideScrollBar;
        height: calc(100% - 80px);
        overflow-y: auto;
        .fy-sidebar-menu {
            border: 0;
        }
    }
    .fy-sidebar-menu {
        &:deep(.el-menu-item),
        &:deep(.el-sub-menu__title),
        &:deep(.el-menu__title) {
            font-size: 12px;
            letter-spacing: 1px;
            height: 50px;
            line-height: 50px;
            &.act {
                color: var(--color-sidebar-menu-font-active) !important;
                font-weight: 700;
                i {
                    color: var(--color-sidebar-menu-font-active) !important;
                }
            }
            &:hover {
                background-color: var(--color-sidebar-menu-bg-hover) !important;
                color: var(--color-sidebar-menu-font-hover) !important;
                i {
                    color: var(--color-sidebar-menu-font-hover) !important;
                }
            }
        }
    }
}
</style>
<style lang="scss">
.el-menu--popup {
    .el-menu-item,
    .el-sub-menu__title {
        i {
            color: var(--el-text-color-regular) !important;
        }
        color: var(--el-text-color-regular) !important;
        height: 50px;
        line-height: 50px;
        font-size: 12px;
        letter-spacing: 1px;
        &.act {
            color: var(--color-sidebar-menu-font-active) !important;
            font-weight: 700;
            i {
                color: var(--color-sidebar-menu-font-active) !important;
            }
        }
        &:hover {
            background-color: var(--color-sidebar-menu-bg-hover) !important;
            color: var(--color-sidebar-menu-font-hover) !important;
            i {
                color: var(--color-sidebar-menu-font-hover) !important;
            }
        }
    }
}
</style>

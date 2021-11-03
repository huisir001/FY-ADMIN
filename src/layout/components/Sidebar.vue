<!--
 * @Description: 侧边栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:28:59
 * @LastEditTime: 2021-11-02 00:20:04
-->
<template>
    <div class="sidebar">
        <div class="logo-box">
            <img v-show="sidebarCollapse" src="../../assets/images/logo_icon_w.svg">
            <img v-show="!sidebarCollapse" src="../../assets/images/logo.svg">
        </div>
        <div class="menu-box">
            <el-menu class="zui-sidebar-menu" :collapse-transition="false"
                background-color="transparent" text-color="var(--color-sidebar-font)"
                active-text-color="var(--color-sidebar-font)" :collapse="sidebarCollapse">
                <template v-for="menu in Menus" :key="menu.id">
                    <el-menu-item v-if="!menu.children || !menu.children.length" :index="menu.id"
                        @click="$router.push({name:menu.id})">
                        <z-icon v-if="menu.icon" :name="menu.icon"
                            color="var(--color-sidebar-font)" />
                        <template #title>
                            {{menu.title}}
                        </template>
                    </el-menu-item>
                    <el-sub-menu v-else :index="menu.id">
                        <template #title>
                            <z-icon v-if="menu.icon" :name="menu.icon"
                                color="var(--color-sidebar-font)" />
                            <span>{{menu.title}}</span>
                        </template>
                        <template v-for="sub1 in menu.children" :key="sub1.id">
                            <el-menu-item v-if="!sub1.children || !sub1.children.length"
                                :index="sub1.id" :class="{act:$route.name==sub1.id}"
                                @click="$router.push({name:sub1.id})">
                                <z-icon v-if="sub1.icon" :name="sub1.icon"
                                    color="var(--color-sidebar-font)" />
                                {{sub1.title}}
                            </el-menu-item>
                            <el-sub-menu v-else :index="sub1.id">
                                <template #title>
                                    <z-icon v-if="sub1.icon" :name="sub1.icon"
                                        color="var(--color-sidebar-font)" />
                                    <span>{{sub1.title}}</span>
                                </template>
                                <el-menu-item v-for="sub2 in sub1.children" :key="sub2.id"
                                    :index="sub2.id" :class="{act:$route.name==sub2.id}"
                                    @click="$router.push({name:sub2.id})">
                                    <z-icon v-if="sub2.icon" :name="sub2.icon"
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
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
    name: 'Sidebar',
    setup() {
        const Store = useStore()

        // 菜单
        const Menus = computed(() => Store.state.user.menuTree)

        // 折叠
        const sidebarCollapse = computed(() => Store.state.sys.sidebarCollapse)

        return {
            sidebarCollapse,
            Menus,
        }
    },
})
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
        .zui-sidebar-menu {
            border: 0;
        }
    }
    .zui-sidebar-menu {
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

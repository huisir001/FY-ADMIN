<!--
 * @Description: 侧边栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:28:59
 * @LastEditTime: 2021-10-20 19:56:46
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
                :collapse="sidebarCollapse">
                <template v-for="menu in Menus" :key="menu.name">
                    <el-menu-item v-if="!menu.children || !menu.children.length" :index="menu.name"
                        @click="$router.push({name:menu.name})">
                        <i v-if="menu.meta.icon" :class="menu.meta.icon"></i>
                        <template #title>
                            {{menu.meta.title}}
                        </template>
                    </el-menu-item>
                    <el-sub-menu v-else :index="menu.name">
                        <template #title>
                            <i v-if="menu.meta.icon" :class="menu.meta.icon"></i>
                            <span>{{menu.meta.title}}</span>
                        </template>
                        <template v-for="sub1 in menu.children" :key="sub1.name">
                            <el-menu-item v-if="!sub1.children || !sub1.children.length"
                                :index="sub1.name" @click="$router.push({name:sub1.name})">
                                <i v-if="sub1.meta.icon" :class="sub1.meta.icon"></i>
                                {{sub1.meta.title}}
                            </el-menu-item>
                            <el-sub-menu v-else :index="sub1.name">
                                <template #title>
                                    <i v-if="sub1.meta.icon" :class="sub1.meta.icon"></i>
                                    <span>{{sub1.meta.title}}</span>
                                </template>
                                <el-menu-item v-for="sub2 in sub1.children" :key="sub2.name"
                                    :index="sub2.name" @click="$router.push({name:sub2.name})">
                                    <i v-if="sub2.meta.icon" :class="sub2.meta.icon"></i>
                                    <span>{{sub2.meta.title}}</span>
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
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'Sidebar',
    setup() {
        const Store = useStore()
        const Router = useRouter()
        const Menus = computed(() =>
            Router.getRoutes().filter((item) => item.meta.top && !item.meta.hidden)
        )

        console.log(Router.getRoutes())

        // 折叠
        const sidebarCollapse = computed(() => Store.state.temp.sidebarCollapse)

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
            i {
                color: var(--color-sidebar-font) !important;
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

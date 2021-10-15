<!--
 * @Description: 侧边栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:28:59
 * @LastEditTime: 2021-10-15 14:51:28
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
                <el-sub-menu index="1">
                    <template #title>
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-sub-menu index="1-3">
                        <template #title>
                            <i class="el-icon-location"></i>
                            <span>导航66</span>
                        </template>
                        <el-menu-item index="1-3-1">选项1</el-menu-item>
                        <el-menu-item index="1-3-2">选项2</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <template #title>导航二</template>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <template #title>导航三</template>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <template #title>导航四</template>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
 
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
// import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'Sidebar',
    setup() {
        const Store = useStore()
        // const Route = useRoute()

        // console.log(Route)

        // 折叠
        const sidebarCollapse = computed(() => Store.state.temp.sidebarCollapse)

        return {
            sidebarCollapse,
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

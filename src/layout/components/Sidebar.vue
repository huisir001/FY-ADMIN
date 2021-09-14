<!--
 * @Description: 侧边栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:28:59
 * @LastEditTime: 2021-09-14 16:58:03
-->
<template>
    <div class="sidebar">
        <div class="logo-box">
            <img src="../../assets/images/logo_43.png">
        </div>
        <div class="menu-box">
            <el-menu default-active="1-4-1" class="zui-sidebar-menu" background-color="transparent"
                text-color="var(--color-sidebar-font)" @open="handleOpen" @close="handleClose"
                :collapse="isCollapse">
                <el-sub-menu index="1">
                    <template #title>
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    <el-sub-menu index="1-4">
                        <template #title>选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
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
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Sidebar',
    setup() {},
})
</script>
 
<style scoped lang="scss">
.sidebar {
    width: 100%;
    height: 100%;
    background: var(--color-sidebar-bg);
    .logo-box {
        height: 80px;
        line-height: 80px;
        text-align: center;
        img {
            width: 210px;
            height: auto;
        }
    }
    .menu-box {
        height: calc(100% - 80px);
        overflow-y: auto;
        .zui-sidebar-menu {
            border: 0;
        }
    }
}
</style>

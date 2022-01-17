<!--
 * @Description: 首页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2022-01-17 16:28:29
-->
<template>
    <el-row :gutter="10">
        <el-col :span="6">
            <div class="grid-content"></div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content"></div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content"></div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content"></div>
        </el-col>
    </el-row>
</template>
 
<script lang="ts" setup>
</script>
 
<style scoped lang="scss">
.grid-content {
    background: #fff;
    border-radius: 4px;
    min-height: 200px;
}
</style>
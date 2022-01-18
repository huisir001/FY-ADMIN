<!--
 * @Description: 首页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2022-01-18 10:58:35
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
    <el-row>
        <el-col :span="24">
            <div class="grid-content">
                <fy-card :type="1" :data="list" />
            </div>
        </el-col>
    </el-row>
</template>
 
<script lang="ts" setup>
const list = [
    {
        title: '10 个任务',
        desc: '进行中的任务',
    },
    {
        title: '3 个任务',
        desc: '剩余任务',
    },
    {
        title: '122 个任务',
        desc: '任务总耗时',
    },
]
</script>
 
<style scoped lang="scss">
.grid-content {
    background: #fff;
    border-radius: 4px;
    height: 200px;
}
.el-row {
    margin-bottom: 10px;
}
</style>
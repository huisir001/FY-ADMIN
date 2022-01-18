<!--
 * @Description: 卡片组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-17 17:01:24
 * @LastEditTime: 2022-01-18 10:06:39
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

<script lang="ts">
export default {
    name: 'card',
}
</script>

<style scoped lang="scss">
.grid-content {
    background: #fff;
    border-radius: 4px;
    min-height: 200px;
}
</style>
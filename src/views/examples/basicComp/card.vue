<!--
 * @Description: 卡片组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-17 17:01:24
 * @LastEditTime: 2022-01-18 18:06:33
-->
<template>
    <el-row>
        <el-col :span="24">
            <div class="grid-content">
                <fy-card :type="1" :data="list" />
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="12">
            <fy-card :type="2" title="這是標題">
                <template #headerRight>
                    <el-button type="text">右側</el-button>
                </template>
                <p>对比的基本思想是，要避免页面上的元素太过相似。</p>
                <p>如果元素（字体、颜色、大小、线宽、形状、空间等）不相同，那就干脆让它们截然不同。</p>
                <p>要让页面引人注意，对比通常是最重要的一个因素...</p>
            </fy-card>
        </el-col>
        <el-col :span="12">
            <fy-card :type="2" title="這是標題">
                <template #headerRight>
                    <el-button type="text">右側</el-button>
                </template>
                <p>对比的基本思想是，要避免页面上的元素太过相似。</p>
                <p>如果元素（字体、颜色、大小、线宽、形状、空间等）不相同，那就干脆让它们截然不同。</p>
                <p>要让页面引人注意，对比通常是最重要的一个因素...</p>
            </fy-card>
        </el-col>
    </el-row>
</template>

<script lang="ts">
export default {
    name: 'card',
}
</script>

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
<!--
 * @Description: 首页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2022-04-18 15:51:31
-->
<template>
    <el-row :gutter="10">
        <el-col :span="6">
            <div class="grid-content">
                <fy-chart :option="pieChartOptions" />
            </div>
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
import { ref } from 'vue'
const pieChartOptions = ref({
    title: {
        text: 'Traffic Sources',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
    },
    series: [
        {
            name: 'Traffic Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 335, name: 'Direct' },
                { value: 310, name: 'Email' },
                { value: 234, name: 'Ad Networks' },
                { value: 135, name: 'Video Ads' },
                { value: 1548, name: 'Search Engines' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
})
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
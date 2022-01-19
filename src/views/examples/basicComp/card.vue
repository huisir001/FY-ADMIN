<!--
 * @Description: 卡片组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-17 17:01:24
 * @LastEditTime: 2022-01-19 11:28:03
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
                <p>对比的基本思想是，要避免页面上的元素太过相似。</p>
                <p>如果元素（字体、颜色、大小、线宽、形状、空间等）不相同，那就干脆让它们截然不同。</p>
                <p>要让页面引人注意，对比通常是最重要的一个因素...</p>
            </fy-card>
        </el-col>
    </el-row>
    <el-row :gutter="10" class="card-row">
        <el-col :md="6" :sm="12">
            <fy-card :type="2" title="销售额">
                <template #headerRight>
                    <el-tag>月</el-tag>
                </template>
                <h2 style="font-size:30px;line-height:2">￥12,000</h2>
                <el-progress :text-inside="true" :stroke-width="15" :percentage="53"
                    status="success" />
                <el-divider style="margin:20px 0 10px 0"></el-divider>
                <div class="flex-between">
                    <span>总销售额</span>
                    <span>68万</span>
                </div>
            </fy-card>
        </el-col>
        <el-col :md="6" :sm="12">
            <fy-card :type="2" title="销售额">
                <template #headerRight>
                    <el-tag>月</el-tag>
                </template>
                <h2 style="font-size:30px;line-height:2">￥12,000</h2>
                <el-progress :text-inside="true" :stroke-width="15" :percentage="53"
                    status="success" />
                <el-divider style="margin:20px 0 10px 0"></el-divider>
                <div class="flex-between">
                    <span>总销售额</span>
                    <span>68万</span>
                </div>
            </fy-card>
        </el-col>
        <el-col :md="6" :sm="12">
            <fy-card :type="2" title="销售额">
                <template #headerRight>
                    <el-tag>月</el-tag>
                </template>
                <h2 style="font-size:30px;line-height:2">￥12,000</h2>
                <el-progress :text-inside="true" :stroke-width="15" :percentage="53"
                    status="success" />
                <el-divider style="margin:20px 0 10px 0"></el-divider>
                <div class="flex-between">
                    <span>总销售额</span>
                    <span>68万</span>
                </div>
            </fy-card>
        </el-col>
        <el-col :md="6" :sm="12">
            <fy-card :type="2" title="销售额">
                <template #headerRight>
                    <el-tag>月</el-tag>
                </template>
                <h2 style="font-size:30px;line-height:2">￥12,000</h2>
                <el-progress :text-inside="true" :stroke-width="15" :percentage="53"
                    status="success" />
                <el-divider style="margin:20px 0 10px 0"></el-divider>
                <div class="flex-between">
                    <span>总销售额</span>
                    <span>68万</span>
                </div>
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
.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card-row:deep(.el-col) {
    margin-bottom: 10px;
}
</style>
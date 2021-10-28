<!--
 * @Description: 表格封装
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-28 10:25:24
 * @LastEditTime: 2021-10-28 18:40:01
-->
<template>
    <!-- 工具栏 -->
    <table-tools />
    <!-- 使用`v-bind="$attrs"`可继承组件调用是所配置的attr,这里可继承el-table组件所需要的所有属性及事件以及其他未作为props的行内属性 -->
    <!-- 继承的属性配置详见文档：https://element-plus.gitee.io/zh-CN/component/table.html#table-attributes -->
    <!-- 继承的事件文档：https://element-plus.gitee.io/zh-CN/component/table.html#table-events -->
    <el-table v-bind="$attrs" size="mini" border>
        <template v-for="(col,index) in cols" :key="index">
            <!-- 配置了type -> 多选框、引索、展开按钮 -->
            <el-table-column v-if="col.type" :type="col.type" :width="col.width"
                :min-width="col.minWidth" :selectable="col.selectable" :align="col.align"
                :class-name="col.className" :fixed="col.fixed">
                <template v-if="col.slotThead" #header>
                    <slot :name="col.slotThead" />
                </template>
                <template v-if="col.slot" #default="scope">
                    <slot :name="col.slot" :row="props.row" :_index="scope.$index" />
                </template>
            </el-table-column>
            <!-- 其他情况 -->
            <el-table-column v-else :label="col.label" :width="col.width" :min-width="col.minWidth"
                :align="col.align" :class-name="col.className"
                :label-class-name="col.labelClassName" :fixed="col.fixed" :prop="col.prop"
                :formatter="col.formatter" :sortable="col.sort" :sort-method="col.sortMethod"
                :sort-by="col.sortBy" :filters="col.filters" :showTooltip="col.showTooltip">
                <template v-if="col.slotThead" #header>
                    <slot :name="col.slotThead" />
                </template>
                <template v-if="col.slot" #default="scope">
                    <slot :name="col.slot" :row="scope.row" :_index="scope.$index" />
                </template>
            </el-table-column>
        </template>
    </el-table>
    <el-pagination class="table-page-nav" background v-model:currentPage="currPage"
        :page-sizes="[100, 200, 300, 400]" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="400"
        @size-change="$emit('pageSizeChange')" @current-change="$emit('pageCurrentChange')">
    </el-pagination>
</template>
 
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import TableTools from './TableTools.vue'
import { ICols } from './types'

export default defineComponent({
    name: 'Table',
    components: {
        TableTools,
    },
    // 禁用组件的根元素继承 attribute
    inheritAttrs: false,
    props: {
        cols: {
            // 表格列配置
            type: Array as PropType<ICols[]>,
            required: true,
        },
        currPage: {
            // 页码：当前页
            type: Number,
            default: 1,
        },
    },
    setup() {},
})
</script>
 
<style scoped lang="scss">
.table-page-nav {
    margin-top: 15px;
    text-align: right;
}
:deep(th.el-table__cell) {
    background: var(--color-table-thead-bg);
    .cell {
        color: var(--el-text-color-regular);
    }
}
</style>
<style>
.el-table {
    --el-table-current-row-background-color: var(--el-color-primary-light-5);
}
</style>
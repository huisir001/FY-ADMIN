<!--
 * @Description: 表格封装
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-28 10:25:24
 * @LastEditTime: 2021-11-02 17:38:36
-->
<template>
    <!-- 工具栏 -->
    <table-tools v-if="toolBtns.length" :btns="toolBtns" @btnClick="$emit('toolsClick', $event)" />
    <!-- 使用`v-bind="$attrs"`可继承组件调用是所配置的attr,这里可继承el-table组件所需要的所有属性及事件以及其他未作为props的行内属性 -->
    <!-- 继承的属性配置详见文档：https://element-plus.gitee.io/zh-CN/component/table.html#table-attributes -->
    <!-- 继承的事件文档：https://element-plus.gitee.io/zh-CN/component/table.html#table-events -->
    <el-table v-bind="$attrs" size="small" border>
        <template v-for="(col,index) in cols" :key="index">
            <!-- 配置了type -> 多选框、引索、展开按钮 -->
            <el-table-column v-if="col.type" :type="col.type" :width="col.width"
                :min-width="col.minWidth" :selectable="col.selectable" :align="col.align"
                :class-name="col.className" :fixed="col.fixed">
                <template v-if="col.slotThead" #header>
                    <slot :name="col.slotThead" />
                </template>
                <template v-if="col.slot" #default="scope">
                    <slot :name="col.slot" :row="props.row" :$index="scope.$index" />
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
                    <slot :name="col.slot" :row="scope.row" :$index="scope.$index" />
                </template>
            </el-table-column>
        </template>
    </el-table>
    <el-pagination v-if="page" class="table-page-nav" :currentPage="curr" :page-sizes="limits"
        :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total"
        background hide-on-single-page @size-change="handleSizeChange"
        @current-change="handleCurrChange">
    </el-pagination>
</template>
 
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import TableTools from './TableTools.vue'
import { ICols, TOptionOfTools } from './inc/types'
import useTableTools from './inc/useTableTools'

export default defineComponent({
    name: 'Table',
    components: {
        TableTools,
    },
    // 禁用组件的根元素继承 attribute
    inheritAttrs: false,
    props: {
        // 表格列配置
        cols: {
            type: Array as PropType<ICols[]>,
            required: true,
        },
        tools: {
            type: Array as PropType<TOptionOfTools[]>,
            default: () => [],
        },
        // 显示分页
        page: {
            type: Boolean,
            default: false,
        },
        // 页码：当前页
        curr: {
            type: Number,
            default: 1,
        },
        // 数据总条数。一般通过服务端得到
        total: {
            type: Number,
            default: 500,
        },
        // 每页条数的选择项，这个一般不用配置
        limits: {
            type: Array as PropType<number[]>,
            // 对象或数组默认值必须从一个工厂函数获取
            default: () => [15, 30, 50, 100, 200],
        },
    },
    setup({ limits, tools }, { emit }) {
        /* 工具栏 */
        const toolBtns = useTableTools(tools as TOptionOfTools[])

        /* 分页 */

        // 每页显示的条数。值需对应 limits 参数的选项。
        const limit = ref(limits[0])

        // 每页条数变更
        const handleSizeChange = (val: number) => {
            limit.value = val
            emit('pageSizeChange', val)
        }
        // 当前页变更
        const handleCurrChange = (val: number) => {
            emit('pageCurrChange', val)
        }
        return {
            toolBtns,
            limit,
            handleSizeChange,
            handleCurrChange,
        }
    },
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
<style lang="scss">
.el-table {
    --el-table-current-row-background-color: var(--el-color-primary-light-5);
    .cell {
        line-height: 24px;
        & > button {
            min-height: 23px;
            padding: 0;
            border: 0;
        }
    }
}
@media screen and (max-width: 1024px) {
    .table-page-nav {
        .el-pagination__total,
        .el-pagination__sizes,
        .el-pagination__jump {
            display: none !important;
        }
    }
}
</style>
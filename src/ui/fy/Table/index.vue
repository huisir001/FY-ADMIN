<!--
 * @Description: 表格封装
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-28 10:25:24
 * @LastEditTime: 2021-12-16 11:27:38
-->
<template>
    <!-- 工具栏 -->
    <!-- 插槽search（搜索栏）必须在tools工具栏存在情况下才能显示 -->
    <table-tools v-if="tools.length" :cols="cols" :tools="tools" :el-table="tableRef"
        @btnClick="handleBtnClick" @bindRefresh="$emit('bindRefresh')">
        <slot name="search" />
    </table-tools>
    <!-- 使用`v-bind="$attrs"`可继承组件调用是所配置的attr,这里可继承el-table组件所需要的所有属性及事件以及其他未作为props的行内属性 -->
    <!-- 继承的属性配置详见文档：https://element-plus.gitee.io/zh-CN/component/table.html#table-attributes -->
    <!-- 继承的事件文档：https://element-plus.gitee.io/zh-CN/component/table.html#table-events -->
    <div ref="tableBox" :style="{height:height}">
        <el-table ref="elTable" v-bind="$attrs" v-loading="loading" size="small" border
            :max-height="tableCalcHeight" @selection-change="handleSelectionChange">
            <el-table-column v-for="(col,index) in cols.filter((col) => !col.hide)" :key="index"
                v-bind="col">
                <!-- 表头插槽 -->
                <template v-if="col.slotHead" #header>
                    <slot :name="col.slotHead" />
                </template>
                <!-- 表头-带提示插槽 -->
                <template v-else-if="col.helpTip" #header>
                    <span>{{col.label}}</span>
                    <el-tooltip effect="light" :content="col.helpTip" placement="top">
                        <fy-icon name="question-filled" size="14" color="var(--el-color-info)"
                            style="margin-left:2px" :height="18" />
                    </el-tooltip>
                </template>
                <!-- 单元格插槽 -->
                <template v-if="col.slot" #default="scope">
                    <slot :name="col.slot" v-bind="scope" />
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="page" class="table-page-nav" :currentPage="curr" :page-sizes="limits"
            :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total"
            background hide-on-single-page @size-change="handleSizeChange"
            @current-change="handleCurrChange">
        </el-pagination>
    </div>
</template>
 
<script lang="ts">
import { computed, defineComponent, nextTick, PropType, Ref, ref, watch } from 'vue'
import TableTools from './TableTools.vue'
import { ICols, TOptionOfTools } from '../types'
import { useStore } from '@/store'

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
        // 表格最大高度
        height: String,
        // 工具栏
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
        loading: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['toolsClick', 'bindRefresh', 'pageSizeChange', 'pageCurrChange'],
    setup({ limits, height, page }, { emit }) {
        /* 表格对象 */
        const elTable = ref()

        /* 工具栏点击 */
        const handleBtnClick = (arg1: string, arg2: any) => {
            emit('toolsClick', arg1, arg2)
        }

        /* 表格高度计算 */
        const Store = useStore()
        const tableBox = ref()
        let tableCalcHeight: Ref<null | number> = ref(null)
        // 窗口高度
        const visibleAreaHeight = computed(() => Store.state.sys.visibleAreaHeight)
        // 监听窗口高度变化做些事
        if (height) {
            nextTick(() => {
                tableCalcHeight.value = tableBox.value.offsetHeight - (page ? 47 : 0)
            })
            watch(visibleAreaHeight, () => {
                tableCalcHeight.value = tableBox.value.offsetHeight - (page ? 47 : 0)
            })
        }

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

        // 监听多选
        const selection = ref([])
        const handleSelectionChange = (val: any) => {
            selection.value = val
        }
        return {
            handleBtnClick,
            tableBox,
            tableCalcHeight,
            limit,
            handleSizeChange,
            handleCurrChange,
            elTable,
            tableRef: computed(() => elTable), // 这里使用computed对elTable进行跟踪，传递到tools子组件
            handleSelectionChange,
            selection,
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
        .el-checkbox {
            height: 14px;
            transform: translate(-1px, 3px);
        }
    }
    tr:last-child > td {
        border-bottom: none;
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
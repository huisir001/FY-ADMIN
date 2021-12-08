<!--
 * @Description: 表格工具栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-27 18:09:14
 * @LastEditTime: 2021-11-25 17:23:07
-->
<template>
    <div v-if="hasSearchTool" v-show="showSearchForm" class="search-from-box">
        <slot />
    </div>
    <div class="table-tools">
        <div class="left">
            <el-button v-for="btn in leftBtns" :key="btn.name" size="mini" :type="btn.type"
                :disabled="btn.disabled" @click="handleBtnClick(btn)">
                <fy-icon :name="btn.icon" size="13" color="white" /> {{btn.title}}
            </el-button>
        </div>
        <div class="right">
            <template v-for="btn in rightBtns" :key="btn.name">
                <el-dropdown v-if="btn.dropdown" :class="{disabled:btn.disabled}" trigger="click"
                    :hide-on-click="btn.name==='export'"
                    @visibleChange="$emit('btnClick',btn.name,$event)">
                    <el-tooltip effect="light" :content="btn.title" placement="top"
                        :auto-close="1000">
                        <div class="tool-item el-dropdown-link" :class="{[btn.name]:true}">
                            <fy-icon :name="btn.icon" color="var(--el-text-color-regular)"
                                size="16" />
                        </div>
                    </el-tooltip>
                    <template #dropdown>
                        <el-dropdown-menu class="table-tool-dropmenu">
                            <template v-if="btn.name==='cols'">
                                <el-checkbox-group v-model="showCols">
                                    <el-dropdown-item v-for="label in colLables" :key="label">
                                        <el-checkbox :label="label" />
                                    </el-dropdown-item>
                                </el-checkbox-group>
                            </template>
                            <template v-if="btn.name==='export'">
                                <el-dropdown-item @click="exportCurrPage(1)">导出csv
                                </el-dropdown-item>
                                <el-dropdown-item @click="exportCurrPage(2)">导出excel
                                </el-dropdown-item>
                            </template>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-tooltip v-else effect="light" :content="btn.title" placement="top"
                    :auto-close="1000">
                    <div class="tool-item" :class="{[btn.name]:true,disabled:btn.disabled}"
                        @click="handleBtnClick(btn)">
                        <fy-icon :name="btn.icon" color="var(--el-text-color-regular)" size="16" />
                    </div>
                </el-tooltip>
            </template>
        </div>
    </div>
</template>
 
<script lang="ts">
import { defineComponent, ref, PropType, watch, computed } from 'vue'
import useTableTools from './useTableTools'
import { ICols, ITableTool, TOptionOfTools } from '../types'
import useTableToolsAction from './useTableToolsAction'

export default defineComponent({
    name: 'TableTools',
    props: {
        elTable: {
            required: true,
        },
        cols: {
            type: Array as PropType<ICols[]>,
            required: true,
        },
        tools: {
            type: Array as PropType<TOptionOfTools[]>,
            default: () => [],
        },
    },
    emits: ['btnClick', 'showCols'],
    setup({ elTable, cols, tools }, { emit }) {
        // 所有按钮
        const { left, right } = useTableTools()

        // 是否有搜索表单
        const hasSearchTool = tools.includes('search')

        // 左侧按钮组
        const leftBtns = left.filter((item: any) => tools.includes(item.name))

        // 右侧按钮组
        const rightBtns = right.filter((item: any) => tools.includes(item.name))

        // 搜索表单栏状态
        const showSearchForm = ref(false)

        // 表格折叠状态
        const treeTableExpanded = ref(false)

        // 部分工具栏固定方法
        const { selectShowCols, toggleTreeTableAll, exportCurrPage } = useTableToolsAction(
            elTable,
            cols
        )

        // 右侧按钮点击
        const handleBtnClick = (btn: ITableTool) => {
            if (!btn.disabled) {
                if (btn.name === 'search') {
                    // 搜索按钮：显隐表单
                    showSearchForm.value = !showSearchForm.value
                    emit('btnClick', btn.name, showSearchForm.value)
                } else if (btn.name === 'fold') {
                    // 展开折叠
                    treeTableExpanded.value = !treeTableExpanded.value
                    toggleTreeTableAll(treeTableExpanded.value)
                    emit('btnClick', btn.name, treeTableExpanded.value)
                } else {
                    // 通知父组件
                    emit('btnClick', btn.name)
                }
            }
        }

        return {
            leftBtns,
            rightBtns,
            hasSearchTool,
            showSearchForm,
            handleBtnClick,
            exportCurrPage,
            ...selectShowCols(),
        }
    },
})
</script>
 
<style scoped lang="scss">
@import '@/assets/styles/mixin.scss';
.table-tools {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .left,
    .right {
        display: flex;
    }
    .right {
        .tool-item {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: var(--el-border-base);
            cursor: pointer;
            transition: 0.3s all;
            outline: none !important;
            margin-left: 10px;
            &:not(.disabled):active {
                background: var(--el-background-color-base);
                --el-text-color-regular: var(--el-color-primary);
                outline: none;
                border: none;
            }
        }
        .disabled {
            opacity: 0.5;
            pointer-events: none;
        }
    }
}
.table-tool-dropmenu {
    @include scrollBar;
    max-height: 300px;
    overflow-y: auto;
    :deep(.el-checkbox__label) {
        color: unset !important;
    }
}
</style>
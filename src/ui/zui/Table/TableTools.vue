<!--
 * @Description: 表格工具栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-27 18:09:14
 * @LastEditTime: 2021-11-05 15:51:18
-->
<template>
    <div v-if="hasSearchTool" v-show="showSearchForm" class="search-from-box">
        <slot name="search" />
    </div>
    <div class="table-tools">
        <div class="left">
            <el-button v-for="btn in leftBtns" :key="btn.name" size="mini" :type="btn.type"
                :disabled="btn.disabled" @click="$emit('btnClick',btn.name)">
                <z-icon :name="btn.icon" size="13" color="white" /> {{btn.title}}
            </el-button>
        </div>
        <div class="right">
            <template v-for="btn in rightBtns" :key="btn.name">
                <el-dropdown v-if="btn.name=='cols'" trigger="click" :hide-on-click="false">
                    <el-tooltip effect="light" :content="btn.title" placement="top"
                        :auto-close="1000">
                        <div class="tool-item el-dropdown-link"
                            :class="{[btn.name]:true,disabled:btn.disabled}">
                            <z-icon :name="btn.icon" color="var(--el-text-color-regular)"
                                size="16" />
                        </div>
                    </el-tooltip>
                    <template #dropdown>
                        <el-dropdown-menu class="table-tool-dropmenu">
                            <el-checkbox-group v-model="showCols">
                                <el-dropdown-item v-for="label in colLabels" :key="label">
                                    <el-checkbox :label="label" />
                                </el-dropdown-item>
                            </el-checkbox-group>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-tooltip v-else effect="light" :content="btn.title" placement="top"
                    :auto-close="1000">
                    <div class="tool-item" :class="{[btn.name]:true,disabled:btn.disabled}"
                        @click="handleRightBtnClick(btn)">
                        <z-icon :name="btn.icon" color="var(--el-text-color-regular)" size="16" />
                    </div>
                </el-tooltip>
            </template>
        </div>
    </div>
</template>
 
<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue'
import useTableTools from './useTableTools'
import { ITableTool, TOptionOfTools } from '../types'

export default defineComponent({
    name: 'TableTools',
    props: {
        colLabels: {
            type: Array as PropType<string[]>,
            required: true,
        },
        tools: {
            type: Array as PropType<TOptionOfTools[]>,
            default: () => [],
        },
    },
    emits: ['btnClick', 'showCols'],
    setup({ colLabels, tools }, { emit }) {
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

        // 右侧按钮点击
        const handleRightBtnClick = (btn: ITableTool) => {
            if (!btn.disabled) {
                if (btn.name === 'search') {
                    showSearchForm.value = !showSearchForm.value
                } else {
                    emit('btnClick', btn.name)
                }
            }
        }

        // 列筛选
        const showCols = ref(colLabels)

        // 反馈给父组件
        watch(
            showCols,
            (val) => {
                emit('showCols', val)
            },
            { immediate: true }
        )

        return {
            leftBtns,
            rightBtns,
            showCols,
            hasSearchTool,
            showSearchForm,
            handleRightBtnClick,
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
            &.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }
    }
}
.table-tool-dropmenu {
    @include scrollBar;
    max-height: 300px;
    overflow-y: auto;
}
</style>
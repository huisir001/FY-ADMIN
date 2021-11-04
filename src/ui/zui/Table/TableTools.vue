<!--
 * @Description: 表格工具栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-27 18:09:14
 * @LastEditTime: 2021-11-04 15:26:50
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
            <el-tooltip v-for="btn in rightBtns" :key="btn.name" effect="light" :content="btn.title"
                placement="top" :auto-close="1000">
                <div :class="{[btn.name]:true,disabled:btn.disabled}"
                    @click="handleRightBtnClick(btn)">
                    <z-icon :name="btn.icon" color="var(--el-text-color-regular)" size="14" />
                </div>
            </el-tooltip>
        </div>
    </div>
</template>
 
<script lang="ts">
import { computed, defineComponent, ref, PropType } from 'vue'
import useTableTools from './useTableTools'
import { ITableTool, TOptionOfTools } from './types'

export default defineComponent({
    name: 'TableTools',
    props: {
        tools: {
            type: Array as PropType<TOptionOfTools[]>,
            default: () => [],
        },
    },
    setup({ tools }, { emit }) {
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

        return {
            leftBtns,
            rightBtns,
            hasSearchTool,
            showSearchForm,
            handleRightBtnClick,
        }
    },
})
</script>
 
<style scoped lang="scss">
.table-tools {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .left,
    .right {
        display: flex;
    }
    .right {
        & > div {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: var(--el-border-base);
            cursor: pointer;
            transition: 0.3s all;
            outline: none !important;
            & + div {
                margin-left: 10px;
            }
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
</style>
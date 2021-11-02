<!--
 * @Description: 表格工具栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-27 18:09:14
 * @LastEditTime: 2021-11-02 17:48:19
-->
<template>
    <div class="table-tools">
        <div class="left">
            <el-button v-for="btn in leftBtns" :key="btn.name" size="mini" :type="btn.type"
                :disabled="btn.disabled" @click="$emit('btnClick',btn.name)">
                <icon :name="btn.icon" size="13" color="white" /> {{btn.title}}
            </el-button>
        </div>
        <div class="right">
            <el-tooltip v-for="btn in rightBtns" :key="btn.name" effect="light" :content="btn.title"
                placement="top" :auto-close="1000">
                <div :class="{[btn.name]:true,disabled:btn.disabled}"
                    @click="btn.disabled?null:$emit('btnClick',btn.name)">
                    <icon :name="btn.icon" color="var(--el-text-color-regular)" size="14" />
                </div>
            </el-tooltip>
        </div>
    </div>
</template>
 
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ITableTool } from './inc/types'

export default defineComponent({
    name: 'TableTools',
    props: {
        btns: {
            type: Array,
            required: true,
        },
    },
    setup({ btns }) {
        const leftBtns = computed(() =>
            (btns as ITableTool[]).filter((item) => item.position === 'left')
        )
        const rightBtns = computed(() =>
            (btns as ITableTool[]).filter((item) => item.position === 'right')
        )
        return {
            Check: 'check',
            leftBtns,
            rightBtns,
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
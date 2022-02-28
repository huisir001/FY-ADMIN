<!--
 * @Description: 详情弹窗
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-15 10:37:22
 * @LastEditTime: 2022-02-28 15:02:44
-->
<template>
    <el-dialog custom-class="fy-detail-dialog" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" :title="title" @open="open"
        width="30%" draggable center>
        <el-descriptions :column="3" border>
            <el-descriptions-item v-for="item in options" :key="item.key" :label="item.label">
                {{item.formatter?item.formatter(params):params[item.key]}}
            </el-descriptions-item>
        </el-descriptions>
        <template #footer>
            <span class="dialog-footer">
                <el-button plain @click="$emit('update:modelValue', false)">关闭</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IFormOption } from '../types'

const props = defineProps({
    // 弹窗显隐
    modelValue: {
        type: Boolean,
        require: true,
        default: false,
    },
    // 弹窗标题
    title: {
        type: String,
        default: '详情',
    },
    // 默认距顶部距离
    top: {
        type: [String, Number],
        default: '20%',
    },
    // 详情配置选项
    options: {
        type: Array as PropType<IFormOption[]>,
        require: true,
        default: () => [],
    },
    // 数据
    params: {
        type: Object as PropType<IObj>,
        require: true,
        default: () => ({}),
    },
})

// emit
const emit = defineEmits(['update:modelValue'])
</script>

<style lang="scss">
@media all and (min-width: 999px) {
    .fy-detail-dialog.el-dialog {
        width: 978px;
    }
}
@media all and (min-width: 685px) and (max-width: 998px) {
    .fy-detail-dialog.el-dialog {
        width: 664px;
    }
}
@media all and (min-width: 376px) and (max-width: 684px) {
    .fy-detail-dialog.el-dialog {
        width: 374px;
        .el-dialog__body {
            text-align: center;
        }
    }
}
@media all and (max-width: 375px) {
    .fy-detail-dialog.el-dialog {
        width: calc(100% - 20px);
        min-width: auto;
    }
}
</style>

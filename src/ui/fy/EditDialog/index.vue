<!--
 * @Description: 编辑弹窗
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-15 10:37:22
 * @LastEditTime: 2022-01-10 14:13:33
-->
<template>
    <el-dialog custom-class="fy-edit-dialog" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" :title="title" @open="open"
        @closed="closed">
        <fy-search-form ref="fyForm" v-model="formParams" :options="options" :showSearchBtn="false">
            <template v-for="item in options.filter((o) => o.slot)" :key="item.key"
                v-slot:[item.slot]>
                <slot :name="item.slot" :val="formParams" />
            </template>
        </fy-search-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button plain @click="$emit('update:modelValue', false)">取消</el-button>
                <el-button plain type="primary" @click="sure">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, PropType, ref } from 'vue'
import { IFormOption } from '../types'
import { boxMove } from '@/ui/helpers'

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
        default: '编辑',
    },
    // 默认距顶部距离
    top: {
        type: [String, Number],
        default: '20%',
    },
    // 表单项配置选项
    options: {
        type: Array as PropType<IFormOption[]>,
        require: true,
        default: () => [],
    },
    // 表单数据
    params: {
        type: Object as PropType<IObj>,
        require: true,
        default: () => ({}),
    },
})

// emit
const emit = defineEmits(['update:modelValue', 'submit'])

// 弹窗元素
const dialogEl = ref()

// 弹窗拖拽跟随
onMounted(() => {
    const dialogHeaderEl = document.querySelector('.fy-edit-dialog .el-dialog__header')
    dialogEl.value = document.querySelector('.fy-edit-dialog.el-dialog')
    boxMove({
        box: dialogEl.value as HTMLElement,
        target: dialogHeaderEl as HTMLElement,
    })
})

// 表单对象
const fyForm = ref()
// 中转表单数据
const formParams = ref({} as IObj)

// 确认
const sure = () => {
    // 验证
    fyForm.value.elForm.validate((valid: any) => {
        if (valid) {
            emit('submit', JSON.parse(JSON.stringify(formParams.value)))
            emit('update:modelValue', false)
        } else {
            return false
        }
    })
}

// 弹窗关闭完成
const closed = () => {
    // 清除验证提示
    fyForm.value.elForm.resetFields()
    // 清空表单信息
    formParams.value = {}
}

// 弹窗触发open
const open = () => {
    // 初始化值
    props.options.forEach((item) => {
        formParams.value[item.key] = item.default ? item.default : null
    })
    // 合并
    Object.assign(formParams.value, props.params)
    // 将弹窗位置还原默认
    dialogEl.value.style =
        typeof props.top === 'number' ? 'top:' + props.top + 'px' : 'top:' + props.top
}
</script>

<style lang="scss">
.fy-edit-dialog.el-dialog {
    position: absolute;
    margin: 0;
    .el-dialog__footer {
        text-align: center;
    }
    .el-form--inline .el-form-item {
        margin-right: 20px;
    }
}
@media all and (min-width: 999px) {
    .fy-edit-dialog.el-dialog {
        width: 978px;
        left: calc(50vw - 489px);
        .el-form--inline .el-form-item:nth-child(3n) {
            margin-right: 0;
        }
    }
}
@media all and (min-width: 685px) and (max-width: 998px) {
    .fy-edit-dialog.el-dialog {
        width: 664px;
        left: calc(50vw - 332px);
        .el-form--inline .el-form-item:nth-child(2n) {
            margin-right: 0;
        }
    }
}
@media all and (min-width: 376px) and (max-width: 684px) {
    .fy-edit-dialog.el-dialog {
        width: 374px;
        left: calc(50vw - 187px);
        .el-dialog__body {
            text-align: center;
            .el-form--inline .el-form-item {
                margin-right: 0;
            }
        }
    }
}
@media all and (max-width: 375px) {
    .fy-edit-dialog.el-dialog {
        width: calc(100% - 20px);
        left: 10px;
        min-width: auto;
        .el-form--inline .el-form-item {
            margin-right: 0;
        }
    }
}
</style>

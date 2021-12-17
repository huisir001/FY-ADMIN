<!--
 * @Description: 编辑弹窗
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-15 10:37:22
 * @LastEditTime: 2021-12-17 15:04:50
-->
<template>
    <el-dialog custom-class="fy-edit-dialog" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" :title="title" @open="open"
        @closed="closed">
        <fy-search-form ref="fyForm" v-model="formParams" :options="options"
            :showSearchBtn="false" />
        <template #footer>
            <span class="dialog-footer">
                <el-button plain @click="$emit('update:modelValue', false)">取消</el-button>
                <el-button plain type="primary" @click="sure">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>
 
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { IFormOption } from '../types'
import { boxMove } from '../helpers'

export default defineComponent({
    name: 'EditDialog',
    props: {
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
    },
    // `update:modelValue`为`v-model`传参固定事件写法
    emits: ['update:modelValue', 'submit'],
    setup(props, { emit }) {
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
        const formParams = ref({})
        watch(
            () => props.params,
            (val) => {
                // 由于表单数据不会出现函数、对象引用等，这里直接用JSON序列化进行深拷贝
                formParams.value = JSON.parse(JSON.stringify(val))
            }
        )

        // 确认
        const sure = () => {
            emit('submit', formParams.value)
            emit('update:modelValue', false)
        }

        // 弹窗关闭完成
        const closed = () => {
            // 清除验证提示
            fyForm.value.elForm.resetFields()
        }

        // 弹窗触发open
        const open = () => {
            // 将弹窗位置还原默认
            dialogEl.value.style =
                typeof props.top === 'number' ? 'top:' + props.top + 'px' : 'top:' + props.top
        }

        return {
            fyForm,
            formParams,
            sure,
            open,
            closed,
        }
    },
})
</script>
 
<style lang="scss">
.fy-edit-dialog.el-dialog {
    position: absolute;
    margin: 0;
    .el-dialog__footer {
        text-align: center;
    }
}
@media all and (min-width: 1001px) {
    .fy-edit-dialog.el-dialog {
        width: 980px;
        left: calc(50vw - 490px);
    }
}
@media all and (min-width: 691px) and (max-width: 1000px) {
    .fy-edit-dialog.el-dialog {
        width: 670px;
        left: calc(50vw - 335px);
    }
}
@media all and (min-width: 376px) and (max-width: 690px) {
    .fy-edit-dialog.el-dialog {
        width: 374px;
        left: calc(50vw - 187px);
        .el-dialog__body {
            text-align: center;
        }
    }
}
@media all and (max-width: 375px) {
    .fy-edit-dialog.el-dialog {
        width: calc(100% - 20px);
        left: 10px;
        min-width: auto;
    }
}
</style>
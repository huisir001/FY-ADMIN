<!--
 * @Description: 编辑弹窗
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-15 10:37:22
 * @LastEditTime: 2021-12-16 16:40:15
-->
<template>
    <div class="fy-edit-dialog">
        <el-dialog :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)"
            :title="title" @closed="closed">
            <fy-search-form ref="fyForm" v-model="formParams" :options="options"
                :showSearchBtn="false" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button plain @click="$emit('update:modelValue', false)">取消</el-button>
                    <el-button plain type="primary" @click="sure">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
 
<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormOption } from '../types'

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

        const closed = () => {
            // 清除验证提示
            fyForm.value.elForm.resetFields()
        }

        return {
            fyForm,
            formParams,
            sure,
            closed,
        }
    },
})
</script>
 
<style scoped lang="scss">
.fy-edit-dialog:deep(.el-dialog) {
    .el-dialog__header {
        padding: 12px 20px;
        line-height: 1;
        background: var(--color-sidebar-bg);
        .el-dialog__title {
            color: var(--color-sidebar-font);
            font-size: var(--el-font-size-medium);
        }
        .el-dialog__headerbtn {
            top: 16px;
            .el-dialog__close {
                color: var(--color-sidebar-font);
            }
        }
    }
    .el-dialog__body {
        padding: 20px;
    }
    .el-dialog__footer {
        background: #ecf0f1;
        padding: 10px 20px 14px;
        text-align: center;
    }
}
@media all and (min-width: 1001px) {
    .fy-edit-dialog:deep(.el-dialog) {
        width: 980px;
    }
}
@media all and (min-width: 691px) and (max-width: 1000px) {
    .fy-edit-dialog:deep(.el-dialog) {
        width: 670px;
    }
}
@media all and (min-width: 376px) and (max-width: 690px) {
    .fy-edit-dialog:deep(.el-dialog) {
        width: 375px;
        .el-dialog__body {
            text-align: center;
        }
    }
}
@media all and (max-width: 375px) {
    .fy-edit-dialog:deep(.el-dialog) {
        width: calc(100% - 20px);
        min-width: auto;
    }
}
</style>
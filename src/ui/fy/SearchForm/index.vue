<!--
 * @Description: 搜索表单
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-04 16:39:23
 * @LastEditTime: 2021-12-16 10:24:22
-->
<template>
    <el-form class="fy-search-form" :inline="inline" label-width="auto">
        <el-form-item v-for="item in options" :key="item.key" :label="item.label">
            <slot v-if="item.slot" :name="item.slot" />
            <template v-else>
                <!-- 日期，这里单独拎出来是因为使用动态组件的话会导致日期弹框BUG -->
                <el-date-picker v-if="item.component=='date-picker'" v-model="params[item.key]"
                    v-bind="item.props" clearable>
                </el-date-picker>
                <!-- 其他 -->
                <component v-else :is="`el-${item.component}`" v-model="params[item.key]"
                    v-bind="item.props" clearable>
                    <!-- 下拉框 -->
                    <template v-if="item.options">
                        <el-option v-for="option in item.options" :key="option.value"
                            :label="option.label" :value="option.value"></el-option>
                    </template>
                </component>
            </template>
        </el-form-item>
        <el-form-item v-if="showSearchBtn">
            <el-button type="primary" @click="$emit('submit')">搜索</el-button>
            <el-button @click="$emit('reset')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
 
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { IFormOption } from '../types'

export default defineComponent({
    name: 'SearchForm',
    props: {
        // 是否行内
        inline: {
            type: Boolean,
            require: false,
            default: true,
        },
        // 是否显示搜索按钮
        showSearchBtn: {
            type: Boolean,
            require: false,
            default: true,
        },
        // 表单项配置选项
        options: {
            type: Array as PropType<IFormOption[]>,
            require: true,
            default: () => [],
        },
        // v-model传参写法
        modelValue: {
            type: Object as PropType<IObj>,
            require: true,
            default: () => ({}),
        },
    },
    // `update:modelValue`为`v-model`传参固定事件写法
    emits: ['update:modelValue', 'submit', 'reset'],
    setup(props, { emit }) {
        // 操作父级数据
        const params = computed({
            get() {
                return props.modelValue
            },
            set(value: any) {
                emit('update:modelValue', value)
            },
        })

        return { params }
    },
})
</script>
 
<style scoped lang="scss">
.fy-search-form:deep(.el-input__inner),
.fy-search-form:deep(.el-input),
.fy-search-form:deep(.el-switch) {
    width: 220px;
    max-width: 100%;
    &.el-date-editor--datetimerange {
        width: 350px !important;
    }
}
.fy-search-form:deep(.el-form-item__content) {
    display: flex;
    align-items: center;
}
@media all and (max-width: 375px) {
    .fy-search-form:deep(.el-input__inner),
    .fy-search-form:deep(.el-input),
    .fy-search-form:deep(.el-switch) {
        width: 100%;
    }
}
</style>
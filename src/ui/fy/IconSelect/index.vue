<!--
 * @Description: 图标选择
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-24 10:51:13
 * @LastEditTime: 2022-01-07 16:09:22
-->
<template>
    <el-popover :visible="visible" popper-class="icon-select" placement="bottom-start" :width="220"
        @show="show">
        <template #reference>
            <el-input class="icon-select-input" v-model="modelValue" readonly placeholder="请选择图标"
                @click="visible = !visible">
                <template v-if="modelValue" #suffix>
                    <fy-icon @click="visible = !visible" :name="modelValue"
                        color="var(--el-select-input-color)" size="14" style="cursor:pointer" />
                </template>
            </el-input>
        </template>
        <el-input class="search-input" v-model="fuzzySearchWord" clearable placeholder="搜索..." />
        <div class="icon-box">
            <div class="icon-item" v-for="item in fuzzySearch(fyIcons,fuzzySearchWord)" :key="item"
                :title="item" @click="bindIconCheck(item)">
                <fy-icon :name="item" size="20" />
            </div>
        </div>
    </el-popover>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, defineProps, defineEmits } from 'vue'
import { fuzzySearch, clickOtherPosToClose } from '@/ui/helpers'

// props
defineProps({
    modelValue: {
        type: String,
        require: true,
    },
})

// emit
const emit = defineEmits<{
    (e: 'update:modelValue', iconName: string): void
}>()

// 弹窗显隐
const visible = ref(false)

// 获取缓存的图标列表
const currInstance: any = getCurrentInstance()
const fyIcons = currInstance.proxy.$getIcons()

// 点选
const bindIconCheck = (iconName: string) => {
    emit('update:modelValue', iconName)
}

// 模糊搜索
const fuzzySearchWord = ref('')

// 显隐事件
const show = () => {
    const inputEl = document.querySelector('.icon-select-input')
    const popEl = document.querySelector('.el-popover.icon-select')
    clickOtherPosToClose([inputEl as HTMLElement, popEl as HTMLElement], () => {
        visible.value = false
    })
}
</script>
 
<style scoped lang="scss">
@import '@/assets/styles/mixin.scss';
.icon-box {
    height: 114px;
    overflow: auto;
    @include scrollBar;
    .icon-item {
        display: inline-block;
        width: 38px;
        height: 38px;
        text-align: center;
        line-height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
            background: var(--el-color-primary-light-9);
        }
    }
}
:global(.el-popover.icon-select) {
    padding: 10px 8px 10px 10px;
}
:global(.el-popover.icon-select .search-input) {
    width: calc(100% - 2px);
    margin-bottom: 5px;
}
.icon-select-input:deep(.el-input__inner) {
    cursor: pointer;
}
</style>
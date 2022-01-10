<!--
 * @Description: 树结构选择
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-24 10:51:13
 * @LastEditTime: 2022-01-10 14:00:43
-->
<template>
    <el-popover :visible="visible" popper-class="tree-select" placement="bottom-start" :width="220"
        @show="show">
        <template #reference>
            <el-input class="tree-select-input" v-model="label" readonly placeholder="请选择"
                @click="visible = !visible">
                <template #suffix>
                    <fy-icon @click="visible = !visible" name="ArrowUp"
                        color="var(--el-select-input-color)" size="14"
                        :style="{transition:'transform var(--el-transition-duration)',transform:iconRotate, cursor: 'pointer'}" />
                </template>
            </el-input>
        </template>
        <el-input class="search-input" v-model="filterText" clearable placeholder="搜索..."
            @input="searchInputChange" />
        <div class="tree-box">
            <el-tree ref="tree" class="filter-tree" :data="data" :props="option"
                :filter-node-method="filterNode" node-key="id" highlight-current
                @current-change="bindCurrChange" />
        </div>
    </el-popover>
</template>
 
<script lang="ts" setup>
import { computed, PropType, ref } from 'vue'
import { fuzzySearch, clickOtherPosToClose } from '@/ui/helpers'

const props = defineProps({
    modelValue: {
        type: String,
        require: true,
    },
    label: {
        // 显示文本
        type: String,
        require: true,
    },
    data: {
        type: Object,
        require: true,
    },
    option: {
        type: Object as PropType<{
            children: string
            label: string
            disabled?: (data: any, node: any) => boolean
        }>,
        default: () => ({
            children: 'children',
            label: 'label',
        }),
    },
})

const emit = defineEmits(['update:modelValue'])

// 弹窗显隐
const visible = ref(false)

// 树ref
const tree = ref()

// 搜索节点
const filterText = ref('')

// 輸入框圖標反轉
const iconRotate = computed(() => (visible.value ? 'rotateZ(0)' : 'rotateZ(180deg)'))

// 点选
const bindCurrChange = (data: any) => {
    emit('update:modelValue', data.id)
}

// 模糊搜索
const fuzzySearchWord = ref('')

// 显隐事件
const show = () => {
    // 置空搜索
    filterText.value = ''
    searchInputChange('')
    // 回显当前选择节点
    tree.value.setCurrentKey(props.modelValue)
    // 点击空白关闭下拉
    const inputEl = document.querySelector('.tree-select-input')
    const popEl = document.querySelector('.el-popover.tree-select')
    clickOtherPosToClose([inputEl as HTMLElement, popEl as HTMLElement], () => {
        visible.value = false
    })
}

// 查询
const searchInputChange = (val: string) => {
    tree.value.filter(val)
}
const filterNode = (value: string, data: any) => {
    if (!value) return true
    return data.name.indexOf(value) !== -1
}
</script>
 
<style scoped lang="scss">
@import '@/assets/styles/mixin.scss';
.tree-box {
    max-height: 210px;
    overflow: auto;
    padding-right: 5px;
    @include scrollBar;
}
</style>
<style lang="scss">
.el-popover.tree-select {
    padding: 10px 8px 10px 10px;
    .search-input {
        width: calc(100% - 2px);
        margin-bottom: 5px;
    }
}
.tree-select-input .el-input__inner {
    cursor: pointer;
}
</style>
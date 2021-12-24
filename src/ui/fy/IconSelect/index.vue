<!--
 * @Description: 图标选择
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-24 10:51:13
 * @LastEditTime: 2021-12-24 15:32:50
-->
<template>
    <el-popover :visible="visible" popper-class="icon-select" placement="bottom-start" :width="220"
        @show="show" @hide="hide">
        <template #reference>
            <el-input v-model="modelValue" readonly placeholder="请选择图标" @click="visible = true" />
        </template>
        <el-input class="search-input" v-model="fuzzySearchWord" clearable size="mini"
            placeholder="搜索..." />
        <div class="icon-box">
            <div class="icon-item" v-for="item in fuzzySearch(fyIcons,fuzzySearchWord)" :key="item"
                :title="item" @click="bindIconCheck(item)">
                <fy-icon :name="item" size="20" />
            </div>
        </div>
    </el-popover>
</template>
 
<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import { fuzzySearch } from '@/ui/helpers'

export default defineComponent({
    name: 'IconSelect',
    props: {
        modelValue: {
            type: String,
            require: true,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
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
        let eventListener: (e: Event) => any
        const show = () => {
            eventListener = (e) => {
                const popEl = document.querySelector('.el-popover.icon-select')
                if (!popEl!.contains(e.target as HTMLElement)) {
                    visible.value = false
                }
            }
            document.addEventListener('click', eventListener, true)
        }
        const hide = () => {
            document.removeEventListener('click', eventListener, true)
        }

        return {
            visible,
            bindIconCheck,
            fyIcons,
            fuzzySearch,
            fuzzySearchWord,
            show,
            hide,
        }
    },
})
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
</style>
<style lang="scss">
.el-popover.icon-select {
    padding: 10px 8px 10px 10px;
    .search-input {
        width: calc(100% - 2px);
        margin-bottom: 5px;
    }
}
</style>
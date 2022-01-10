<!--
 * @Description: 模糊搜索输入框
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-10 15:55:40
 * @LastEditTime: 2022-01-10 16:49:18
-->
<template>
    <div>
        <el-input v-model="fuzzySearchWord" clearable :placeholder="placeholder" />
    </div>
</template>
 
<script lang="ts" setup>
import { Ref, ref, watch, computed } from 'vue'
import { fuzzySearch } from '@/ui/helpers'
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
    data: {
        type: Array,
        default: () => [],
    },
    placeholder: {
        type: String,
        default: '输入关键字搜索...',
    },
})

const emit = defineEmits(['update:modelValue'])

const fuzzySearchWord: Ref<string> = ref('')

const data = computed(() => props.data)

watch(data, (val) => {
    emit('update:modelValue', fuzzySearch(props.data, fuzzySearchWord.value))
})

watch(fuzzySearchWord, (val) => {
    emit('update:modelValue', fuzzySearch(props.data, val))
})
</script>
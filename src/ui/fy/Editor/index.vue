<!--
 * @Description: 富文本编辑器
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-02-16 14:30:17
 * @LastEditTime: 2022-02-16 18:13:27
-->
<template>
</template>

<script lang="ts">
export default {
    name: 'Editor',
}
</script>

<script lang="ts" setup>
// 工具栏
type IToolbar = 'bold' | 'italic' | 'underline' | 'strike' | 'link' | 'image'

// props
defineProps({
    toolbar: {
        type: Array as PropType<IToolbar[]>,
        default: () => ['bold', 'italic', 'underline', 'strike', 'link', 'image'],
    },
})
</script>
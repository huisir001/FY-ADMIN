<!--
 * @Description: 图标动态引用封装
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-01 16:14:25
 * @LastEditTime: 2021-11-01 21:26:20
-->
<template>
    <el-icon :color="color" :size="Number(size)">
        <component :is="`icon-${name}`" />
    </el-icon>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Icon',
    props: {
        name: {
            type: String,
            required: true,
        },
        size: {
            type: [Number, String],
            default: 20,
        },
        color: {
            type: String,
            default: 'var(--el-text-color-regular)',
        },
    },
})
</script>
 
<style scoped lang="scss">
</style>
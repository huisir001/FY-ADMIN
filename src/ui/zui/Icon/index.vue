<!--
 * @Description: 图标动态引用封装
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-01 16:14:25
 * @LastEditTime: 2021-11-22 16:52:41
-->
<template>
    <el-icon :color="color" :size="Number(size)" :class="{'z-icon':height}"
        :style="{height:height?height+'px':false}">
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
        /**
         * 调整高度，单位px
         */
        height: {
            type: Number,
        },
    },
})
</script>
<style scoped lang="scss">
.z-icon {
    display: inline-table;
    vertical-align: middle;
}
</style>
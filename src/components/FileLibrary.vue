<!--
 * @Description: 文件库(只支持上传图片和zip压缩包)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-25 12:22:55
 * @LastEditTime: 2021-09-25 15:28:20
-->
<template>
    <div>
        <slot name="" />
    </div>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FileLibrary',
    props: {
        /**
         * 文件类型，只支持上传图片和zip压缩包
         */
        type: {
            type: String,
            required: true,
            default: 'all',
            validator(value: string) {
                // 这个值必须匹配下列字符串中的一个
                return ['pic', 'zip', 'all'].includes(value)
            },
        },
    },
    setup() {
        return {}
    },
})
</script>
 
<style scoped lang="scss">
</style>
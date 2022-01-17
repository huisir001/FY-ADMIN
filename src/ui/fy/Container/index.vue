<!--
 * @Description: 内容区，路由必备
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-17 14:54:26
 * @LastEditTime: 2022-01-17 16:19:03
-->
<template>
    <div class="full-cont">
        <slot />
    </div>
</template>

<script lang="ts">
export default {
    name: 'Container',
}
</script>

<script lang="ts" setup>
defineProps({
    color: {
        type: String,
        default: 'var(--color-content-bg)',
    },
})
</script>

<style scoped lang="scss">
.full-cont {
    width: 100%;
    padding: 15px;
    min-height: 100%;
    background: v-bind(color);
    border-radius: var(--el-border-radius-small);
}
</style>
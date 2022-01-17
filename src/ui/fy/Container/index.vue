<!--
 * @Description: 内容区，路由必备
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-17 14:54:26
 * @LastEditTime: 2022-01-17 18:11:24
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
@import '@/assets/styles/mixin.scss';
.full-cont {
    @include scrollBar;
    width: 100%;
    height: 100%;
    padding: 15px;
    background: v-bind(color);
    border-radius: var(--el-border-radius-small);
    overflow-y: auto;
}
</style>
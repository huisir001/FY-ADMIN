<!--
 * @Description: 内容区
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:31:00
 * @LastEditTime: 2021-09-24 15:55:36
-->
<template>
    <div class="content">
        <router-view />
    </div>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Content',
    setup() {},
})
</script>
 
<style scoped lang="scss">
.content {
    // @include scrollBar;
    width: 100%;
    height: calc(100% - 40px);
    padding: 20px;
    overflow-y: auto;
    background: var(--color-content-bg);
    margin-top: 10px;
    border-radius: var(--el-border-radius-small);
}
</style>
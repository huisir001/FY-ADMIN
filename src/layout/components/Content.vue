<!--
 * @Description: 内容区
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:31:00
 * @LastEditTime: 2021-09-23 18:46:46
-->
<template>
    <div class="content">
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
    overflow-y: auto;
    background: var(--color-content-bg);
    margin-top: 10px;
}
</style>
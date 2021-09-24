<!--
 * @Description: 
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-10 18:50:20
 * @LastEditTime: 2021-09-24 15:46:56
-->
<template>
    <div class="tabbar"></div>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Tabbar',
    setup() {},
})
</script>
 
<style scoped lang="scss">
.tabbar {
    height: 30px;
    width: 100%;
    background: var(--color-tabbar-bg);
    border-radius: var(--el-border-radius-small);
}
</style>
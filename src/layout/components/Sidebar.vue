<!--
 * @Description: 侧边栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:28:59
 * @LastEditTime: 2021-09-09 19:10:51
-->
<template>
    <div class="sidebar">

    </div>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Sidebar',
    setup() {},
})
</script>
 
<style scoped lang="scss">
.sidebar {
    width: 250px;
    height: 100vh;
    overflow: hidden;
    background: var(--sidebar-bgcolor);
}
</style>

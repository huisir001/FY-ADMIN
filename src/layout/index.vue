<!--
 * @Description: 布局
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:20:13
 * @LastEditTime: 2021-09-09 18:28:11
-->
<template>
    <div class="layout">
        <Sidebar class="left" />
        <Navbar class="top" />
        <Content class="right" />
    </div>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import Content from './components/Content.vue'

export default defineComponent({
    name: '',
    components: {
        Sidebar,
        Navbar,
        Content,
    },
    setup() {},
})
</script>
 
<style scoped lang="scss">
.layout {
    background: var(--el-background-color-base);
}
</style>
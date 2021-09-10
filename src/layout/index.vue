<!--
 * @Description: 布局
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:20:13
 * @LastEditTime: 2021-09-10 19:16:59
-->
<template>
    <div class="layout">
        <div class="left">
            <Sidebar />
        </div>
        <div class="right">
            <Navbar />
            <div class="r-bot">
                <Tabbar />
                <Content />
            </div>
        </div>
    </div>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import Tabbar from './components/Tabbar.vue'
import Content from './components/Content.vue'

export default defineComponent({
    name: '',
    components: {
        Sidebar,
        Navbar,
        Tabbar,
        Content,
    },
    setup() {},
})
</script>
 
<style scoped lang="scss">
.layout {
    width: 100vw;
    height: 100vh;
    background: var(--el-background-color-base);
    overflow: hidden;
    display: flex;
    .left {
        width: 250px;
        height: 100%;
    }
    .right {
        width: calc(100vw - 250px);
        height: 100%;
        .r-bot {
            padding: 10px;
            height: calc(100% - 50px);
        }
    }
}
</style>
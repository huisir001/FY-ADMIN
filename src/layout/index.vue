<!--
 * @Description: 布局
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:20:13
 * @LastEditTime: 2021-09-15 14:26:45
-->
<template>
    <div class="layout" :class="{collapse:sidebarCollapse}">
        <Sidebar class="left" />
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
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
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
    setup() {
        const Store = useStore()
        // 折叠
        const sidebarCollapse = computed(() => Store.state.temp.sidebarCollapse)
        return {
            sidebarCollapse,
        }
    },
})
</script>
 
<style scoped lang="scss">
$--left-width-default: 250px;
$--left-width-collapse: 64px;
$--transition-width: width var(--el-transition-duration);
.layout {
    width: 100vw;
    height: 100vh;
    background: var(--el-background-color-base);
    overflow: hidden;
    display: flex;
    .left {
        transition: $--transition-width;
        width: $--left-width-default;
        height: 100%;
    }
    .right {
        transition: $--transition-width;
        width: calc(100vw - #{$--left-width-default});
        height: 100%;
        .r-bot {
            padding: 10px;
            height: calc(100% - 50px);
        }
    }
    &.collapse {
        .left {
            width: $--left-width-collapse;
        }
        .right {
            width: calc(100vw - #{$--left-width-collapse});
        }
    }
}
</style>
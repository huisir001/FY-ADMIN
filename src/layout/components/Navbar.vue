<!--
 * @Description: 导航栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:29:15
 * @LastEditTime: 2021-09-16 00:00:31
-->
<template>
    <div class="navbar">
        <div class="zui-nav-left">
            <div class="sidebar-collapse-btn" :class="{reverse:sidebarCollapse}"
                @click="sidebarCollapseChenge">
                <el-icon :size="22" color="var(--el-text-color-regular)">
                    <Fold />
                </el-icon>
            </div>
        </div>
        <div class="zui-nav-right"></div>
    </div>
</template>
 
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { Fold } from '@element-plus/icons'

export default defineComponent({
    name: 'Navbar',
    components: {
        Fold,
    },
    setup() {
        const Store = useStore()

        // 侧边栏状态
        const sidebarCollapse = computed(() => Store.state.temp.sidebarCollapse)

        // 侧边栏展开收缩
        const sidebarCollapseChenge = () => {
            Store.commit('temp/changeSidebarCollapse')
        }

        return {
            sidebarCollapse,
            sidebarCollapseChenge,
        }
    },
})
</script>
 
<style scoped lang="scss">
.navbar {
    width: 100%;
    height: 50px;
    background: var(--color-navbar-bg);
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    .zui-nav-left,
    .zui-nav-right {
        height: 100%;
        display: flex;
        align-items: center;
    }
    .sidebar-collapse-btn {
        padding: 9px;
        height: 40px;
        width: 40px;
        cursor: pointer;
        &.reverse {
            transform: rotate(180deg);
        }
    }
}
</style>
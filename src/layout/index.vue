<!--
 * @Description: 布局
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:20:13
 * @LastEditTime: 2021-10-26 14:00:45
-->
<template>
    <div class="layout" :class="{collapse:sidebarCollapse,sidebarHide}">
        <!-- 遮罩 -->
        <div v-if="sidebarHide && !sidebarCollapse" class="layout-mask"
            @click="sidebarCollapseChenge"></div>
        <!-- 侧边 -->
        <Sidebar class="left" />
        <!-- 右侧内容区 -->
        <div class="right">
            <Navbar />
            <Tabbar v-if="showTabbar" />
            <Content :class="{home:!showTabbar}" />
        </div>
    </div>
</template>
 
<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue'
import { useStore } from '@/store'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import Tabbar from './components/Tabbar.vue'
import Content from './components/Content.vue'
import useWinResize from '../hooks/useWinResize'
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

        // 执行监听窗口resize
        onMounted(() => {
            useWinResize()
        })

        // 历史路由数
        const showTabbar = computed(
            () => Store.state.sys.historyRoutes.length > 0 && Store.state.theme.showPageTagNav
        )

        // 侧边栏状态
        const sidebarCollapse = computed(() => Store.state.sys.sidebarCollapse)
        const sidebarHide = computed(() => Store.state.sys.sidebarHide)

        // 窗口宽度
        const visibleAreaWidth = computed(() => Store.state.sys.visibleAreaWidth)

        // 监听窗口宽度变化做些事
        watch(
            visibleAreaWidth,
            (val) => {
                // 宽度为1000时折叠侧边栏
                if (val && val <= 1000) {
                    Store.state.sys.sidebarCollapse ||
                        Store.commit('sys/setStates', { sidebarCollapse: true })
                }
                // 宽度为768是隐藏侧边栏
                if (val && val <= 768) {
                    Store.state.sys.sidebarHide ||
                        Store.commit('sys/setStates', { sidebarHide: true })
                } else {
                    Store.state.sys.sidebarHide &&
                        Store.commit('sys/setStates', { sidebarHide: false })
                }
            },
            { immediate: true }
        )

        // 侧边栏展开收缩
        const sidebarCollapseChenge = () => {
            Store.commit('sys/changeSidebarCollapse')
        }

        return {
            sidebarCollapse,
            sidebarHide,
            showTabbar,
            sidebarCollapseChenge,
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
    overflow: hidden;
    display: flex;
    .layout-mask {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.35);
        z-index: 5;
    }
    .left {
        transition: $--transition-width;
        width: $--left-width-default;
        height: 100%;
        overflow: hidden;
    }
    .right {
        transition: $--transition-width;
        width: calc(100% - #{$--left-width-default});
        height: 100%;
    }
    &.collapse:not(.sidebarHide) {
        .left {
            width: $--left-width-collapse;
        }
        .right {
            width: calc(100% - #{$--left-width-collapse});
        }
    }
    &.collapse.sidebarHide {
        .left {
            position: absolute;
            width: 0;
            z-index: 999;
            top: 0;
            left: 0;
            :deep(.logo-box) {
                visibility: hidden;
            }
        }
        .right {
            width: 100%;
        }
    }
    &.sidebarHide:not(.collapse) {
        .left {
            position: absolute;
            z-index: 999;
            top: 0;
            left: 0;
        }
        .right {
            width: 100%;
        }
    }
}
</style>
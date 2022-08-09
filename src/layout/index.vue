<!--
 * @Description: 布局
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:20:13
 * @LastEditTime: 2022-08-09 16:00:50
-->
<template>
    <div class="layout" :class="{collapse:sidebarCollapse,sidebarHide}">
        <!-- 遮罩 -->
        <div v-if="sidebarHide && !sidebarCollapse" class="layout-mask"
            @click="sidebarCollapseChenge"></div>
        <!-- 侧边 -->
        <Sidebar class="left" />
        <!-- 右侧 -->
        <div class="right">
            <!-- 右侧顶栏 -->
            <div class="right-top">
                <Navbar />
                <Tabbar v-if="showTabbar" />
            </div>
            <!-- 右侧内容区 -->
            <div class="right-bot" :class="{home:!showTabbar,frame:isFrame}">
                <PageView />
            </div>
        </div>
    </div>
</template>
 
<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useSysStore,useThemeStore } from '@/store'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import Tabbar from './components/Tabbar.vue'
import PageView from './components/PageView.vue'
import { useRoute } from 'vue-router'

const sysStore = useSysStore()
const themeStore = useThemeStore()

// 是否为框架
const isFrame = computed(() => useRoute().name === 'Frame')

// 历史路由数
const showTabbar = computed(
    () => sysStore.historyRoutes.length > 0 && themeStore.showPageTagNav
)

// 侧边栏状态
const sidebarCollapse = computed(() => sysStore.sidebarCollapse)
const sidebarHide = computed(() => sysStore.sidebarHide)

// 窗口宽度
const visibleAreaWidth = computed(() => sysStore.visibleAreaWidth)

// 监听窗口宽度变化做些事
watch(
    visibleAreaWidth,
    (val) => {
        // 宽度为1000时折叠侧边栏
        if (val && val <= 1000) {
            sysStore.sidebarCollapse || sysStore.$patch({ sidebarCollapse: true })
        }
        // 宽度为768是隐藏侧边栏
        if (val && val <= 768) {
            sysStore.sidebarHide || sysStore.$patch({ sidebarHide: true })
        } else {
            sysStore.sidebarHide && sysStore.$patch({ sidebarHide: false })
        }
    },
    { immediate: true }
)

// 侧边栏展开收缩
const sidebarCollapseChenge = () => {
    sysStore.changeSidebarCollapse()
}
</script>
 
<style scoped lang="scss">
@import '@/assets/styles/mixin.scss';
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
        z-index: 9998;
    }
    .left {
        transition: $--transition-width;
        width: $--left-width-default;
        height: 100%;
        overflow: hidden;
    }
    .right {
        position: relative;
        transition: $--transition-width;
        width: calc(100% - #{$--left-width-default});
        height: 100%;
        .right-top {
            transition: $--transition-width;
            position: fixed;
            width: calc(100% - #{$--left-width-default});
            top: 0;
            right: 0;
            z-index: 999;
        }
        .right-bot {
            @include scrollBar;
            position: absolute;
            overflow-y: auto;
            width: 100%;
            height: calc(100% - 101px);
            top: 91px;
            left: 0;
            &.frame {
                overflow: hidden;
                top: 81px;
                height: calc(100% - 81px);
                &.home {
                    top: 50px;
                    height: calc(100% - 50px);
                }
                :deep(.page-view) {
                    margin: 0;
                    width: 100%;
                    height: 100%;
                }
            }
            &.home {
                top: 60px;
                height: calc(100% - 70px);
            }
        }
    }
    &.collapse:not(.sidebarHide) {
        .left {
            width: $--left-width-collapse;
        }
        .right-top,
        .right {
            width: calc(100% - #{$--left-width-collapse});
        }
    }
    &.collapse.sidebarHide {
        .left {
            position: absolute;
            width: 0;
            z-index: 9999;
            top: 0;
            left: 0;
            :deep(.logo-box) {
                visibility: hidden;
            }
        }
        .right-top,
        .right {
            width: 100%;
        }
    }
    &.sidebarHide:not(.collapse) {
        .left {
            position: absolute;
            z-index: 9999;
            top: 0;
            left: 0;
        }
        .right-top,
        .right {
            width: 100%;
        }
    }
}
</style>
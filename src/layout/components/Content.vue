<!--
 * @Description: 内容区
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:31:00
 * @LastEditTime: 2021-11-26 11:49:49
-->
<template>
    <div class="content">
        <router-view v-slot="{ Component }">
            <!-- 由於vue3中不知如何銷毀被緩存的組件，所以這裏設置max最大緩存數，達到max時最先緩存的組件會被銷毀 -->
            <keep-alive :exclude="noCacheRouterNames" :max="10">
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>
 
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'Content',
    setup() {
        const Router = useRouter()
        // 不缓存路由
        const noCacheRouterNames = computed(() =>
            Router.getRoutes()
                .filter((item) => !item.meta.keepAlive && item.name)
                .map((item) => item.name)
        )

        return {
            noCacheRouterNames,
        }
    },
})
</script>
 
<style scoped lang="scss">
@import '@/assets/styles/mixin.scss';
.content {
    @include scrollBar;
    width: calc(100% - 20px);
    height: calc(100% - 100px);
    margin: 10px;
    padding: 20px;
    overflow-y: auto;
    background: var(--color-content-bg);
    border-radius: var(--el-border-radius-small);
    &.home {
        height: calc(100% - 70px);
    }
}
</style>
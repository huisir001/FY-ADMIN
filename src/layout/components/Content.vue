<!--
 * @Description: 内容区
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:31:00
 * @LastEditTime: 2021-10-26 14:04:32
-->
<template>
    <div class="content">
        <router-view v-slot="{ Component }">
            <keep-alive :exclude="noCacheRouterNames">
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
.content {
    // @include scrollBar;
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
<!--
 * @Description: 内容区
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:31:00
 * @LastEditTime: 2022-08-09 16:34:50
-->
<template>
    <div class="page-view" :class="{full:isFull}">
        <router-view v-slot="{ Component }">
            <!-- 由於vue3中不知如何銷毀被緩存的組件，所以這裏設置max最大緩存數，達到max時最先緩存的組件會被銷毀 -->
            <!-- 这里的include中的name注意是组件的name,而不是路由的name! -->
            <keep-alive :include="cacheRouterNames" :max="10">
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<script lang="ts">
export default {
    name: 'PageView',
}
</script>
 
<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSysStore } from '@/store'

const Router = useRouter()
const sysStore = useSysStore()

const isFull = computed(
    () => (useRoute().matched[useRoute().matched.length - 1].components.default as any).isFull
)

// 历史路由name
const historyRoutesName = computed(() => sysStore.historyRoutes.map((item) => item.name))

// 这里的include中的name注意是组件的name,而不是路由的name
// 这里特别注意：匿名组件不能被匹配，所以需要缓存的组件必须有name属性
// 若使用<script setup>单文件组件，则需要另外的<script>中导出组件name，否则无法被缓存
const cacheRouterNames = computed(() =>
    Router.getRoutes()
        .filter(
            (item) => item.meta.keepAlive && historyRoutesName.value.includes(item.name as string)
        )
        .map((item) => {
            const compName = item.components.default.name
            if (!compName) {
                console.error(`路由为${item.path}的组件未配置组件name，无法进行缓存。`)
            }
            return compName
        })
)
</script>
 
<style scoped lang="scss">
@import '@/assets/styles/mixin.scss';
.page-view {
    width: calc(100% - 20px);
    margin: 0 10px;
    &.full {
        @include scrollBar;
        height: 100%;
        padding: 15px;
        overflow-y: auto;
        background: var(--el-color-white);
        border-radius: var(--el-border-radius-small);
    }
}
</style>
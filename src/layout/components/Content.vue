<!--
 * @Description: 内容区
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:31:00
 * @LastEditTime: 2021-12-14 16:26:00
-->
<template>
    <div class="content">
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
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
    name: 'Content',
    setup() {
        const Router = useRouter()
        const Store = useStore()

        // 历史路由name
        const historyRoutesName = computed(()=> Store.state.sys.historyRoutes.map((item) => item.name))

        // 这里的include中的name注意是组件的name,而不是路由的name
        const cacheRouterNames = computed(() => 
            Router.getRoutes().filter((item) => item.meta.keepAlive
                && historyRoutesName.value.includes(item.name as string)
                && item.components.default.name
            ).map((item) => item.components.default.name)
        )

        return {
            cacheRouterNames,
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
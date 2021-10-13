<!--
 * @Description: 
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-13 14:19:44
 * @LastEditTime: 2021-10-13 15:37:41
-->
<template>
    <router-view v-slot="{ Component }">
        <keep-alive :exclude="noCacheRouterNames">
            <component :is="Component" />
        </keep-alive>
    </router-view>
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
                .filter((item) => item.meta.noCache)
                .map((item) => item.name)
        )

        return {
            noCacheRouterNames,
        }
    },
})
</script>
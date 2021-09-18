<!--
 * @Description: 入口模板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-09-13 17:20:52
-->
<template>
    <router-view />
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
    name: 'App',
    setup() {
        // 初始化主题色
        const store = useStore()
        store.commit('theme/setStates', {
            color: store.state.theme.color,
        })
    },
})
</script>

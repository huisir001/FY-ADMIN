<!--
 * @Description: 入口模板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-11-05 11:40:25
-->
<template>
    <router-view />
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import useWinResize from '@/hooks/public/useWinResize'

export default defineComponent({
    name: 'App',
    setup() {
        // 初始化主题色
        const store = useStore()
        store.commit('theme/setStates', {
            color: store.state.theme.color,
        })
        // 执行监听窗口resize
        useWinResize()
    },
})
</script>

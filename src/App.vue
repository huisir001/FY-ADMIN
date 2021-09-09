<!--
 * @Description: 入口模板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-09-09 19:02:44
-->
<template>
    <router-view />
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
const { ThemeColorList } = require('@/settings/system')

export default defineComponent({
    name: '',
    setup() {
        const store = useStore()
        store.commit('theme/setStates', {
            color: ThemeColorList.find((item: any) => item.default).name,
        })
    },
})
</script>

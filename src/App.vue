<!--
 * @Description: 入口模板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-12-27 10:41:14
-->
<template>
    <router-view />
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'
import init from '@/init'

export default defineComponent({
    name: 'App',
    mixins: [init],
})
</script>

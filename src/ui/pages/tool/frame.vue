<!--
 * @Description: 框架-内嵌页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-29 15:11:35
 * @LastEditTime: 2022-08-09 16:51:08
-->
<template>
    <iframe name="iframe" :src="src" frameborder="0" width="100%" height="100%" seamless></iframe>
</template>

<script lang="ts">
export default { name: 'Frame' }
</script>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store'

// 查询菜单参数
const { src } = useUserStore().menus.find(
    (item) => item.id === useRoute().params.id
) as IMenu
</script>
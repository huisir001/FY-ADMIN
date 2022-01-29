<!--
 * @Description: 框架-内嵌页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-29 15:11:35
 * @LastEditTime: 2022-01-29 16:57:34
-->
<template>
    <iframe name="iframe" id="frame" :src="$route.meta.src" frameborder="0" width="100%"
        height="100%" seamless></iframe>
</template>

<script lang="ts">
export default {
    name: 'Frame',
    isFrame: true,
}
</script>
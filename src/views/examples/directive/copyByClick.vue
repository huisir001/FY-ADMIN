<!--
 * @Description: 左键点击复制内容到剪贴板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-03-02 11:33:02
 * @LastEditTime: 2022-03-02 16:52:57
-->
<template>
    <el-input type="textarea" v-model="inputVal" />
    <el-button style="margin-top:10px;" type="primary" v-copy="inputVal">点击复制</el-button>
</template>

<script lang="ts">
export default {
    name: 'copyByClick',
    isFull: true,
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const inputVal = ref(
    'FY-ADMIN是基于Element-Plus+Vue3+Ts开发的一套企业级中后台系统，内置权限管理功能、多种组件及配置功能，适用于各种中后台系统，你可以将它应用在任何需要服务端管理的应用。'
)
</script>

<style scoped lang="scss">
</style>
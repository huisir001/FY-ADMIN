<!--
 * @Description: 右键菜单
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-03-02 11:31:03
 * @LastEditTime: 2022-03-02 16:53:27
-->
<template>
    <el-button type="primary" v-contextMenu="ctxMenuList">右键点击测试</el-button>
</template>

<script lang="ts">
export default {
    name: 'contextMenu',
    isFull: true,
}
</script>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
// 右键菜单-关闭标签
const ctxMenuList: IBtnOptions[] = [
    {
        name: '菜单一',
        callback(el) {
            ElMessage('您点击了菜单一')
            console.log(el)
        },
    },
    {
        name: '菜单二',
        callback(el) {
            ElMessage('您点击了菜单二')
            console.log(el)
        },
    },
    {
        name: '菜单三',
        callback(el) {
            ElMessage('您点击了菜单三')
            console.log(el)
        },
    },
]
</script>
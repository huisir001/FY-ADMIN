<!--
 * @Description: 内嵌404
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-15 11:23:25
 * @LastEditTime: 2022-04-15 11:24:29
-->
<template>
    <div class="exception flex-row flex-align-center flex-justify-center">
        <Icon404 class="pic" />
        <div class="cont">
            <div class="title">404</div>
            <div class="desc">抱歉，你访问的页面不存在</div>
            <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'E404',
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>

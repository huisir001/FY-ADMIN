<!--
 * @Description: 内嵌500
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-15 11:24:41
 * @LastEditTime: 2022-04-15 11:25:55
-->
<template>
    <div class="exception flex-row flex-align-center flex-justify-center">
        <Icon500 class="pic" />
        <div class="cont">
            <div class="title">500</div>
            <div class="desc">抱歉，服务器出错了</div>
            <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'E500',
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>

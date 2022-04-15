<!--
 * @Description: 内嵌403
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-15 10:19:58
 * @LastEditTime: 2022-04-15 11:22:49
-->
<template>
    <div class="exception flex-row flex-align-center flex-justify-center">
        <Icon403 class="pic" />
        <div class="cont">
            <div class="title">403</div>
            <div class="desc">抱歉，你无权访问该页面</div>
            <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'E403',
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>

<!--
 * @Description: 404页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-25 15:58:06
 * @LastEditTime: 2021-10-25 16:17:31
-->
<template>
    <div class="not-found">
        <h1>404 - Not Found</h1>
        <div class="return" @click="$router.go(-1)">返回上一页</div>
    </div>
</template>
 
<style scoped lang="scss">
.not-found {
    width: 80%;
    margin: 0 auto;
    background: #fff;
    text-align: center;
    padding: 50px 30px;
    margin-top: 12vh;
    .return {
        margin-top: 15px;
        color: var(--color-blue);
        text-decoration: underline;
        cursor: pointer;
        &:hover {
            color: var(--color-blue-light);
        }
    }
}
</style>
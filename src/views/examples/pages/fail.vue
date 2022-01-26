<!--
 * @Description: 失败页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-27 16:30:44
 * @LastEditTime: 2022-01-27 03:42:05
-->
<template>
    <el-card style="border:0;" shadow="never">
        <el-result icon="error" title="提交失败" sub-title="请核对并修改以下信息后，再重新提交。">
            <template #extra>
                <div class="result-cont">
                    <div style="font-weight:700;margin-bottom:10px;">您提交的内容有如下错误：</div>
                    <ul>
                        <li class="flex-row">
                            <span>您的账户已被冻结　</span>
                            <el-link type="primary">立即解冻 ></el-link>
                        </li>
                        <li class="flex-row">
                            <span>您的账户还不具备申请资格　</span>
                            <el-link type="primary">立即升级 ></el-link>
                        </li>
                    </ul>
                </div>
                <el-button type="primary">返回修改</el-button>
            </template>
        </el-result>
    </el-card>
</template>

<script lang="ts">
export default {
    name: 'fail',
}
</script>

<style scoped lang="scss">
:deep(.el-result__extra) {
    width: 100%;
}
.result-cont {
    padding: 24px 40px;
    text-align: left;
    background: #f8f8f9;
    border-radius: 4px;
    margin-bottom: 30px;
}
</style>
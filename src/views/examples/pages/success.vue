<!--
 * @Description: 成功页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-27 16:30:36
 * @LastEditTime: 2022-01-27 17:17:01
-->
<template>
    <el-card style="border:0;" shadow="never">
        <el-result icon="success" title="提交成功"
            sub-title="提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用 Message 全局提示反馈即可。灰色区域可以显示一些补充的信息。">
            <template #extra>
                <div class="result-cont">
                    <p>已提交申请，等待部门审核。</p>
                </div>
                <el-button type="primary">返回列表</el-button>
                <el-button>查看项目</el-button>
                <el-button>打印</el-button>
            </template>
        </el-result>
    </el-card>
</template>

<script lang="ts">
export default {
    name: 'success',
}
</script>

<script lang="ts" setup>
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
<!--
 * @Description: 步骤3
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-13 14:16:23
 * @LastEditTime: 2022-04-13 14:30:06
-->
<template>
    <el-result icon="success" title="操作成功" sub-title="预计两小时内到账">
        <template #extra>
            <div class="result-cont">
                <div class="li">
                    <span class="label">付款账户：</span>
                    <span class="val">{{info.payAccount}}</span>
                </div>
                <div class="li">
                    <span class="label">收款账户：</span>
                    <span class="val">{{info.collAccount}}</span>
                </div>
                <div class="li">
                    <span class="label">收款人姓名：</span>
                    <span class="val">{{info.collName}}</span>
                </div>
                <div class="li">
                    <span class="label">转账金额：</span>
                    <span class="val">{{info.amount}}</span>
                </div>
            </div>
            <el-button type="primary" @click="$emit('reset')">再转一笔</el-button>
            <el-button>查看账单</el-button>
        </template>
    </el-result>
</template>

<script lang="ts">
export default {
    name: 'step3',
}
</script>

<script lang="ts" setup>
defineProps({
    info: {
        type: Object,
        default: () => ({}),
    },
})
defineEmits(['reset'])
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
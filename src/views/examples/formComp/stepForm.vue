<!--
 * @Description: 分步表单
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-13 10:16:37
 * @LastEditTime: 2022-04-13 14:23:27
-->
<template>
    <div class="step-form">
        <el-steps :active="active" finish-status="success">
            <el-step title="填写转账信息" />
            <el-step title="确认转账信息" />
            <el-step title="完成" />
        </el-steps>
        <div class="content">
            <el-alert v-if="active==1" title="确认转账后，资金将直接打入对方账户，无法退回。" type="warning" show-icon />
            <step1 v-if="active==0" @next="next" />
            <step2 v-if="active==1" :info="transferInfo" @next="next" @prev="prev" />
            <step3 v-if="active==2" :info="transferInfo" @reset="active=0" />
        </div>
        <div class="btns">
            <!-- <el-button type="primary" @click="next">下一步</el-button>
            <el-button @click="prev">上一步</el-button> -->
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'StepForm',
    isFull: true,
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import step1 from './component/step1.vue'
import step2 from './component/step2.vue'
import step3 from './component/step3.vue'

const active = ref(0)

const transferInfo = ref({})

const next = (info: any) => {
    if (active.value++ > 2) active.value = 0

    transferInfo.value = info || {}
}

const prev = () => {
    active.value--
}
</script>

<style scoped lang="scss">
.step-form {
    max-width: 800px;
    margin: 20px auto;
    &:deep(.el-step) {
        .el-step__line {
            margin: 0 10px 0 33px;
        }
        .el-step__head {
            &.is-process {
                color: #fff;
                border-color: var(--el-color-primary);
                .el-step__icon {
                    background: var(--el-color-primary);
                }
            }
            &.is-success {
                .el-step__line {
                    background-color: var(--el-color-primary);
                }
            }
            &.is-success {
                color: var(--el-color-primary);
                border-color: var(--el-color-primary);
            }
        }
        .el-step__title.is-success {
            color: var(--el-color-primary);
        }
    }
    .content {
        margin-top: 20px;
        &:deep(.el-alert) {
            margin-bottom: 20px;
        }
    }
    .btns {
        text-align: center;
    }
}
</style>
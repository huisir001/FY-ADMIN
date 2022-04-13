<!--
 * @Description: 步骤2
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-13 10:47:16
 * @LastEditTime: 2022-04-13 14:32:10
-->
<template>
    <div class="sure-info">
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
    <hr style="margin-bottom:15px;">
    <el-form ref="formRef" :model="formdata" :rules="rules" label-width="100px">
        <el-form-item label="支付密码" prop="paymentPin">
            <el-input v-model="formdata.paymentPin" type="password" placeholder="请输入支付密码"
                clearable />
        </el-form-item>
        <el-form-item>
            <el-button @click="$emit('prev')">上一步</el-button>
            <el-button type="primary" @click="confirm" :loading="loading">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
export default {
    name: 'step2',
}
</script>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const emit = defineEmits(['prev', 'next'])

const loading = ref(false)

const props = defineProps({
    info: {
        type: Object,
        default: () => ({}),
    },
})

const formdata = reactive({
    paymentPin: '',
})

const rules = reactive({
    paymentPin: [
        {
            required: true,
            message: '请输入支付密码',
            trigger: 'blur',
        },
    ],
})

const confirm = () => {
    if (!formRef.value) return
    ;(<any>formRef.value).validate((valid: any) => {
        if (valid) {
            const data = {
                ...props.info,
                ...formdata,
            }
            loading.value = true
            setTimeout(() => {
                loading.value = false
                emit('next', props.info)
            }, 1000)
        } else {
            return false
        }
    })
}
</script>

<style scoped lang="scss">
.sure-info {
    .li {
        margin-bottom: 15px;
        .label {
            width: 90px;
            display: inline-block;
            text-align: right;
        }
    }
}
</style>
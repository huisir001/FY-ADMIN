<!--
 * @Description: 步骤一
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-13 10:47:16
 * @LastEditTime: 2022-04-13 14:05:06
-->
<template>
    <el-form ref="formRef" :model="transferInfo" :rules="rules" label-width="100px">
        <el-form-item label="付款账户" prop="payAccount">
            <el-input v-model="transferInfo.payAccount" placeholder="请输入付款账户" />
        </el-form-item>
        <el-form-item label="收款账户" prop="collAccount">
            <el-input v-model="transferInfo.collAccount" placeholder="请输入收款账户">
                <template #prepend>
                    <el-select v-model="transferInfo.way" placeholder="Select" style="width: 90px">
                        <el-option label="支付宝" value="1" />
                        <el-option label="微信" value="2" />
                    </el-select>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item label="收款人姓名" prop="collName">
            <el-input v-model="transferInfo.collName" placeholder="请输入收款人姓名" />
        </el-form-item>
        <el-form-item label="转账金额" prop="amount">
            <el-input v-model.number="transferInfo.amount" type="number" placeholder="请输入金额">
                <template #prepend>￥</template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="next">下一步</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
export default {
    name: 'step1',
}
</script>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const emit = defineEmits(['next'])

const transferInfo = reactive({
    payAccount: '',
    collAccount: '',
    collName: '',
    amount: '',
    way: '1',
})

const rules = reactive({
    payAccount: [
        {
            required: true,
            message: '请输入付款账户',
            trigger: 'blur',
        },
    ],
    collAccount: [
        {
            required: true,
            message: '请输入收款账户',
            trigger: 'blur',
        },
    ],
    collName: [
        {
            required: true,
            message: '请输入收款人姓名',
            trigger: 'blur',
        },
    ],
    amount: [
        {
            required: true,
            message: '请输入付款金额',
            trigger: 'blur',
        },
        {
            type: 'number',
            min: 1,
            message: '金额为正整数',
            trigger: 'blur',
        },
    ],
    way: '1',
})

const next = () => {
    if (!formRef.value) return
    ;(<any>formRef.value).validate((valid: any) => {
        if (valid) {
            emit('next', transferInfo)
        } else {
            return false
        }
    })
}
</script>

<style scoped lang="scss">
</style>
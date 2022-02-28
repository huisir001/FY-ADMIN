<!--
 * @Description: 服务器监控
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-17 17:01:24
 * @LastEditTime: 2022-02-28 18:03:41
-->
<template>
    <el-row :gutter="10">
        <el-col :sm="12" :xs="24">
            <fy-card :type="2" title="CPU">
                <el-descriptions :column="2" v-loading="loading">
                    <el-descriptions-item v-for="item in cpuOptions" :key="item.key"
                        :label="item.label">
                        {{item.formatter?item.formatter(cpuInfo):cpuInfo[item.key]}}
                    </el-descriptions-item>
                </el-descriptions>
            </fy-card>
        </el-col>
        <el-col :sm="12" :xs="24">
            <fy-card :type="2" title="内存">
                <el-descriptions :column="2" v-loading="loading">
                    <el-descriptions-item v-for="item in memOptions" :key="item.key"
                        :label="item.label">
                        {{item.formatter?item.formatter(memInfo):memInfo[item.key]}}
                    </el-descriptions-item>
                </el-descriptions>
            </fy-card>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="24">
            <fy-card :type="2" title="服务器信息">
                <el-descriptions :column="2" v-loading="loading">
                    <el-descriptions-item v-for="item in sysOptions" :key="item.key"
                        :label="item.label">
                        {{item.formatter?item.formatter(sysInfo):sysInfo[item.key]}}
                    </el-descriptions-item>
                </el-descriptions>
            </fy-card>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="24">
            <fy-card :type="2" title="磁盘信息">
                <fy-table :loading="loading" :cols="diskOptions" :data="diskInfo" :border="false">
                </fy-table>
            </fy-card>
        </el-col>
    </el-row>
</template>

<script lang="ts">
export default {
    name: 'Server',
}
</script>

<script lang="ts" setup>
import { getServerInfo } from '@/api/monitor'
import useServerOptions from './hooks/useServerOptions'
import { ref } from 'vue'

// loading
const loading = ref(false)
// 用户列表数据
const cpuInfo = ref({})
const memInfo = ref({})
const sysInfo = ref({})
const diskInfo = ref([])
// 详情配置
const { cpuOptions, memOptions, sysOptions, diskOptions } = useServerOptions()

// 请求服务器信息
const getData = (function getData() {
    loading.value = true
    getServerInfo().then((res: any) => {
        const { ok, data } = res
        if (ok) {
            cpuInfo.value = data.cpu
            diskInfo.value = data.disk
            memInfo.value = data.mem
            sysInfo.value = data.sys
        }
        loading.value = false
    })
    return getData
})()
</script>

<style scoped lang="scss">
.el-col {
    margin-bottom: 10px;
}
</style>
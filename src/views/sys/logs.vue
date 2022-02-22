<!--
 * @Description: 日志管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2022-02-22 15:06:50
-->
<template>
    <fy-table :loading="loading" :cols="tableCols" :data="tableData" page :curr="currPage"
        :total="total" :tools="tableTools" height="calc(100% - 48px)" @toolsClick="toolsBtnClick"
        @pageSizeChange="pageSizeChange" @pageCurrChange="pageCurrChange">
        <template #search>
            <fy-search-form v-model="searchParams" :options="searchOptions" @submit="handleSearch"
                @reset="handleReset" />
        </template>
        <template #todo="scope">
            <fy-row-btns :contains="['del']" @todo="handleTodo($event,scope.$index,scope.row)" />
        </template>
    </fy-table>
</template>

<script lang="ts">
export default { name: 'Logs', isFull: true }
</script>
 
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { TOptionOfTools } from '@/ui/fy/types'
import useLogsOptions from './hooks/useLogsOptions'
import { getLogsByPage, delLogs } from '@/api/sys'
import { ElMessage } from 'element-plus'

// 表格配置
const { searchOptions, tableCols, tableTools } = useLogsOptions()
// loading
const loading = ref(false)
// 用户列表数据
const tableData = ref([])
// 当前页
const currPage = ref(1)
// 每页条数
const limit = ref(15)
// 总条数
const total = ref(0)
// 搜索表单数据
const searchParams: ILog = reactive({
    userId: '',
    username: '',
    ip: '',
    dateRange: '',
})

// 请求日志列表
const getLogs = (function getLogs() {
    loading.value = true
    getLogsByPage({ page: currPage.value, limit: limit.value, search: searchParams }).then(
        (res) => {
            const { ok, data } = res
            if (ok) {
                tableData.value = data.list
                total.value = data.total
            }
            loading.value = false
        }
    )
    return getLogs
})()

// 当前页切换
const pageCurrChange = (val: number) => {
    currPage.value = val
    getLogs()
}

// 每页条数切换
const pageSizeChange = (val: number) => {
    limit.value = val
    getLogs()
}

// 搜索
const handleSearch = () => {
    getLogs()
}

// 重置
const handleReset = () => {
    for (const key in searchParams) {
        searchParams[key] = ''
    }
    currPage.value = 1
    getLogs()
}

// 表格工具栏点选
const toolsBtnClick = async (btn: TOptionOfTools, flag: any) => {
    // 刷新、搜索隐藏
    if (btn === 'refresh' || (btn === 'search' && !flag)) {
        handleReset()
    }
    // 删除选定行
    if (btn === 'delete') {
        const { ok, msg } = await delLogs(flag.map((item: { id: string }) => item.id).join(','))
        if (ok) {
            ElMessage.success(msg)
            getLogs()
        }
    }
}

// 行按钮
const handleTodo = async (btn: string, index: number, row: IObj) => {
    switch (btn) {
        // 删除按钮
        case 'del':
            const { ok, msg } = await delLogs(row.id)
            if (ok) {
                ElMessage.success(msg)
                getLogs()
            }
            break
    }
}
</script>
 
<style scoped lang="scss">
.sort-btn {
    position: absolute;
    right: 10px;
    top: 0;
    height: 100%;
    display: inline-flex;
    align-items: center;
}
</style>
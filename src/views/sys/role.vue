<!--
 * @Description: 角色管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2022-01-17 16:20:30
-->
<template>
    <fy-container>
        <fy-table :loading="loading" :cols="tableCols" :data="searchData" :tools="tableTools"
            height="calc(100% - 48px)" @toolsClick="toolsBtnClick">
            <template #status="scope">
                <el-tag v-if="scope.row.status==1" size="small">正常</el-tag>
                <el-tag v-else size="small" type="danger">停用</el-tag>
            </template>
            <template #todoHead>
                <!-- 不分页情况下可以使用本地模糊搜索 -->
                <fy-fuzzy-search v-model="searchData" :data="tableData" />
            </template>
            <template #todo="scope">
                <fy-row-btns :contains="['edit', 'del']"
                    @todo="handleTodo($event,scope.$index,scope.row)" />
            </template>
        </fy-table>
        <!-- 编辑弹窗 -->
        <fy-edit-dialog v-model="showEditDialog" :params="currEditData" :title="editDialogTitle"
            :options="editOptions" top="15%" @submit="bindEditSubmit">
        </fy-edit-dialog>
    </fy-container>
</template>

<script lang="ts">
export default { name: 'Role' }
</script>
 
<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { getAllRole, saveRole, delRole } from '@/api/sys'
import useRoleOptions from './hooks/useRoleOptions'
import { TOptionOfTools } from '@/ui/fy/types'
import { ElMessage } from 'element-plus'

// 模糊搜索
const searchData: Ref<any> = ref([])
// 编辑弹窗显隐
const showEditDialog = ref(false)
// 编辑弹窗标题
const editDialogTitle = ref('编辑角色')
// 当前编辑数据
const currEditData: Ref<IObj> = ref({})
// 表格數據
const tableData: Ref<any> = ref([])
// loading
const loading = ref(false)

// 请求角色列表
const getRoleList = (function getRole() {
    loading.value = true
    getAllRole().then((res) => {
        const { ok, data } = res
        if (ok) {
            tableData.value = data
        }
        loading.value = false
    })
    return getRole
})()

// 表单配置项
const { tableCols, tableTools, editOptions } = useRoleOptions()

// 行按钮
const handleTodo = async (btn: string, index: number, row: IObj) => {
    switch (btn) {
        // 编辑按钮
        case 'edit':
            currEditData.value = row
            showEditDialog.value = true
            break
        // 删除按钮
        case 'del':
            const { ok, msg } = await delRole(row.id)
            if (ok) {
                ElMessage.success(msg)
                getRoleList()
            }
            break
    }
}

// 工具栏点击
const toolsBtnClick = (btn: TOptionOfTools) => {
    // 刷新、搜索隐藏
    if (btn === 'refresh') {
        getRoleList()
    }
    if (btn === 'add') {
        currEditData.value = {}
        showEditDialog.value = true
    }
}

// 编辑确认
const bindEditSubmit = async (val: any) => {
    const { ok, msg } = await saveRole(val)
    if (ok) {
        ElMessage.success(msg)
        getRoleList()
    }
}
</script>
 
<style scoped lang="scss">
</style>
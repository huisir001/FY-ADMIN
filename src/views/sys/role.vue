<!--
 * @Description: 角色管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2021-12-23 13:48:39
-->
<template>
    <fy-table :loading="loading" :cols="tableCols" :data="fuzzySearch(tableData,fuzzySearchWord)"
        :tools="tableTools" height="calc(100% - 45px)" @toolsClick="toolsBtnClick">
        <template #status="scope">
            <el-tag v-if="scope.row.status==1" size="small">正常</el-tag>
            <el-tag v-else size="small" type="danger">停用</el-tag>
        </template>
        <template #todoHead>
            <!-- 不分页情况下可以使用本地模糊搜索 -->
            <el-input v-model="fuzzySearchWord" size="mini" clearable placeholder="输入关键字搜索..." />
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
</template>
 
<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { getAllRole } from '@/api/sys'
import { fuzzySearch } from '@/utils/common'
import useRoleOptions from './hooks/useRoleOptions'
import { TOptionOfTools } from '@/ui/fy/types'

export default defineComponent({
    name: 'Role',
    setup() {
        // 模糊搜索
        const fuzzySearchWord: Ref<string> = ref('')
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

        // 请求部門列表
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
        const handleTodo = (btn: string, index: number, row: IObj) => {
            switch (btn) {
                // 编辑按钮
                case 'edit':
                    currEditData.value = row
                    showEditDialog.value = true
                    break
                // 删除按钮
                case 'del':
                    console.log('删除：', row)
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
        const bindEditSubmit = (val: any) => {
            console.log(val)
        }

        return {
            loading,
            fuzzySearch,
            fuzzySearchWord,
            showEditDialog,
            editDialogTitle,
            tableData,
            currEditData,
            tableCols,
            tableTools,
            editOptions,
            handleTodo,
            toolsBtnClick,
            bindEditSubmit,
        }
    },
})
</script>
 
<style scoped lang="scss">
</style>
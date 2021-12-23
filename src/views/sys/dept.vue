<!--
 * @Description: 部门管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2021-12-23 10:29:37
-->
<template>
    <fy-table :loading="loading" :cols="tableCols" :data="fuzzySearch(tableData,fuzzySearchWord)"
        row-key="id" :tools="tableTools" height="calc(100% - 45px)" @toolsClick="toolsBtnClick">
        <template #status="scope">
            <el-tag v-if="scope.row.status==1" size="small">正常</el-tag>
            <el-tag v-else size="small" type="danger">停用</el-tag>
        </template>
        <template #todoHead>
            <!-- 不分页情况下可以使用本地模糊搜索 -->
            <el-input v-model="fuzzySearchWord" size="mini" clearable placeholder="输入关键字搜索..." />
        </template>
        <template #todo="scope">
            <fy-row-btns @todo="handleTodo($event,scope.$index,scope.row)" />
        </template>
    </fy-table>
    <!-- 编辑弹窗 -->
    <fy-edit-dialog v-model="showEditDialog" :params="currEditData" :title="editDialogTitle"
        :options="editOptions" top="15%" @submit="bindEditSubmit">
        <template #parent="editParams">
            <el-select v-model="editParams.val.parentId" filterable>
                <el-option label="无" :value="null" />
                <el-option v-for="item in tableParentOptions" :key="item.value" :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </template>
    </fy-edit-dialog>
</template>
 
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { fuzzySearch, pidList2SelectOptions, rawList2Tree } from '@/utils/common'
import { TOptionOfTools } from '@/ui/fy/types'
import { getAllDept } from '@/api/sys'
import useDeptOptions from './hooks/useDeptOptions'

export default defineComponent({
    name: 'Dept',
    setup() {
        // 模糊搜索
        const fuzzySearchWord: Ref<string> = ref('')
        // 编辑弹窗显隐
        const showEditDialog = ref(false)
        // 编辑弹窗标题
        const editDialogTitle = ref('编辑部门')
        // 当前编辑数据
        const currEditData:Ref<IObj> = ref({})
        // 表格树形數據
        const tableData: Ref<any> = ref([])
        // 父级部门选择
        const tableParentOptions: Ref<any> = ref([])
        // loading
        const loading = ref(false)

        // 请求部門列表
        const getDeptList = (function getDept() {
            loading.value = true
            getAllDept().then((res) => {
                const { ok, data } = res
                if (ok) {
                    tableParentOptions.value = pidList2SelectOptions(data, 'name', 'id')
                    tableData.value = rawList2Tree(data) //2tree
                }
                loading.value = false
            })
            return getDept
        })()

        // 表单配置项
        const { tableCols, tableTools, editOptions } = useDeptOptions()

        // 工具栏点击
        const toolsBtnClick = (btn: TOptionOfTools) => {
            // 刷新、搜索隐藏
            if (btn === 'refresh') {
                getDeptList()
            }
            if(btn==='add'){
                currEditData.value = {}
                showEditDialog.value = true
            }
        }

        // 行按钮
        const handleTodo = (btn: string, index: number, row: IObj) => {
            switch (btn) {
                // 编辑按钮
                case 'edit':
                    currEditData.value = row
                    showEditDialog.value = true
                    break
                // 新增按钮
                case 'add':
                    currEditData.value = {
                        parentId:row.id
                    }
                    showEditDialog.value = true
                    break
                // 删除按钮
                case 'del':
                    console.log('删除：', row)
                    break
            }
        }

        const editParentProps = {
            checkStrictly: true,
            value: 'id',
            label: 'name',
        }

        const bindEditSubmit = (val: any) => {
            console.log(val)
        }

        return {
            loading,
            tableData,
            tableParentOptions,
            tableCols,
            tableTools,
            toolsBtnClick,
            fuzzySearchWord,
            fuzzySearch,
            handleTodo,
            editDialogTitle,
            showEditDialog,
            currEditData,
            editOptions,
            editParentProps,
            bindEditSubmit,
            closed
        }
    },
})
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
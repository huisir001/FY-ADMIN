<!--
 * @Description: 部门管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2022-01-19 10:49:29
-->
<template>
    <fy-table :loading="loading" :cols="tableCols" :data="searchData" row-key="id"
        :tools="tableTools" height="calc(100% - 48px)" @toolsClick="toolsBtnClick"
        @filter-change="filterChange">
        <template #status="scope">
            <el-tag v-if="scope.row.status==1" size="small">正常</el-tag>
            <el-tag v-else size="small" type="danger">停用</el-tag>
        </template>
        <template #todoHead>
            <!-- 不分页情况下可以使用本地模糊搜索 -->
            <fy-fuzzy-search v-model="searchData" :data="tableData" />
        </template>
        <template #todo="scope">
            <fy-row-btns @todo="handleTodo($event,scope.$index,scope.row)" />
        </template>
    </fy-table>
    <!-- 编辑弹窗 -->
    <fy-edit-dialog v-model="showEditDialog" :params="currEditData" :title="editDialogTitle"
        :options="editOptions" top="15%" @submit="bindEditSubmit">
        <template #parent="editParams">
            <fy-tree-select v-model="editParams.val.parentId"
                :label="treeSelectLabel(editParams.val.parentId)" :data="treeSlectData"
                :option="{children:'children',label:'name'}" />
        </template>
    </fy-edit-dialog>
</template>

<script lang="ts">
export default { name: 'Dept', fullCont: true }
</script>
 
<script lang="ts" setup>
import { computed, Ref, ref } from 'vue'
import { rawList2Tree } from '@/utils/common'
import { TOptionOfTools } from '@/ui/fy/types'
import { getAllDept, saveDept, delDept } from '@/api/sys'
import useDeptOptions from './hooks/useDeptOptions'
import { ElMessage } from 'element-plus'

// 编辑弹窗显隐
const showEditDialog = ref(false)
// 编辑弹窗标题
const editDialogTitle = ref('编辑部门')
// 当前编辑数据
const currEditData: Ref<IObj> = ref({})
// 表格原始数据
const tableRawData: Ref<any> = ref([])
// 表格树形數據
const tableData: Ref<any> = ref([])
// 模糊搜索结果
const searchData: Ref<any> = ref([])
// loading
const loading = ref(false)

// 请求部門列表
const getDeptList = (function getDept() {
    loading.value = true
    getAllDept().then((res) => {
        const { ok, data } = res
        if (ok) {
            tableRawData.value = data
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
    if (btn === 'add') {
        currEditData.value = {}
        showEditDialog.value = true
    }
}

// 表头筛选
const filterChange = ({ status }: any) => {
    const filtersData = tableRawData.value.filter((item: any) =>
        status.length ? status.includes(item.status) : true
    )
    tableData.value = rawList2Tree(filtersData)
}

// 行按钮
const handleTodo = async (btn: string, index: number, row: IObj) => {
    switch (btn) {
        // 编辑按钮
        case 'edit':
            currEditData.value = row
            showEditDialog.value = true
            break
        // 新增按钮
        case 'add':
            currEditData.value = {
                parentId: row.id,
            }
            showEditDialog.value = true
            break
        // 删除按钮
        case 'del':
            const { ok, msg } = await delDept(row.id)
            if (ok) {
                ElMessage.success(msg)
                getDeptList()
            }
            break
    }
}

// 上级部门树结构选择数据
const treeSlectData = computed(() => {
    return [
        {
            id: null,
            name: '主类目',
            children: tableData.value,
        },
    ]
})

// 树结构选中项名称
const treeSelectLabel = (id: any) => {
    const selectData = tableRawData.value.find((item: any) => item.id === id)
    return selectData ? selectData.name : '主类目'
}

// 編輯确认
const bindEditSubmit = async (val: any) => {
    const { ok, msg } = await saveDept(val)
    if (ok) {
        ElMessage.success(msg)
        getDeptList()
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
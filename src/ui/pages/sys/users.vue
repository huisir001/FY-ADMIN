<!--
 * @Description: 用户管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2022-02-28 14:12:03
-->
<template>
    <fy-table :loading="loading" :cols="tableCols" :data="tableData" page :curr="currPage"
        :total="total" :tools="tableTools" height="calc(100% - 48px)" @toolsClick="toolsBtnClick"
        @pageSizeChange="pageSizeChange" @pageCurrChange="pageCurrChange">
        <template #search>
            <fy-search-form v-model="searchParams" :options="searchOptions" @submit="handleSearch"
                @reset="handleReset" />
        </template>
        <template #role="scope">
            <el-tag v-for="role in scope.row.roleNames.split(',')" :key="role" size="small"
                type="warning" effect="plain" class="mr-5">
                {{role}}
            </el-tag>
        </template>
        <template #status="scope">
            <el-tag v-if="scope.row.status==1" size="small">正常</el-tag>
            <el-tag v-else-if="scope.row.status==0" size="small" type="danger">冻结</el-tag>
            <el-tag v-else size="small" type="danger">暂无</el-tag>
        </template>
        <template #todo="scope">
            <fy-row-btns :contains="['edit','del']"
                @todo="handleTodo($event,scope.$index,scope.row)" />
        </template>
    </fy-table>
    <!-- 编辑弹窗 -->
    <fy-edit-dialog v-model="showEditDialog" :params="currEditData" :title="editDialogTitle"
        :options="editOptions" top="15%" @submit="bindEditSubmit">
        <template #role="editParams">
            <el-select v-model="editParams.val.roleIdArr" placeholder="选择用户所属角色" multiple
                collapseTags>
                <el-option v-for="role in roles" :key="role.id" :label="role.name"
                    :value="role.id" />
            </el-select>
        </template>
    </fy-edit-dialog>
</template>

<script lang="ts">
export default { name: 'Users', isFull: true }
</script>
 
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { TOptionOfTools } from '@/ui/fy/types'
import useUsersOptions from './hooks/useUsersOptions'
import { getUsersByPage, saveUserInfo, delUsers, getAllRole } from '@/api/sys'
import { ElMessage } from 'element-plus'

// 表格配置
const { searchOptions, tableCols, tableTools, editOptions } = useUsersOptions()
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
const searchParams: IUserInfo = reactive({
    id: '',
    username: '',
    nickname: '',
    email: '',
    phone: '',
    sex: '',
    status: '',
    dateRange: '',
})

// 请求用户列表
const getUserList = (function getUsers() {
    loading.value = true
    getUsersByPage({ page: currPage.value, limit: limit.value, search: searchParams }).then(
        (res) => {
            const { ok, data } = res
            if (ok) {
                tableData.value = data.list
                total.value = data.total
            }
            loading.value = false
        }
    )
    return getUsers
})()

// 当前页切换
const pageCurrChange = (val: number) => {
    currPage.value = val
    getUserList()
}

// 每页条数切换
const pageSizeChange = (val: number) => {
    limit.value = val
    getUserList()
}

// 搜索
const handleSearch = () => {
    getUserList()
}

// 重置
const handleReset = () => {
    for (const key in searchParams) {
        searchParams[key] = ''
    }
    currPage.value = 1
    getUserList()
}

// 表格工具栏点选
const toolsBtnClick = async (btn: TOptionOfTools, flag: any) => {
    // 刷新、搜索隐藏
    if (btn === 'refresh' || (btn === 'search' && !flag)) {
        handleReset()
    }
    // 新增
    if (btn === 'add') {
        editDialogTitle.value = '新增用户'
        editOptions.find((item) => item.key == 'password')!.hide = false
        showEditDialog.value = true
        currEditData.value = {}
    }
    // 删除选定行
    if (btn === 'delete') {
        const { ok, msg } = await delUsers(flag.map((item: { id: string }) => item.id).join(','))
        if (ok) {
            ElMessage.success(msg)
            getUserList()
        }
    }
}

// 显隐编辑用户弹窗
const showEditDialog = ref(false)
// 编辑弹窗标题
const editDialogTitle = ref('')
// 当前编辑用户数据
const currEditData = ref({})

// 行按钮
const handleTodo = async (btn: string, index: number, row: IObj) => {
    switch (btn) {
        // 编辑按钮
        case 'edit':
            editDialogTitle.value = '编辑用户'
            editOptions.find((item) => item.key == 'password')!.hide = true
            showEditDialog.value = true
            currEditData.value = {
                ...row,
                roleIdArr: row.roleIds.split(','),
            }
            break
        // 删除按钮
        case 'del':
            const { ok, msg } = await delUsers(row.id)
            if (ok) {
                ElMessage.success(msg)
                getUserList()
            }
            break
    }
}

// 用户角色
const roles = ref([])

// 请求所有角色
;(async () => {
    getAllRole().then((res) => {
        const { ok, data } = res
        if (ok) {
            roles.value = data
        }
    })
})()

// 编辑完成确认
const bindEditSubmit = async (formData: IUserInfo) => {
    formData.roleIds = formData.roleIdArr.join(',')
    formData.roleNames = roles.value
        .filter((item: any) => formData.roleIdArr.includes(item.id))
        .map((item: any) => item.name)
        .join(',')
    delete formData.roleIdArr
    const { ok, msg } = await saveUserInfo(formData)
    if (ok) {
        ElMessage.success(msg)
        getUserList()
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
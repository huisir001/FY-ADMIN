<!--
 * @Description: 用户管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2021-12-15 18:34:57
-->
<template>
    <fy-table :loading="loading" :cols="tableCols" :data="tableData" page :curr="currPage"
        :total="total" :tools="tableTools" height="calc(100% - 45px)" @toolsClick="toolsBtnClick"
        @pageSizeChange="pageSizeChange" @pageCurrChange="pageCurrChange">
        <template #search>
            <fy-search-form v-model="searchParams" :options="searchOptions" @submit="handleSearch"
                @reset="handleReset" />
        </template>
        <template #status="scope">
            <el-tag v-if="scope.row.status==1" size="small">正常</el-tag>
            <el-tag v-else-if="scope.row.status==0" size="small" type="danger">冻结</el-tag>
            <el-tag v-else size="small" type="danger">暂无</el-tag>
        </template>
        <template #todo="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">
                <fy-icon name="edit" size="13" color="var(--el-color-primary)" /> 编辑
            </el-button>
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">
                <fy-icon name="plus" size="13" color="var(--el-color-primary)" /> 新增
            </el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">
                <fy-icon name="delete" size="13" color="var(--el-color-primary)" /> 删除
            </el-button>
        </template>
    </fy-table>
    <fy-edit-dialog v-model="showUserEditDialog" :params="currEditUserData" title="用户编辑"
        :options="editOptions" @submit="bindEditSubmit" />
</template>
 
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { TOptionOfTools } from '@/ui/fy/types'
import useUsersOptions from './hooks/useUsersOptions'
import { getUsersByPage } from '@/api/user'

export default defineComponent({
    name: 'Users',
    setup() {
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
        const getUserList = (function getUsers(search = null) {
            loading.value = true
            getUsersByPage({ page: currPage.value, limit: limit.value, search }).then((res) => {
                const { ok, data } = res
                if (ok) {
                    tableData.value = data.list
                    total.value = data.total
                }
                loading.value = false
            })
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
        const toolsBtnClick = (btn: TOptionOfTools, flag: any) => {
            if (btn === 'refresh' || (btn === 'search' && !flag)) {
                handleReset()
            }
        }

        // 显隐编辑用户弹窗
        const showUserEditDialog = ref(false)
        // 当前编辑用户数据
        const currEditUserData = ref({})

        // 编辑用户触发
        const handleEdit = (index: number, row: IObj) => {
            showUserEditDialog.value = true
            currEditUserData.value = row
        }

        // 编辑完成确认
        const bindEditSubmit = (formData: IObj) => {
            console.log(formData)
        }

        return {
            loading,
            tableCols,
            tableTools,
            toolsBtnClick,
            currPage,
            total,
            pageSizeChange,
            pageCurrChange,
            searchOptions,
            searchParams,
            handleSearch,
            handleReset,
            tableData,
            showUserEditDialog,
            editOptions,
            handleEdit,
            bindEditSubmit,
            currEditUserData,
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
<!--
 * @Description: 用户管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2021-12-17 14:47:41
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
            <fy-row-btns :contains="['edit','del']"
                @todo="handleTodo($event,scope.$index,scope.row)" />
        </template>
    </fy-table>
    <!-- 编辑弹窗 -->
    <fy-edit-dialog v-model="showUserEditDialog" :params="currEditUserData" :title="editDialogTitle"
        :options="editOptions" top="15%" @submit="bindEditSubmit" />
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
            // 刷新、搜索隐藏
            if (btn === 'refresh' || (btn === 'search' && !flag)) {
                handleReset()
            }
            // 新增
            if (btn === 'add') {
                editDialogTitle.value = '新增用户'
                showUserEditDialog.value = true
                currEditUserData.value = {}
            }
            // 删除选定行
            if (btn === 'delete') {
                console.log('删除：', flag)
            }
        }

        // 显隐编辑用户弹窗
        const showUserEditDialog = ref(false)
        // 编辑弹窗标题
        const editDialogTitle = ref('')
        // 当前编辑用户数据
        const currEditUserData = ref({})

        // 行按钮
        const handleTodo = (btn: string, index: number, row: IObj) => {
            switch (btn) {
                // 编辑按钮
                case 'edit':
                    editDialogTitle.value = '编辑用户'
                    showUserEditDialog.value = true
                    currEditUserData.value = {
                        ...row,
                        role: row.role.split(','),
                    }
                    break
                // 删除按钮
                case 'del':
                    console.log('删除：', row)
                    break
            }
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
            editDialogTitle,
            showUserEditDialog,
            editOptions,
            handleTodo,
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
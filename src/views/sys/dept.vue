<!--
 * @Description: 部门管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2021-12-17 18:23:32
-->
<template>
    <fy-table :cols="tableCols" :data="fuzzySearch(tableData,fuzzySearchWord)" row-key="id"
        :tools="tableTools" height="calc(100% - 45px)" @toolsClick="toolsBtnClick">
        <template #name="scope">
            <span>{{scope.row.name}}</span>
            <div class="sort-btn">
                <el-button size="mini" type="text" @click="handleMoveDowm(scope.$index, scope.row)">
                    <fy-icon name="sort-down" size="13" color="var(--el-color-primary)" />
                </el-button>
                <el-button size="mini" type="text" @click="handleMoveUp(scope.$index, scope.row)">
                    <fy-icon name="sort-up" size="13" color="var(--el-color-primary)" />
                </el-button>
            </div>
        </template>
        <template #status="scope">
            <el-tag v-if="scope.row.status==1" size="small">正常</el-tag>
            <el-tag v-else size="small" type="danger">停用</el-tag>
        </template>
        <template #todoHead>
            <!-- 不分页情况下可以使用本地模糊搜索 -->
            <el-input v-model="fuzzySearchWord" size="mini" clearable placeholder="输入名称或负责人搜索..." />
        </template>
        <template #todo="scope">
            <fy-row-btns @todo="handleTodo($event,scope.$index,scope.row)" />
        </template>
    </fy-table>
    <!-- 编辑弹窗 -->
    <fy-edit-dialog v-model="showEditDialog" :params="currEditData" :title="editDialogTitle"
        :options="editOptions" top="15%" @submit="bindEditSubmit" />
</template>
 
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { fuzzySearch } from '@/utils/common'
import { ICols, TOptionOfTools } from '@/ui/fy/types'

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
        const currEditData = ref({})

        const tableCols: ICols[] = [
            {
                label: '部门名称',
                minWidth: '200',
                slot: 'name',
            },
            {
                label: '状态',
                minWidth: '80',
                filters: [
                    { text: '111', value: 1 },
                    { text: '222', value: 0 },
                ],
                slot: 'status',
            },
            {
                label: '负责人',
                prop: 'leader',
                minWidth: '100',
                formatter: (row: IObj, column: IObj, cellValue: any) => {
                    return cellValue + '111'
                },
            },
            {
                label: '联系方式',
                prop: 'phone',
                minWidth: '100',
            },
            {
                label: '创建时间',
                prop: 'createTime',
                minWidth: '180',
                sortable: true,
            },
            {
                fixed: 'right',
                minWidth: '200',
                slotHead: 'todoHead',
                slot: 'todo',
            },
        ]

        // 表格工具栏
        const tableTools: TOptionOfTools[] = ['add', 'fold', 'export', 'refresh']

        // 编辑表单配置
        const editOptions: any = [
            {
                label: '部门名称',
                component: 'input',
                key: 'name',
                props: {
                    placeholder: '请输入部门名称',
                },
                rules: {
                    required: true,
                    trigger: 'blur',
                    message: '名称不能为空',
                },
            },
            {
                label: '负责人',
                component: 'input',
                key: 'leader',
                props: {
                    placeholder: '请输入负责人',
                },
                rules: {
                    required: true,
                    trigger: 'blur',
                    message: '负责人不能为空',
                },
            },
            {
                label: '联系方式',
                component: 'input',
                key: 'phone',
                props: {
                    placeholder: '请输入手机号',
                },
                rules: {
                    trigger: 'blur',
                    message: '手机号填写错误',
                },
            },
        ]

        // 工具栏点击
        const toolsBtnClick = (btn: TOptionOfTools) => {
            console.log(btn)
        }

        const handleMoveDowm = (index: number, row: any) => {
            console.log(index, row)
        }

        // 行按钮
        const handleTodo = (btn: string, index: number, row: IObj) => {
            switch (btn) {
                // 编辑按钮
                case 'edit':
                    console.log('编辑', row)
                    currEditData.value = row
                    showEditDialog.value = true
                    break
                // 新增按钮
                case 'add':
                    console.log('新增', row)
                    break
                // 删除按钮
                case 'del':
                    console.log('删除：', row)
                    break
            }
        }

        return {
            tableCols,
            tableTools,
            toolsBtnClick,
            handleMoveDowm,
            fuzzySearchWord,
            fuzzySearch,
            handleTodo,
            editDialogTitle,
            showEditDialog,
            currEditData,
            editOptions,
            tableData: [
                {
                    id: 111,
                    name: '分公司',
                    status: '0',
                    leader: '王总',
                    email: '',
                    phone: '',
                    delFlag: '0',
                    remark: '',
                    createTime: '2021-09-09 17:25:21',
                    updateTime: '2021-09-09 17:25:22',
                },
                {
                    id: 1,
                    name: '总公司',
                    status: '1',
                    leader: '王总',
                    email: '',
                    phone: '18233333333',
                    delFlag: '0',
                    remark: '',
                    createTime: '2021-09-09 17:25:21',
                    updateTime: '2021-09-09 17:25:22',
                    children: [
                        {
                            id: 2,
                            name: '财务部',
                            status: '0',
                            leader: '王总',
                            email: '',
                            phone: '',
                            delFlag: '0',
                            remark: '',
                            createTime: '2021-09-09 17:25:21',
                            updateTime: '2021-09-09 17:25:22',
                        },
                        {
                            id: 4,
                            name: '市场部',
                            status: '1',
                            leader: '王总',
                            email: '',
                            phone: '',
                            delFlag: '0',
                            remark: '',
                            createTime: '2021-09-09 17:25:21',
                            updateTime: '2021-09-09 17:25:22',
                        },
                        {
                            id: 5,
                            name: '行政部',
                            status: '1',
                            leader: '王总',
                            email: '',
                            phone: '',
                            delFlag: '0',
                            remark: '',
                            createTime: '2021-09-09 17:25:21',
                            updateTime: '2021-09-09 17:25:22',
                        },
                        {
                            id: 6,
                            name: '销售部',
                            status: '1',
                            leader: '王总',
                            email: '',
                            phone: '',
                            delFlag: '0',
                            remark: '',
                            createTime: '2021-09-09 17:25:21',
                            updateTime: '2021-09-09 17:25:22',
                        },
                    ],
                },
                {
                    id: 7,
                    name: '总公司',
                    status: '1',
                    leader: '王总',
                    email: '',
                    phone: '18233333333',
                    delFlag: '0',
                    remark: '',
                    createTime: '2021-09-09 17:25:21',
                    updateTime: '2021-09-09 17:25:22',
                    children: [
                        {
                            id: 8,
                            name: '财务部',
                            status: '0',
                            leader: '王总',
                            email: '',
                            phone: '',
                            delFlag: '0',
                            remark: '',
                            createTime: '2021-09-09 17:25:21',
                            updateTime: '2021-09-09 17:25:22',
                        },
                        {
                            id: 9,
                            name: '研发部',
                            status: '1',
                            leader: '王总',
                            email: '',
                            phone: '',
                            delFlag: '0',
                            remark: '',
                            createTime: '2021-09-09 17:25:21',
                            updateTime: '2021-09-09 17:25:22',
                        },
                        {
                            id: 10,
                            name: '市场部',
                            status: '1',
                            leader: '王总',
                            email: '',
                            phone: '',
                            delFlag: '0',
                            remark: '',
                            createTime: '2021-09-09 17:25:21',
                            updateTime: '2021-09-09 17:25:22',
                        },
                        {
                            id: 11,
                            name: '行政部',
                            status: '1',
                            leader: '王总',
                            email: '',
                            phone: '',
                            delFlag: '0',
                            remark: '',
                            createTime: '2021-09-09 17:25:21',
                            updateTime: '2021-09-09 17:25:22',
                        },
                        {
                            id: 12,
                            name: '销售部',
                            status: '1',
                            leader: '王总',
                            email: '',
                            phone: '',
                            delFlag: '0',
                            remark: '',
                            createTime: '2021-09-09 17:25:21',
                            updateTime: '2021-09-09 17:25:22',
                        },
                    ],
                },
                {
                    id: 13,
                    name: '总公司',
                    status: '1',
                    leader: '王总',
                    email: '',
                    phone: '18233333333',
                    delFlag: '0',
                    remark: '',
                    createTime: '2021-09-09 17:25:21',
                    updateTime: '2021-09-09 17:25:22',
                    children: [
                        {
                            id: 14,
                            name: '财务部',
                            status: '0',
                            leader: '王总',
                            email: '',
                            phone: '',
                            delFlag: '0',
                            remark: '',
                            createTime: '2021-09-09 17:25:21',
                            updateTime: '2021-09-09 17:25:22',
                        },
                        {
                            id: 15,
                            name: '财务部',
                            status: '0',
                            leader: '王总',
                            email: '',
                            phone: '',
                            delFlag: '0',
                            remark: '',
                            createTime: '2021-09-09 17:25:21',
                            updateTime: '2021-09-09 17:25:22',
                        },
                    ],
                },
            ],
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
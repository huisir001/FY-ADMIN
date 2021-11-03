<!--
 * @Description: 部门管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2021-11-03 13:21:01
-->
<template>
    <!-- <el-form :inline="true">
        <el-form-item label="部门名称">
            <el-input v-model="searchFormParams.name" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
            <el-select v-model="searchFormParams.status" placeholder="选择部门状态">
                <el-option label="正常" value="1"></el-option>
                <el-option label="停用" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
        </el-form-item>
    </el-form> -->

    <my-table :cols="tableCols" :data="fuzzySearch(tableData,fuzzySearchWord)" row-key="id"
        default-expand-all page :curr="currPage" :total="500" :tools="tableTools"
        height="calc(100% - 45px)" @toolsClick="toolsBtnClick" @pageSizeChange="pageSizeChange"
        @pageCurrChange="pageCurrChange">
        <template #name="scope">
            <span>{{scope.row.name}}</span>
            <div class="sort-btn">
                <el-button size="mini" type="text" @click="handleMoveDowm(scope.$index, scope.row)">
                    <icon name="sort-down" size="13" color="var(--el-color-primary)" />
                </el-button>
                <el-button size="mini" type="text" @click="handleMoveUp(scope.$index, scope.row)">
                    <icon name="sort-up" size="13" color="var(--el-color-primary)" />
                </el-button>
            </div>
        </template>
        <template #status="scope">
            <el-tag v-if="scope.row.status==1" size="small">正常</el-tag>
            <el-tag v-else size="small" type="danger">停用</el-tag>
        </template>
        <template #todoThead>
            <el-input v-model="fuzzySearchWord" size="mini" clearable placeholder="Search..." />
        </template>
        <template #todo="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">
                <icon name="edit" size="13" color="var(--el-color-primary)" /> 编辑
            </el-button>
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">
                <icon name="plus" size="13" color="var(--el-color-primary)" /> 新增
            </el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">
                <icon name="delete" size="13" color="var(--el-color-primary)" /> 删除
            </el-button>
        </template>
    </my-table>
</template>
 
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { fuzzySearch } from '@/utils/common'
import MyTable from '@/components/Table/index.vue'
import { TOptionOfTools } from '@/components/Table/inc/types'

export default defineComponent({
    name: 'Dept',
    components: {
        MyTable,
    },
    setup() {
        // 模糊搜索
        const fuzzySearchWord: Ref<string> = ref('')

        const tableCols = [
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
                sort: true,
            },
            {
                fixed: 'right',
                minWidth: '200',
                slotThead: 'todoThead',
                slot: 'todo',
            },
        ]

        const tableTools: TOptionOfTools[] = ['add', 'fold', 'search', 'export', 'refresh']

        const toolsBtnClick = (btn: TOptionOfTools) => {
            console.log(btn)
        }

        const handleMoveDowm = (index: number, row: any) => {
            console.log(index, row)
        }

        // 当前页
        const currPage = ref(1)
        // 每页条数
        const limit = ref(15)

        // 当前页切换
        const pageCurrChange = (val: number) => {
            console.log('currPage', val)
            currPage.value = val
        }

        // 每页条数切换
        const pageSizeChange = (val: number) => {
            console.log('limit', val)
            limit.value = val
        }

        // 搜索
        const handleSearch = () => {
            // console.log(searchFormParams)
        }

        // 重置
        // const handleReset = () => {
        //     for (const key in searchFormParams) {
        //         searchFormParams[key] = ''
        //     }
        // }

        return {
            tableCols,
            tableTools,
            toolsBtnClick,
            currPage,
            pageSizeChange,
            pageCurrChange,
            handleMoveDowm,
            fuzzySearchWord,
            fuzzySearch,
            handleSearch,
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
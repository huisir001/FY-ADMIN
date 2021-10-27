<!--
 * @Description: 部门管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2021-10-27 17:45:46
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
    <el-table :data="fuzzySearch(tableData,fuzzySearchWord)"
        style="width: 100%; margin-bottom: 20px" row-key="id" size="mini" border default-expand-all>
        <el-table-column label="部门名称" min-width="200">
            <template #default="scope">
                <span>{{scope.row.name}}</span>
                <div class="sort-btn">
                    <el-button size="mini" type="text" icon="el-icon-sort-down"
                        @click="handleDelete(scope.$index, scope.row)" />
                    <el-button size="mini" type="text" icon="el-icon-sort-up"
                        @click="handleDelete(scope.$index, scope.row)" />
                </div>
            </template>
        </el-table-column>
        <el-table-column label="状态" min-width="80">
            <template #default="scope">
                <el-tag v-if="scope.row.status==1" size="small">正常</el-tag>
                <el-tag v-else size="small" type="danger">停用</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="leader" label="负责人" min-width="100" />
        <el-table-column prop="phone" label="联系方式" min-width="100" />
        <el-table-column prop="createTime" label="创建时间" sortable min-width="180" />
        <el-table-column min-width="200" fixed="right">
            <template #header>
                <!-- <el-input v-model="fuzzySearchWord" size="mini" clearable placeholder="Search..." /> -->
                <el-button icon="el-icon-search" size="mini" circle></el-button>
                <el-button icon="el-icon-search" size="mini" circle></el-button>
                <el-button icon="el-icon-search" size="mini" circle></el-button>
            </template>
            <template #default="scope">
                <el-button size="mini" type="text" icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button size="mini" type="text" icon="el-icon-plus"
                    @click="handleEdit(scope.$index, scope.row)">新增
                </el-button>
                <el-button size="mini" type="text" icon="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
 
<script lang="ts">
import { defineComponent, reactive, Ref, ref } from 'vue'
import { fuzzySearch } from '@/utils/common'

export default defineComponent({
    name: 'Dept',
    setup() {
        // 模糊搜索
        const fuzzySearchWord: Ref<string> = ref('')

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
            fuzzySearchWord,
            fuzzySearch,
            handleSearch,
            tableData: [
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
                            id: 3,
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
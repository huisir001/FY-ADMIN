<!--
 * @Description: 菜单管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2021-11-22 15:22:59
-->
<template>
    <z-table :cols="tableCols" :data="fuzzySearch(menuList,fuzzySearchWord)" row-key="id"
        :tools="tableTools" height="calc(100% - 45px)" @toolsClick="toolsBtnClick">
        <template #title="scope">
            <span>{{scope.row.title}}</span>
            <div class="sort-btn">
                <el-button size="mini" type="text" @click="handleMoveDowm(scope.$index, scope.row)">
                    <z-icon name="sort-down" size="13" color="var(--el-color-primary)" />
                </el-button>
                <el-button size="mini" type="text" @click="handleMoveUp(scope.$index, scope.row)">
                    <z-icon name="sort-up" size="13" color="var(--el-color-primary)" />
                </el-button>
            </div>
        </template>
        <template #status="scope">
            <el-tag v-if="scope.row.status==1" size="small">正常</el-tag>
            <el-tag v-else size="small" type="danger">停用</el-tag>
        </template>
        <template #privateHead>
            <div class="private-head-slot">
                <span>登录权限</span>
                <el-tooltip effect="light" content="是否需要登录才能访问" placement="top">
                    <z-icon name="question-filled" size="14" color="var(--el-color-info)"
                        style="margin-left:3px" />
                </el-tooltip>
            </div>
        </template>
        <template #todoHead>
            <!-- 不分页情况下可以使用本地模糊搜索 -->
            <el-input v-model="fuzzySearchWord" size="mini" clearable placeholder="Search..." />
        </template>
        <template #todo="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">
                <z-icon name="edit" size="13" color="var(--el-color-primary)" /> 编辑
            </el-button>
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">
                <z-icon name="plus" size="13" color="var(--el-color-primary)" /> 新增
            </el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">
                <z-icon name="delete" size="13" color="var(--el-color-primary)" /> 删除
            </el-button>
        </template>
    </z-table>
</template>
 
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { getAllMenus } from '@/api/sys'
import { rawList2Tree } from '@/utils/common'
import { fuzzySearch } from '@/utils/common'
import { ICols, TOptionOfTools } from '@/ui/zui/types'

export default defineComponent({
    name: 'Menu',
    setup() {
        console.log('VIEW_PATHS', $GLOBAL.VIEW_PATHS)
        // 菜单列表tree
        const menuList: Ref<any> = ref([])
        // 模糊搜索
        const fuzzySearchWord: Ref<string> = ref('')

        // 请求所有菜单
        !(async function () {
            const { ok, data = [] } = await getAllMenus()
            if (ok) {
                menuList.value = rawList2Tree(data) //tree
            }
        })()

        const tableCols: ICols[] = [
            {
                label: '菜单名称',
                minWidth: 200,
                slot: 'title',
            },
            {
                label: '图标',
                minWidth: 60,
                prop: 'icon',
            },
            {
                label: '类型',
                prop: 'type',
                minWidth: 60,
                formatter: (row: IObj, column: IObj, cellValue: number) => {
                    const types: IObj = {
                        1: '路由',
                        2: '链接',
                        3: '按钮',
                    }
                    return types[cellValue]
                },
            },
            {
                label: '路径',
                prop: 'path',
            },
            {
                label: '显隐',
                prop: 'visible',
                minWidth: 60,
                formatter: (row: IObj, column: IObj, cellValue: boolean) => {
                    return cellValue ? '显示' : '隐藏'
                },
            },
            {
                prop: 'private',
                slotHead: 'privateHead',
                minWidth: 90,
                formatter: (row: IObj, column: IObj, cellValue: boolean) => {
                    return cellValue ? '需要' : '不需要'
                },
            },
            {
                label: '文件路径',
                minWidth: 120,
                prop: 'viewPath',
            },
            {
                label: '缓存',
                minWidth: 40,
                align: 'center',
                prop: 'keepAlive',
                formatter: (row: IObj, column: IObj, cellValue: boolean) => {
                    return cellValue ? '是' : '否'
                },
            },
            {
                label: '权限',
                prop: 'auth',
            },
            {
                label: '排序',
                minWidth: 40,
                align: 'center',
                prop: 'orderNum',
            },
            {
                label: '状态',
                minWidth: 60,
                filters: [
                    { text: '111', value: 1 },
                    { text: '222', value: 0 },
                ],
                slot: 'status',
            },
            {
                label: '更新时间',
                prop: 'updateTime',
                minWidth: 180,
                sortable: true,
            },
            {
                fixed: 'right',
                minWidth: 200,
                slotHead: 'todoHead',
                slot: 'todo',
            },
        ]

        // 表格工具栏
        const tableTools: TOptionOfTools[] = ['add', 'fold', 'export', 'refresh']

        // 工具栏点击
        const toolsBtnClick = (btn: TOptionOfTools) => {
            console.log(btn)
        }

        // 位置移动
        const handleMoveDowm = (index: number, row: any) => {
            console.log(index, row)
        }

        return {
            menuList,
            fuzzySearch,
            fuzzySearchWord,
            tableCols,
            tableTools,
            toolsBtnClick,
            handleMoveDowm,
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
.private-head-slot {
    display: flex;
    align-items: center;
}
</style>
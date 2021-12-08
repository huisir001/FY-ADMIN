<!--
 * @Description: 菜单管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2021-11-22 17:13:50
-->
<template>
    <fy-table :cols="tableCols" :data="fuzzySearch(menuList,fuzzySearchWord)" row-key="id"
        :tools="tableTools" height="calc(100% - 45px)" @toolsClick="toolsBtnClick">
        <template #title="scope">
            <span>{{scope.row.title}}</span>
            <div class="sort-btn">
                <el-button size="mini" type="text" @click="handleMoveDowm(scope.$index, scope.row)">
                    <fy-icon name="sort-down" size="13" color="var(--el-color-primary)" />
                </el-button>
                <el-button size="mini" type="text" @click="handleMoveUp(scope.$index, scope.row)">
                    <fy-icon name="sort-up" size="13" color="var(--el-color-primary)" />
                </el-button>
            </div>
        </template>
        <template #icon="scope">
            <fy-icon v-if="scope.row.icon" :name="scope.row.icon" size="14" :height="16" />
        </template>
        <template #status="scope">
            <el-tag v-if="scope.row.status==1" size="small">正常</el-tag>
            <el-tag v-else size="small" type="danger">停用</el-tag>
        </template>
        <template #todoHead>
            <!-- 不分页情况下可以使用本地模糊搜索 -->
            <el-input v-model="fuzzySearchWord" size="mini" clearable placeholder="输入名称或路径搜索..." />
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
</template>
 
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { getAllMenus } from '@/api/sys'
import { rawList2Tree } from '@/utils/common'
import { fuzzySearch } from '@/utils/common'
import { TOptionOfTools } from '@/ui/fy/types'
import useMenuOptions from './hooks/useMenuOptions'

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

        // 表格配置
        const { tableCols, tableTools } = useMenuOptions()

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
</style>
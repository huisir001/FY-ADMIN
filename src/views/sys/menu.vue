<!--
 * @Description: 菜单管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2021-12-20 15:18:21
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
            <fy-row-btns @todo="handleTodo($event,scope.$index,scope.row)" />
        </template>
    </fy-table>
    <!-- 编辑弹窗 -->
    <fy-edit-dialog v-model="showEditDialog" :params="currEditData" :title="editDialogTitle"
        :options="editOptions" top="13%" @submit="bindEditSubmit">
        <template #icon="editParams">
            <el-select v-model="editParams.val.icon" filterable placeholder="选择菜单图标">
                <el-option v-for="item in fyIcons" :key="item" :label="item" :value="item">
                    <fy-icon :name="item" />
                    <span style="float:right;opacity:.8;">{{ item }}</span>
                </el-option>
            </el-select>
        </template>
        <template #type="editParams">
            <el-select v-model="editParams.val.type" @change="menuTypeChange">
                <el-option label="路由" :value="1" />
                <el-option label="链接" :value="2" />
                <el-option label="按钮" :value="3" />
            </el-select>
        </template>
        <template #viewPath="editParams">
    <el-select v-model="editParams.val.viewPath" @change="viewPathChange"
        placeholder="选择路由所指向的文件路径">
        <el-option v-for="path in viewPaths" :key="path" :label="path" :value="path" />
    </el-select>
</template>
    </fy-edit-dialog>
</template>
 
<script lang="ts">
import { defineComponent, Ref, ref, getCurrentInstance } from 'vue'
import { getAllMenus } from '@/api/sys'
import { rawList2Tree } from '@/utils/common'
import { fuzzySearch } from '@/utils/common'
import { TOptionOfTools } from '@/ui/fy/types'
import useMenuOptions from './hooks/useMenuOptions'

export default defineComponent({
    name: 'Menu',
    setup() {
        // 获取缓存的图标列表
        const currInstance: any = getCurrentInstance()
        const fyIcons = currInstance.proxy.$getIcons()
        // 文件路径
        const viewPaths = $GLOBAL.VIEW_PATHS
        // 菜单列表tree
        const menuList: Ref<any> = ref([])
        // 模糊搜索
        const fuzzySearchWord: Ref<string> = ref('')
        // 编辑弹窗显隐
        const showEditDialog = ref(false)
        // 编辑弹窗标题
        const editDialogTitle = ref('编辑菜单')
        // 当前编辑数据
        const currEditData = ref({})

        // 请求所有菜单
        !(async function () {
            const { ok, data = [] } = await getAllMenus()
            if (ok) {
                menuList.value = rawList2Tree(data) //tree
            }
        })()

        // 表格配置
        const { tableCols, tableTools, editOptions, menuTypeChange } = useMenuOptions()

        // 工具栏点击
        const toolsBtnClick = (btn: TOptionOfTools) => {
            console.log(btn)
        }

        // 位置移动
        const handleMoveDowm = (index: number, row: any) => {
            console.log(index, row)
        }

        // 行按钮
        const handleTodo = (btn: string, index: number, row: IObj) => {
            switch (btn) {
                // 编辑按钮
                case 'edit':
                    console.log('编辑', row)
                    menuTypeChange(row.type)
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
            viewPaths,
            fyIcons,
            menuList,
            fuzzySearch,
            fuzzySearchWord,
            tableCols,
            tableTools,
            toolsBtnClick,
            handleMoveDowm,
            handleTodo,
            editDialogTitle,
            showEditDialog,
            currEditData,
            editOptions,
            menuTypeChange,
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
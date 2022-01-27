<!--
 * @Description: 菜单管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 15:14:07
 * @LastEditTime: 2022-01-25 10:59:25
-->
<template>
    <fy-table :loading="loading" :cols="tableCols" :data="searchData" row-key="id"
        :tools="tableTools" height="calc(100% - 48px)" @toolsClick="toolsBtnClick">
        <template #title="scope">
            <span>{{scope.row.title}}</span>
            <div class="sort-btn">
                <el-button type="text" @click="handleMoveDowm(scope.$index, scope.row)">
                    <fy-icon name="sort-down" size="13" color="var(--el-color-primary)" />
                </el-button>
                <el-button type="text" @click="handleMoveUp(scope.$index, scope.row)">
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
            <fy-fuzzy-search v-model="searchData" :data="menuList" />
        </template>
        <template #todo="scope">
            <fy-row-btns @todo="handleTodo($event,scope.$index,scope.row)" />
        </template>
    </fy-table>
    <!-- 编辑弹窗 -->
    <fy-edit-dialog v-model="showEditDialog" :params="currEditData" :title="editDialogTitle"
        :options="editOptions" top="13%" @submit="bindEditSubmit">
        <template #parent="editParams">
            <fy-tree-select v-model="editParams.val.parentId"
                :label="treeSelectLabel(editParams.val.parentId)" :data="treeSlectData"
                :option="{children:'children',label:'title'}" />
        </template>
        <template #icon="editParams">
            <fy-icon-select v-model="editParams.val.icon" />
        </template>
        <template #type="editParams">
            <el-select v-model="editParams.val.type" @change="menuTypeChange">
                <el-option label="目录" :value="MenuType.cat" />
                <el-option label="路由" :value="MenuType.route" />
                <el-option label="链接" :value="MenuType.link" />
                <el-option label="按钮" :value="MenuType.button" />
            </el-select>
        </template>
        <template #viewPath="editParams">
            <el-select v-model="editParams.val.viewPath" placeholder="选择路由所指向的文件路径">
                <el-option v-for="path in viewPaths" :key="path" :label="path" :value="path" />
            </el-select>
        </template>
    </fy-edit-dialog>
</template>

<script lang="ts">
export default { name: 'Menu', isFull: true }
</script>
 
<script lang="ts" setup>
import { computed, Ref, ref } from 'vue'
import { getAllMenus, saveMenu, delMenu } from '@/api/sys'
import { rawList2Tree } from '@/utils/common'
import { TOptionOfTools } from '@/ui/fy/types'
import useMenuOptions from './hooks/useMenuOptions'
import { ElMessage } from 'element-plus'
import { viewModules } from '@/store/helpers'

// 文件路径
const viewPaths = Object.keys(viewModules).map((item) => 'views/' + item.split('views/')[1])
// 表格原始数据
const tableRawData = ref([])
// 菜单列表tree
const menuList: Ref<any> = ref([])
// 模糊搜索
const searchData: Ref<any> = ref([])
// 编辑弹窗显隐
const showEditDialog = ref(false)
// 编辑弹窗标题
const editDialogTitle = ref('编辑菜单')
// 当前编辑数据
const currEditData = ref({})
// loading
const loading = ref(false)

// 请求所有菜单
const getMenuList = (function getMenu() {
    loading.value = true
    getAllMenus().then((res) => {
        const { ok, data = [] } = res
        if (ok) {
            tableRawData.value = data
            menuList.value = rawList2Tree(data) //tree
        }
        loading.value = false
    })
    return getMenu
})()

// 表格配置
const { tableCols, tableTools, editOptions, MenuType, menuTypeChange } = useMenuOptions()

// 工具栏点击
const toolsBtnClick = (btn: TOptionOfTools) => {
    console.log(btn)
    // 刷新、搜索隐藏
    if (btn === 'refresh') {
        getMenuList()
    }
    if (btn === 'add') {
        editDialogTitle.value = '新增菜单'
        currEditData.value = {}
        showEditDialog.value = true
    }
}

// 位置移动
const handleMoveDowm = (index: number, row: any) => {
    console.log(index, row)
}

// 行按钮
const handleTodo = async (btn: string, index: number, row: IObj) => {
    switch (btn) {
        // 编辑按钮
        case 'edit':
            console.log('编辑', row)
            editDialogTitle.value = '编辑菜单'
            menuTypeChange(row.type)
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
            const { ok, msg } = await delMenu(row.id)
            if (ok) {
                ElMessage.success(msg)
                getMenuList()
            }
            break
    }
}

// 编辑完成回调
const bindEditSubmit = async (formData: IMenu) => {
    const { ok, msg } = await saveMenu(formData)
    if (ok) {
        ElMessage.success(msg)
        getMenuList()
    }
}

// 树结构选中项名称
const treeSelectLabel = (id: any) => {
    const selectData: any = tableRawData.value.find((item: any) => item.id === id)
    return selectData ? selectData.title : '主类目'
}

// 上级菜单树结构选择数据
const treeSlectData = computed(() => {
    return [
        {
            id: null,
            title: '主类目',
            children: menuList.value,
        },
    ]
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
<!--
 * @Description: 表格操作按钮
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-16 16:56:44
 * @LastEditTime: 2022-01-10 14:00:31
-->
<template>
    <el-button v-if="contains.includes('edit')" type="text" size="small"
        @click="$emit('todo','edit')">
        <fy-icon name="edit" size="13" color="var(--el-color-primary)" style="margin-right:3px;" />
        编辑
    </el-button>
    <el-button v-if="contains.includes('add')" type="text" size="small"
        @click="$emit('todo','add')">
        <fy-icon name="plus" size="13" color="var(--el-color-primary)" style="margin-right:3px;" />
        新增
    </el-button>
    <el-popconfirm v-if="contains.includes('del')" confirm-button-text="确认" cancel-button-text="取消"
        title="确认删除此行?" @confirm="$emit('todo','del')">
        <template #reference>
            <el-button type="text" size="small">
                <fy-icon name="delete" size="13" color="var(--el-color-primary)"
                    style="margin-right:3px;" /> 删除
            </el-button>
        </template>
    </el-popconfirm>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
    contains: {
        type: Array as PropType<'edit' | 'add' | 'del'[]>,
        default: () => ['edit', 'add', 'del'],
    },
})

defineEmits(['todo'])
</script>
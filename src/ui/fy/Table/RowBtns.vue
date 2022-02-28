<!--
 * @Description: 表格操作按钮
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-16 16:56:44
 * @LastEditTime: 2022-02-28 14:07:38
-->
<template>
    <el-button v-if="contains.includes('edit')" type="text" size="small"
        @click="$emit('todo','edit')">
        <fy-icon name="edit" size="13" color="var(--el-color-primary)" class="mr-3" />
        编辑
    </el-button>
    <el-button v-if="contains.includes('detail')" type="text" size="small"
        @click="$emit('todo','detail')">
        <fy-icon name="ChatLineSquare" size="13" color="var(--el-color-primary)" class="mr-3" />
        详情
    </el-button>
    <el-button v-if="contains.includes('add')" type="text" size="small"
        @click="$emit('todo','add')">
        <fy-icon name="plus" size="13" color="var(--el-color-primary)" class="mr-3" />
        新增
    </el-button>
    <el-popconfirm v-if="contains.includes('del')" confirm-button-text="确认" cancel-button-text="取消"
        title="确认删除此行?" @confirm="$emit('todo','del')">
        <template #reference>
            <el-button type="text" size="small">
                <fy-icon name="delete" size="13" color="var(--el-color-primary)" class="mr-3" /> 删除
            </el-button>
        </template>
    </el-popconfirm>
    <el-popconfirm v-if="contains.includes('exit')" confirm-button-text="确认" cancel-button-text="取消"
        title="确认强制退出?" @confirm="$emit('todo','exit')">
        <template #reference>
            <el-button type="text" size="small">
                <fy-icon name="Exit" size="13" color="var(--el-color-primary)" class="mr-3" /> 强退
            </el-button>
        </template>
    </el-popconfirm>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
    contains: {
        type: Array as PropType<'edit' | 'detail' | 'add' | 'del' | 'exit'[]>,
        default: () => ['edit', 'add', 'del'],
    },
})

defineEmits(['todo'])
</script>
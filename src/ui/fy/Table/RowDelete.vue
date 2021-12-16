<!--
 * @Description: 行删除按钮
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-16 10:46:56
 * @LastEditTime: 2021-12-16 11:11:35
-->
<template>
    <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" title="确认删除此行?">
        <template #reference>
            <el-button size="mini" type="text">
                <fy-icon name="delete" size="13" color="var(--el-color-primary)" /> 删除
            </el-button>
        </template>
    </el-popconfirm>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'RowDelete',
})
</script>

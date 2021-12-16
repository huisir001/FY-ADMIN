<!--
 * @Description: 行编辑按钮
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-16 10:46:56
 * @LastEditTime: 2021-12-16 11:02:28
-->
<template>
    <el-button size="mini" type="text">
        <fy-icon name="edit" size="13" color="var(--el-color-primary)" /> 编辑
    </el-button>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'RowEdit',
})
</script>

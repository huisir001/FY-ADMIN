<!--
 * @Description: 编辑器
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-02-16 14:29:02
 * @LastEditTime: 2022-02-17 14:32:07
-->
<template>
    <div class="my-editor">
        <fy-editor @onChange="handleChange" />
    </div>
    <fy-card :type="2" title="HTML内容">
        {{htmlVal}}
    </fy-card>
</template>

<script lang="ts">
export default {
    name: 'editor',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const htmlVal = ref('')

// 监听内容变化
const handleChange = (editor: any) => {
    console.log(editor)
    htmlVal.value = editor.getHtml()
}
</script>

<style scoped lang="scss">
.my-editor {
    padding: 20px;
    width: 100%;
    // height: 500px;
    background: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
}
</style>
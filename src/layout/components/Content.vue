<!--
 * @Description: 内容区
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 14:31:00
 * @LastEditTime: 2021-09-10 19:22:53
-->
<template>
    <div class="content">
    </div>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Content',
    setup() {},
})
</script>
 
<style scoped lang="scss">
.content {
    width: 100%;
    min-height: calc(100% - 40px);
    background: #fff;
    margin-top: 10px;
}
</style>
<!--
 * @Description: 
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-18 10:11:09
 * @LastEditTime: 2022-01-18 16:30:28
-->
<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span>{{title}}</span>
                <slot name="headerRight" />
            </div>
        </template>
        <slot />
    </el-card>
</template>

<script lang="ts">
export default {
    name: 'card_2',
}
</script>

<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: '',
    },
})
</script>

<style scoped lang="scss">
.box-card {
    border: 0;
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
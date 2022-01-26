<!--
 * @Description: 
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-18 10:11:09
 * @LastEditTime: 2022-01-26 10:37:04
-->
<template>
    <el-card class="box-card" shadow="hover">
        <img v-if="img" :src="img" class="image" />
        <slot />
    </el-card>
</template>

<script lang="ts">
export default {
    name: 'card_3',
}
</script>

<script lang="ts" setup>
defineProps({
    img: {
        type: String,
        default: '',
    },
})
</script>

<style scoped lang="scss">
.box-card {
    border: 0;
    img.image {
        width: 100%;
        display: block;
    }
    :deep(.el-card__body) {
        padding: 0;
    }
}
</style>
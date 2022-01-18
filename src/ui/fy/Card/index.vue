<!--
 * @Description: 卡片
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-18 10:10:30
 * @LastEditTime: 2022-01-18 10:55:43
-->
<template>
    <card-1 v-if="type==1" :data="data" />
</template>

<script lang="ts">
export default {
    name: 'Card',
}
</script>

<script lang="ts" setup>
import { PropType } from 'vue'
import card1 from './card_1.vue'

defineProps({
    type: {
        type: Number as PropType<1 | 2 | 3>,
        require: true,
    },
    data: {
        type: [Array, Object],
        require: true,
    },
})
</script>

<style scoped lang="scss">
</style>
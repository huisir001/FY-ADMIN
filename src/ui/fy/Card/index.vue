<!--
 * @Description: 卡片
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-18 10:10:30
 * @LastEditTime: 2022-01-18 16:25:26
-->
<template>
    <card-1 v-if="type==1" :data="data" />
    <card-2 v-if="type==2" :title="title">
        <template #headerRight>
            <slot name="headerRight" />
        </template>
        <slot />
    </card-2>
</template>

<script lang="ts">
export default {
    name: 'Card',
}
</script>

<script lang="ts" setup>
import { PropType } from 'vue'
import card1 from './card_1.vue'
import card2 from './card_2.vue'

defineProps({
    type: {
        type: Number as PropType<1 | 2 | 3>,
        require: true,
    },
    data: {
        type: [Array, Object],
        require: true,
    },
    title: {
        type: String,
        default: '',
    },
})
</script>

<style scoped lang="scss">
</style>
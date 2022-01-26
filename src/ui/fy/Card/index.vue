<!--
 * @Description: 卡片
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-18 10:10:30
 * @LastEditTime: 2022-01-26 10:42:07
-->
<template>
    <card-1 v-if="type==1" :data="data" />
    <card-2 v-if="type==2" :title="title">
        <template #headerRight>
            <slot name="headerRight" />
        </template>
        <slot />
    </card-2>
    <card-3 v-if="type==3" :img="img">
        <slot />
    </card-3>
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
import card3 from './card_3.vue'

defineProps({
    type: {
        type: Number as PropType<1 | 2 | 3>,
        require: true,
    },
    data: {
        type: [Array, Object],
        require: false,
    },
    title: {
        type: String,
        default: '',
    },
    img: {
        type: String,
        default: '',
    },
})
</script>

<style scoped lang="scss">
</style>
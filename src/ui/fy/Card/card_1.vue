<!--
 * @Description: 卡片1
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-18 10:11:09
 * @LastEditTime: 2022-01-18 13:58:00
-->
<template>
    <div class="card-1">
        <div v-for="item in data" :key="item.title" class="card-item">
            <p class="desc">{{item.desc}}</p>
            <p class="title">{{item.title}}</p>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'card_1',
}
</script>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
interface IList {
    title: string
    desc: string
}

const props = defineProps({
    data: {
        type: Array as PropType<IList[]>,
        default: () => [],
    },
})

const itemWidth = computed(() => 100 / props.data.length + '%')
</script>

<style scoped lang="scss">
.card-1 {
    width: 100%;
    height: 100%;
    display: flex;
    .card-item {
        width: v-bind(itemWidth);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 1;
        p.desc {
            font-size: 14px;
            margin-bottom: 10px;
        }
        p.title {
            font-size: 24px;
        }
    }
}
</style>
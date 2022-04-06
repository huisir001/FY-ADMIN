<!--
 * @Description: 公告/通知
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-06 15:32:55
 * @LastEditTime: 2022-04-06 18:25:03
-->
<template>
    <div class="message flex-row">
        <div class="sidebar">
            <div v-for="item in msgList" :key="item.id" class="li">
                <div class="title">{{item.title}}</div>
                <div class="time">{{item.updateTime}}</div>
            </div>
        </div>
        <!-- <div class="content">

        </div> -->
    </div>
</template>

<script lang="ts">
export default {
    name: 'Message',
    isFull: true,
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { getMsgsByPage, getMsgDetail, delMsg } from '@/api/msg'

// 当前页码
const page = ref(1)
// 列表
const msgList = ref([])
// loading
const sideLoading = ref(false)
const contLoading = ref(false)

// 消息列表
const getMessages = (function fn() {
    sideLoading.value = true
    getMsgsByPage(page.value)
        .then((res) => {
            console.log(res)
            msgList.value = res.data.list
        })
        .finally(() => {
            sideLoading.value = false
        })
    return fn
})()
</script>

<style scoped lang="scss">
.message {
    height: 100%;
    width: 100%;
    .sidebar {
        width: 100%;
        height: 100%;
        .li {
            padding: 10px;
            border-bottom: var(--el-border);
        }
    }
    // .content {
    //     width: calc(100% - 300px);
    //     height: 100%;
    // }
}
</style>
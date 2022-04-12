<!--
 * @Description: 公告/通知
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-06 15:32:55
 * @LastEditTime: 2022-04-12 14:03:19
-->
<template>
    <div class="message flex-row">
        <div class="sidebar">
            <div v-for="item in msgList" :key="item.id" class="li"
                :class="{active:item.id===currMsg.id}" v-contextMenu="ctxMenuList"
                :data-id="item.id" @click="getDetail(item.id)">
                <div class="title">{{item.title}}</div>
                <div class="time">{{item.updateTime}}</div>
                <div v-if="item.status==0" class="dot"></div>
            </div>
        </div>
        <div v-if="showContent" class="content">
            <div class="title">{{currMsg.title}}</div>
            <div class="time">{{currMsg.updateTime}}</div>
            <div class="article" v-html="currMsg.content"></div>
            <fy-icon :size="20" color="#fff" :height="36" name="close" class="icon"
                @click="showContent = false" />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Message',
    isFull: true,
}
</script>

<script lang="ts" setup>
import { ref, Ref, watch, computed, onMounted } from 'vue'
import { useStore } from '@/store'
import { getMsgsByPage, getMsgDetail, delMsg, readById, readAll } from '@/api/msg'
import { IMessageDetail } from './types'
import { ElMessage } from 'element-plus'

// 当前页码
const page = ref(1)
// 列表
const msgList: Ref<IMessageDetail[]> = ref([])
const currMsg: Ref<IMessageDetail> = ref({})
// loading
const sideLoading = ref(false)
const contLoading = ref(false)
// showcontent
const showContent = ref(false)
// store
const Store = useStore()
const visibleAreaWidth = computed(() => Store?.state.sys.visibleAreaWidth)
const beginVisibleAreaWidth = ref(0)
onMounted(() => {
    // 初次进入屏宽
    beginVisibleAreaWidth.value = visibleAreaWidth.value!
})

watch(
    visibleAreaWidth,
    (val) => {
        if (val && val > 620) {
            showContent.value = true
        }
    },
    { immediate: true }
)

// 消息列表
const getMessages = (function fn() {
    sideLoading.value = true
    msgList.value = []
    getMsgsByPage(page.value)
        .then((res) => {
            msgList.value = res.data.list
            getDetail(res.data.list[0].id, true)
        })
        .finally(() => {
            sideLoading.value = false
        })
    return fn
})()

// 消息列表
const getDetail = (id: string, isBegin: boolean) => {
    if (currMsg.value.id === id) {
        showContent.value = true
        return
    }
    contLoading.value = true
    getMsgDetail(id)
        .then((res) => {
            currMsg.value = res.data
            showContent.value = isBegin ? beginVisibleAreaWidth.value > 620 : true
            msgList.value.find(({ id }) => id == id)!.status = res.data.status
        })
        .finally(() => {
            contLoading.value = false
        })
}

// 删除
const deleteMsg = (id: string) => {
    delMsg(id).then((res) => {
        ElMessage({ type: 'success', message: res.msg })
        getMessages()
    })
}

// 列表右键菜单
const ctxMenuList: IBtnOptions[] = [
    {
        name: '删除',
        callback(el) {
            deleteMsg(el.dataset.id!)
        },
    },
    {
        name: '标记为已读',
        callback(el) {
            const id = el.dataset.id
            readById(id!).then((res) => {
                msgList.value.find(({ id }) => id == id)!.status = 1
                ElMessage({ type: 'success', message: res.msg })
            })
        },
    },
    {
        name: '全部已读',
        callback() {
            readAll().then((res) => {
                msgList.value.forEach((item) => {
                    item.status = 1
                })
                ElMessage({ type: 'success', message: res.msg })
            })
        },
    },
]
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixin.scss';
$sidebarWidth: 30%;
.message {
    height: 100%;
    width: 100%;
    .sidebar {
        width: $sidebarWidth;
        height: 100%;
        background: #f7f8fd;
        overflow-y: hidden;
        @include scrollBar;
        &:hover {
            overflow-y: auto;
        }
        .li {
            padding: 10px;
            border-bottom: var(--el-border);
            cursor: pointer;
            position: relative;
            &.active {
                background: #fff;
            }
            .title {
                height: 24px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                word-break: break-all;
                padding-right: 10px;
            }
            .dot {
                position: absolute;
                display: inline-block;
                width: 8px;
                height: 8px;
                background: rgb(252, 107, 45);
                top: 15px;
                right: 10px;
                border-radius: 50%;
            }
        }
    }
    .content {
        position: relative;
        width: calc(100% - $sidebarWidth);
        height: 100%;
        background: #fff;
        padding: 10px 10px 10px 20px;
        text-align: center;
        overflow-y: auto;
        @include scrollBar;
        .title {
            font-size: 115%;
            font-weight: bold;
        }
        .time {
            color: #666;
        }
        .article {
            margin-top: 15px;
            text-align: justify;
            text-indent: 2em;
        }
        .icon {
            display: none;
            width: 36px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            cursor: pointer;
        }
    }
}
@media screen and (max-width: 620px) {
    .message {
        .sidebar {
            width: 100%;
        }
        .content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 20px 20px 50px 20px;
            .icon {
                display: flex;
                position: fixed;
                bottom: 20px;
                left: calc(50% - 18px);
            }
        }
    }
}
</style>
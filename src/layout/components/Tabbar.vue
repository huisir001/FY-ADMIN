<!--
 * @Description: Tabbar
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-10 18:50:20
 * @LastEditTime: 2022-08-09 16:39:07
-->
<template>
    <div ref="tabbarRef" class="tabbar">
        <div class="fy-tabbar-cont" :class="{scroll:showScrollBtn}">
            <div ref="itemBoxRef" class="item-box"
                :style="{transform:`translateX(${translateX}px)`}">
                <div v-for="(item,index) in historyRoutes" :key="item.name" :data-index="index"
                    class="fy-tabbar-item" :class="{act:curRouteName===item.name}"
                    v-contextMenu="ctxMenuList" @click="tabChange(index,$event.target)">
                    <span class="tabbar-item-circle" />
                    <span class="title">{{item.meta.title || item.name.toUpperCase()}}</span>
                    <fy-icon :size="14" name="close" class="icon"
                        @click.stop="deleteRoute(index,$event)" />
                </div>
            </div>
        </div>
        <template v-if="showScrollBtn">
            <div class="scroll-btn prev" :class="{disabled:scrollBtnDisabled[0]}"
                @click="handlePrevBtn()">
                <fy-icon name="arrow-left" class="icon" />
            </div>
            <div class="scroll-btn next" :class="{disabled:scrollBtnDisabled[1]}"
                @click="handleNextBtn()">
                <fy-icon name="arrow-right" class="icon" />
            </div>
        </template>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Tabbar',
}
</script>
 
<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useSysStore,useGetters } from '@/store'
import { useRoute, useRouter } from 'vue-router'

const sysStore = useSysStore()
const getters = useGetters()
const Router = useRouter()
const Route = useRoute()
const tabbarRef = ref()
const itemBoxRef = ref()
const showScrollBtn = ref<boolean>(false)
const scrollBtnDisabled = ref<[boolean, boolean]>([false, false])
const translateX = ref<number>(0)

// 历史路由
const historyRoutes = computed(() => getters.copyHistRoutes)

// 当前路由
const curRouteName = computed(() => Route.name)

// 窗口宽度
const visibleAreaWidth = computed(() => sysStore.visibleAreaWidth)
// 窗口折叠
const sidebarCollapse = computed(() => sysStore.sidebarCollapse)

// 计算滚动超出宽度
const getOverLength = () => itemBoxRef.value.clientWidth - tabbarRef.value.clientWidth

// 设置按钮状态
const setBtnState = (tranX: number) => {
    if (!showScrollBtn.value) return
    if (-tranX >= getOverLength() + 79) {
        scrollBtnDisabled.value = [false, true]
    } else if (tranX >= 0) {
        scrollBtnDisabled.value = [true, false]
    } else {
        scrollBtnDisabled.value = [false, false]
    }
}

// historyRoutes变化要更新showScrollBtn.value
watch(
    historyRoutes,
    (val, oldval) => {
        if (val.length > 0) {
            nextTick(() => {
                // 新增路由
                if (oldval && val.length > oldval.length) {
                    tabChange(
                        val.length - 1,
                        document.querySelector('.fy-tabbar-item.act') as HTMLElement,
                        true
                    )
                }
                showScrollBtn.value = tabbarRef.value ? getOverLength() > 0 : false
                setBtnState(translateX.value)
            })
        }
    },
    { immediate: true }
)

// 监听窗口宽度变化做些事
watch(
    visibleAreaWidth,
    (val, oldVal) => {
        nextTick(() => {
            // 按钮显隐
            showScrollBtn.value = getOverLength() > 0
            // 按钮状态
            setBtnState(translateX.value)

            // 右侧滚到底（右侧按钮置灰时）调整路由tab位置
            if (
                oldVal &&
                val &&
                val > oldVal &&
                showScrollBtn.value &&
                scrollBtnDisabled.value[1]
            ) {
                translateX.value -= getOverLength() + 79 + translateX.value
            }
        })
    },
    { immediate: true }
)

// 监听按钮显隐做些事
watch(showScrollBtn, (val, oldVal) => {
    if (oldVal && !val) {
        // 按钮变为隐藏时，tab归位
        translateX.value = 0
    }
})

// 监听侧边缩放
watch(sidebarCollapse, () => {
    const visibleAreaWidth = sysStore.visibleAreaWidth
    if (visibleAreaWidth && visibleAreaWidth > 768) {
        nextTick(() => {
            const timer = setTimeout(() => {
                showScrollBtn.value = getOverLength() > 0
                clearTimeout(timer)
            }, 400)
        })
    }
})

// 删除路由
const deleteRoute = (index: number, ev: any, el?: HTMLElement) => {
    const delRoute = historyRoutes.value[index]
    const curTabbarItemNode = el
        ? el
        : ev.path.find(
              (item: any) => item.classList && Array.from(item.classList).includes('fy-tabbar-item')
          )

    // 若删除当前路由
    if (delRoute.name === curRouteName.value) {
        // 切换临近路由
        if (index - 1 >= 0) {
            tabChange(index - 1, curTabbarItemNode.previousElementSibling)
        } else if (index + 1 <= historyRoutes.value.length - 1) {
            tabChange(index + 1, curTabbarItemNode.nextElementSibling)
        } else {
            Router.push({ name: 'Home' })
        }
    }
    sysStore.delHistoryRoute(delRoute)
}

// 向左滚
const handlePrevBtn = () => {
    if (translateX.value >= 0) {
        return
    }

    if (translateX.value <= -140) {
        translateX.value += 140
    } else {
        translateX.value = 0
    }
}

// 向右滚
const handleNextBtn = (isTabChange: boolean = false) => {
    if (-translateX.value >= getOverLength() + (isTabChange ? 60 : 79)) {
        return
    }

    // 滚动差值
    const scrollDiffLen = getOverLength() + (isTabChange ? 60 : 79) + translateX.value

    if (scrollDiffLen >= 140) {
        translateX.value -= 140
    } else {
        translateX.value -= scrollDiffLen
    }
}

// 切换tab
function tabChange(index: number, target: HTMLElement, isNew?: boolean) {
    // 切换tab滚动
    if (showScrollBtn.value) {
        const offsetRight = tabbarRef.value.clientWidth - 60 - target.offsetLeft - translateX.value
        const offsetLeft = target.offsetLeft + translateX.value

        // 右侧
        if (offsetRight <= 140) {
            handleNextBtn(true)
        }

        // 左侧
        if (offsetLeft <= 140) {
            handlePrevBtn()
        }
    }

    if (!isNew) {
        // 切换路由
        const { name, path, params } = historyRoutes.value[index]
        Router.push({ name, path, params })
    }
}

// 监听滚动
watch(translateX, (val) => {
    setBtnState(val)
})

// 右键菜单-关闭标签
const ctxMenuList: IBtnOptions[] = [
    {
        name: '关闭该标签',
        callback(el) {
            deleteRoute(Number(el.dataset.index), null, el)
        },
    },
    {
        name: '关闭其他标签',
        callback(el) {
            const routesIndex = Number(el.dataset.index)
            const curRoute = historyRoutes.value[routesIndex]
            tabChange(routesIndex, el)
            sysStore.$patch({ historyRoutes: [curRoute] })
        },
    },
    {
        name: '关闭所有标签',
        callback() {
            Router.push({ name: 'Home' })
            sysStore.clearHistoryRoute()
        },
    },
]
</script>
 
<style scoped lang="scss">
$--tab-height: 30px;
$--tab-border: 1px solid var(--color-tabbar-border);
@mixin fy-tabbar-item-act {
    color: var(--color-tabbar-font-act);
    .icon {
        width: 14px;
        margin-left: 5px;
    }
}
.tabbar {
    position: relative;
    width: 100%;
    background-color: var(--color-tabbar-bg);
    border-top: $--tab-border;
    user-select: none;
    .scroll-btn {
        position: absolute;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: $--tab-height;
        height: $--tab-height;
        top: 0;
        .icon {
            color: var(--el-text-color-regular);
            &:hover {
                color: var(--el-color-primary);
            }
        }
        &.prev {
            left: 0;
            border-right: $--tab-border;
        }
        &.next {
            right: 0;
            border-left: $--tab-border;
        }
        &.disabled {
            opacity: 0.6;
            pointer-events: none;
        }
    }
    .fy-tabbar-cont {
        overflow: hidden;
        &.scroll {
            margin: 0 30px;
            width: calc(100% - 60px);
        }
        .item-box {
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            .fy-tabbar-item {
                display: flex;
                align-items: center;
                height: $--tab-height;
                line-height: $--tab-height;
                padding: 0 15px;
                cursor: help;
                border-right: $--tab-border;
                font-size: var(--el-font-size-extra-small);
                color: var(--color-tabbar-font);
                & > span.tabbar-item-circle {
                    background-color: var(--color-tabbar-circle);
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    margin-right: 5px;
                }
                & > span.title {
                    max-width: 98px;
                    word-break: keep-all;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .icon {
                    transition: 0.3s all;
                    width: 0;
                    margin-left: 0;
                    overflow: hidden;
                    color: var(--color-tabbar-font);
                    svg {
                        transform: scale(0.76);
                    }
                    &:hover {
                        background-color: var(--el-color-danger);
                        color: #fff;
                    }
                }
                &:hover {
                    @include fy-tabbar-item-act;
                    & > span.tabbar-item-circle {
                        background-color: var(--color-tabbar-circle-hov);
                    }
                }
                &.act {
                    @include fy-tabbar-item-act;
                    & > span.tabbar-item-circle {
                        background-color: var(--color-tabbar-circle-act);
                    }
                }
            }
        }
    }
}
</style>
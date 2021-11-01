<!--
 * @Description: Tabbar
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-10 18:50:20
 * @LastEditTime: 2021-11-01 20:59:30
-->
<template>
    <div ref="tabbarRef" class="tabbar">
        <div class="zui-tabbar-cont" :class="{scroll:showScrollBtn}">
            <div ref="itemBoxRef" class="item-box"
                :style="{transform:`translateX(${translateX}px)`}">
                <div v-for="(item,index) in historyRoutes" :key="item.name" :data-index="index"
                    class="zui-tabbar-item" :class="{act:curRouteName===item.name}"
                    v-contextMenu="ctxMenuList" @click="tabChange(index,$event.target)">
                    <span class="tabbar-item-circle" />
                    <span class="title">{{item.meta.title || item.name.toUpperCase()}}</span>
                    <icon :size="14" name="close" @click.stop="deleteRoute(index,$event)" />
                </div>
            </div>
        </div>
        <template v-if="showScrollBtn">
            <div class="scroll-btn prev" :class="{disabled:scrollBtnDisabled[0]}"
                @click="handlePrevBtn()">
                <icon name="arrow-left" />
            </div>
            <div class="scroll-btn next" :class="{disabled:scrollBtnDisabled[1]}"
                @click="handleNextBtn()">
                <icon name="arrow-right" />
            </div>
        </template>
    </div>
</template>
 
<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    name: 'Tabbar',
    setup() {
        const Store = useStore()
        const Router = useRouter()
        const Route = useRoute()
        const tabbarRef = ref()
        const itemBoxRef = ref()
        const showScrollBtn = ref<boolean>(false)
        const scrollBtnDisabled = ref<[boolean, boolean]>([false, false])
        const translateX = ref<number>(0)

        // 历史路由
        const historyRoutes = computed(() => Store.state.sys.historyRoutes)

        // 当前路由
        const curRouteName = computed(() => Route.name)

        // 窗口宽度
        const visibleAreaWidth = computed(() => Store.state.sys.visibleAreaWidth)
        // 窗口折叠
        const sidebarCollapse = computed(() => Store.state.sys.sidebarCollapse)

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
            (val) => {
                if (val.length > 0) {
                    nextTick(() => {
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
            const visibleAreaWidth = Store.state.sys.visibleAreaWidth
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
                      (item: any) =>
                          item.classList && Array.from(item.classList).includes('zui-tabbar-item')
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
            Store.commit('sys/delHistoryRoute', delRoute)
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
        function tabChange(index: number, target: HTMLElement) {
            // 切换tab滚动
            if (showScrollBtn.value) {
                const offsetRight =
                    tabbarRef.value.clientWidth - 60 - target.offsetLeft - translateX.value
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

            // 切换路由
            Router.push(historyRoutes.value[index])
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
                    Store.commit('sys/setStates', { historyRoutes: [curRoute] })
                },
            },
            {
                name: '关闭所有标签',
                callback() {
                    Router.push({ name: 'Home' })
                    Store.commit('sys/clearHistoryRoute')
                },
            },
        ]

        return {
            tabbarRef,
            itemBoxRef,
            showScrollBtn,
            scrollBtnDisabled,
            historyRoutes,
            curRouteName,
            deleteRoute,
            tabChange,
            handlePrevBtn,
            handleNextBtn,
            translateX,
            ctxMenuList,
        }
    },
})
</script>
 
<style scoped lang="scss">
$--tab-height: 30px;
$--tab-border: 1px solid var(--color-grey-lighter);
@mixin zui-tabbar-item-act {
    color: var(--el-text-color-regular);
    &:deep(.el-icon) {
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
        &:deep(.el-icon) {
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
    .zui-tabbar-cont {
        overflow: hidden;
        &.scroll {
            margin: 0 30px;
            width: calc(100% - 60px);
        }
        .item-box {
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            .zui-tabbar-item {
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
                &:deep(.el-icon) {
                    transition: 0.3s all;
                    width: 0;
                    margin-left: 0;
                    overflow: hidden;
                    color: var(--el-text-color-regular);
                    svg {
                        transform: scale(0.76);
                    }
                    &:hover {
                        background-color: var(--el-color-danger);
                        color: #fff;
                    }
                }
                &:hover {
                    @include zui-tabbar-item-act;
                    & > span.tabbar-item-circle {
                        background-color: var(--el-color-primary-light-5);
                    }
                }
                &.act {
                    @include zui-tabbar-item-act;
                    & > span.tabbar-item-circle {
                        background-color: var(--el-color-primary);
                    }
                }
            }
        }
    }
}
</style>
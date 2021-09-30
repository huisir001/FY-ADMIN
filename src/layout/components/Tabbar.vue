<!--
 * @Description: Tabbar
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-10 18:50:20
 * @LastEditTime: 2021-09-30 17:51:19
-->
<template>
    <div ref="tabbarRef" class="tabbar">
        <div class="zui-tabbar-cont" :class="{scroll:showScrollBtn}">
            <div ref="itemBoxRef" class="item-box"
                :style="{transform:`translateX(${translateX}px)`}">
                <div v-for="(item,index) in historyRoutes" :key="item.name" class="zui-tabbar-item"
                    :class="{act:curRouteName===item.name}" @click="tabChange(index,$event)">
                    <span>{{item.meta.title || item.name.toUpperCase()}}</span>
                    <el-icon size="14" @click.stop="deleteRoute(index,$event)">
                        <close />
                    </el-icon>
                </div>
            </div>
        </div>
        <template v-if="showScrollBtn">
            <div class="scroll-btn prev" :class="{disabled:scrollBtnDisabled[0]}"
                @click="handlePrevBtn()">
                <el-icon>
                    <arrow-left />
                </el-icon>
            </div>
            <div class="scroll-btn next" :class="{disabled:scrollBtnDisabled[1]}"
                @click="handleNextBtn()">
                <el-icon>
                    <arrow-right />
                </el-icon>
            </div>
        </template>
    </div>
</template>
 
<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { Close, ArrowLeft, ArrowRight } from '@element-plus/icons'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

interface ITag {
    name: string
    active: boolean
}

export default defineComponent({
    name: 'Tabbar',
    components: { Close, ArrowLeft, ArrowRight },
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
        const historyRoutes = computed(() => Store.state.temp.historyRoutes)

        // 当前路由
        const curRouteName = computed(() => Route.name)

        // 窗口宽度
        const visibleAreaWidth = computed(() => Store.state.temp.visibleAreaWidth)
        // 窗口折叠
        const sidebarCollapse = computed(() => Store.state.temp.sidebarCollapse)

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
                    if (
                        oldVal &&
                        val &&
                        val > oldVal &&
                        showScrollBtn.value &&
                        scrollBtnDisabled.value[1]
                    ) {
                        translateX.value -= getOverLength() + 79 + translateX.value
                    }
                    setBtnState(translateX.value)
                    showScrollBtn.value = getOverLength() > 0
                })
            },
            { immediate: true }
        )

        // 监听侧边缩放
        watch(sidebarCollapse, () => {
            const visibleAreaWidth = Store.state.temp.visibleAreaWidth
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
        const deleteRoute = (index: number, ev: any) => {
            const delRoute = historyRoutes.value[index]
            const curTabbarItemNode = ev.path.find(
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
            Store.commit('temp/delHistoryRoute', delRoute)
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
            const scrollDiffLen = computed(
                () => getOverLength() + (isTabChange ? 60 : 79) + translateX.value
            )

            if (scrollDiffLen.value >= 140) {
                translateX.value -= 140
            } else {
                translateX.value -= scrollDiffLen.value
            }
        }

        // 切换tab
        function tabChange(index: number, ev: any) {
            // 切换tab滚动
            if (showScrollBtn.value) {
                const offsetRight =
                    tabbarRef.value.clientWidth - 60 - ev.target.offsetLeft - translateX.value
                const offsetLeft = ev.target.offsetLeft + translateX.value

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
        }
    },
})
</script>
 
<style scoped lang="scss">
$--tab-height: 30px;
.tabbar {
    position: relative;
    height: $--tab-height;
    width: 100%;
    user-select: none;
    margin-bottom: 10px;
    .scroll-btn {
        position: absolute;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        border-radius: var(--el-border-radius-small);
        background-color: var(--color-tabbar-item-bg);
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
        }
        &.next {
            right: 0;
        }
        &.disabled {
            opacity: 0.6;
            pointer-events: none;
        }
    }
    .zui-tabbar-cont {
        width: 100%;
        overflow: hidden;
        &.scroll {
            margin: 0 30px;
            width: calc(100% - 60px);
        }
        .item-box {
            transition: all 0.3s;
            height: $--tab-height;
            display: inline-flex;
            align-items: center;
            .zui-tabbar-item {
                display: flex;
                align-items: center;
                background-color: var(--color-tabbar-item-bg);
                margin-right: 10px;
                border-radius: var(--el-border-radius-small);
                height: $--tab-height;
                line-height: $--tab-height;
                padding: 0 10px;
                cursor: pointer;
                & > span {
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
                        background-color: var(--el-color-primary);
                        color: #fff;
                    }
                }
                &:hover,
                &.act {
                    color: var(--el-color-primary);
                    &:deep(.el-icon) {
                        width: 14px;
                        margin-left: 5px;
                    }
                }
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>
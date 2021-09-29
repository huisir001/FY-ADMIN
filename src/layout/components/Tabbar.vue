<!--
 * @Description: Tabbar
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-10 18:50:20
 * @LastEditTime: 2021-09-30 00:27:45
-->
<template>
    <div ref="tabbarRef" class="tabbar">
        <div class="zui-tabbar-cont" :class="{scroll:showScrollBtn}">
            <div ref="itemBoxRef" class="item-box">
                <div v-for="item in dynamicTags" :key="item.name" class="zui-tabbar-item">
                    {{item.name}}<el-icon size="14">
                        <close />
                    </el-icon>
                </div>
            </div>
        </div>
        <template v-if="showScrollBtn">
            <div class="scroll-btn prev">
                <el-icon>
                    <arrow-left />
                </el-icon>
            </div>
            <div class="scroll-btn next">
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

interface ITag {
    name: string
    active: boolean
}

export default defineComponent({
    name: 'Tabbar',
    components: { Close, ArrowLeft, ArrowRight },
    setup() {
        const Store = useStore()
        const tabbarRef = ref()
        const itemBoxRef = ref()
        const showScrollBtn = ref<boolean>(false)

        // 窗口宽度
        const visibleAreaWidth = computed(() => Store.state.temp.visibleAreaWidth)
        // 窗口折叠
        const sidebarCollapse = computed(() => Store.state.temp.sidebarCollapse)

        // 监听窗口宽度变化做些事
        watch(
            visibleAreaWidth,
            () => {
                showScrollBtn.value = tabbarRef.value
                    ? itemBoxRef.value.clientWidth > tabbarRef.value.clientWidth
                    : false
            },
            { immediate: true }
        )

        // 监听窗口宽度变化做些事
        watch(sidebarCollapse, () => {
            const visibleAreaWidth = Store.state.temp.visibleAreaWidth
            if (visibleAreaWidth && visibleAreaWidth > 768) {
                nextTick(() => {
                    setTimeout(() => {
                        showScrollBtn.value =
                            itemBoxRef.value.clientWidth > tabbarRef.value.clientWidth
                    }, 400)
                })
            }
        })

        const dynamicTags = ref<ITag[]>([])

        while (dynamicTags.value.length < 10) {
            dynamicTags.value.push({ name: dynamicTags.value.length * 1000000 + '', active: false })
        }

        console.log(dynamicTags)

        const tagChange = (index: number) => {
            console.log(index)
            dynamicTags.value[index].active = !dynamicTags.value[index].active
        }
        return {
            tabbarRef,
            itemBoxRef,
            showScrollBtn,
            dynamicTags,
            tagChange,
            editableTabsValue: ref(111),
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
    }
    .zui-tabbar-cont {
        width: 100%;
        overflow: hidden;
        &.scroll {
            margin: 0 30px;
            width: calc(100% - 60px);
        }
        .item-box {
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
                &:hover {
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
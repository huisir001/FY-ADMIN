<!--
 * @Description: Tabbar
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-10 18:50:20
 * @LastEditTime: 2021-09-28 19:39:32
-->
<template>
    <div class="tabbar">
        <el-tabs type="card" closable>
            <el-tab-pane v-for="item in dynamicTags" :key="item.name" :label="item.name" lazy>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
 
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'Tabbar',
    setup() {
        const dynamicTags = ref([
            {
                name: 111,
                active: false,
            },
            {
                name: 222,
                active: false,
            },
            {
                name: 333,
                active: false,
            },
            {
                name: 444,
                active: false,
            },
            {
                name: 555,
                active: false,
            },
            {
                name: 666,
                active: false,
            },
            {
                name: 777,
                active: false,
            },
            {
                name: 888,
                active: false,
            },
            {
                name: 999,
                active: false,
            },
            {
                name: 100,
                active: false,
            },
            {
                name: 101,
                active: false,
            },
            {
                name: 102,
                active: false,
            },
            {
                name: 103,
                active: false,
            },
            {
                name: 104,
                active: false,
            },
        ])

        const tagChange = (index: number) => {
            console.log(index)
            dynamicTags.value[index].active = !dynamicTags.value[index].active
        }
        return {
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
    height: $--tab-height;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: var(--el-border-radius-small);
    &:deep(.el-tabs) {
        width: 100%;
        .el-tabs__header {
            border: 0;
            margin: 0;
        }
        .el-tabs__nav-next,
        .el-tabs__nav-prev {
            line-height: $--tab-height;
            height: $--tab-height;
            background-color: var(--color-tabbar-item-bg);
            border-radius: var(--el-border-radius-small);
            width: 20px;
            text-align: center;
            font-size: 14px;
        }
        .el-tabs__nav-wrap.is-scrollable {
            padding: 0 30px;
        }
        .el-tabs__item {
            background-color: var(--color-tabbar-item-bg);
            margin-right: 10px;
            border: 0;
            border-radius: var(--el-border-radius-small);
            height: $--tab-height;
            line-height: $--tab-height;
            padding: 0 10px;
            .el-icon-close {
                margin-left: 3px;
                line-height: 14px;
                border-radius: 0;
                &:hover {
                    background-color: var(--el-color-primary);
                }
            }
            &:last-child {
                margin-right: 0;
            }
        }
        .el-tabs__nav {
            border: 0;
            border-radius: 0;
        }
        .el-tabs__nav-wrap {
            margin: 0;
        }
        & > .el-tabs__header .el-tabs__item.is-active.is-closable {
            padding-left: 10px;
            padding-right: 10px;
        }
        .el-tabs--left > .el-tabs__header .el-tabs__item:nth-child(2),
        .el-tabs--right > .el-tabs__header .el-tabs__item:nth-child(2),
        & > .el-tabs__header .el-tabs__item:nth-child(2),
        & > .el-tabs__header .el-tabs__item:nth-child(2),
        .el-tabs--left > .el-tabs__header .el-tabs__item:nth-child(2),
        .el-tabs--right > .el-tabs__header .el-tabs__item:nth-child(2),
        & > .el-tabs__header .el-tabs__item:nth-child(2),
        & > .el-tabs__header .el-tabs__item:nth-child(2) {
            padding-left: 10px;
        }
        .el-tabs--left > .el-tabs__header .el-tabs__item:last-child,
        .el-tabs--right > .el-tabs__header .el-tabs__item:last-child,
        & > .el-tabs__header .el-tabs__item:last-child,
        & > .el-tabs__header .el-tabs__item:last-child,
        .el-tabs--left > .el-tabs__header .el-tabs__item:last-child,
        .el-tabs--right > .el-tabs__header .el-tabs__item:last-child,
        & > .el-tabs__header .el-tabs__item:last-child,
        & > .el-tabs__header .el-tabs__item:last-child {
            padding-right: 10px;
        }
    }
}
</style>
<!--
 * @Description: 主题设置抽屉
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-23 14:38:39
 * @LastEditTime: 2022-08-09 16:40:06
-->
<template>
    <el-drawer :title="$t('components.ThemeSet.5hcvwyvsu1o0')" :size="280"
        custom-class="fy-theme-drawer">
        <div class="part">
            <h5>{{$t('components.ThemeSet.5hcvwyvsxkc0')}}</h5>
            <div class="set-box row">
                <div v-for="item in THEME_OPTIONS" :key="item.name" :style="{background:item.color}"
                    class="theme-color-radio" @click="selectColor(item.name)">
                    <fy-icon v-if="curThemeColorState==item.name" name="check" color="#fff"
                        size="20" />
                </div>
            </div>
        </div>
        <div class="part">
            <h5>{{$t('components.ThemeSet.5hcvwyvsy4s0')}}</h5>
            <div class="set-box column">
                <el-switch v-model="curPageTagNavState"
                    :inactive-text="$t('components.ThemeSet.5hcvwyvsyic0')">
                </el-switch>
                <el-switch v-model="curBreadcrumbState"
                    :inactive-text="$t('components.ThemeSet.5hcvwyvsyuk0')">
                </el-switch>
                <el-switch v-model="curLogoState"
                    :inactive-text="$t('components.ThemeSet.5hcvwyvsz740')">
                </el-switch>
            </div>
        </div>
    </el-drawer>
</template>

<script lang="ts">
export default { name: 'ThemeSetDrawer' }
</script>

 
<script lang="ts" setup>
import { computed } from 'vue'
import { THEME_OPTIONS } from 'settings'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()

// 主题配置
const curThemeColorState = computed(() => themeStore.color)
const curPageTagNavState = computed({
    get: () => themeStore.showPageTagNav,
    set: (val) => {
        themeStore.setStates({
            showPageTagNav: val,
        })
    },
})
const curBreadcrumbState = computed({
    get: () => themeStore.showBreadcrumb,
    set: (val) => {
        themeStore.setStates({
            showBreadcrumb: val,
        })
    },
})
const curLogoState = computed({
    get: () => themeStore.showLogo,
    set: (val) => {
        themeStore.setStates({
            showLogo: val,
        })
    },
})

// 主题色改变
const selectColor = (val: string) => {
    themeStore.setStates({
        color: val,
    })
}
</script>
 
<style scoped lang="scss">
.part {
    margin-bottom: 40px;
    h5 {
        color: var(--el-text-color-primary);
    }
    .set-box {
        margin-top: 20px;
        display: flex;
        &.row {
            flex-direction: row;
        }
        &.column {
            flex-direction: column;
            &:deep(.el-switch) {
                justify-content: space-between;
                & + .el-switch {
                    margin-top: 15px;
                }
            }
            &:deep(.el-switch__label, .el-switch__label.is-active) {
                color: var(--el-text-color-regular);
            }
        }
    }
    .theme-color-radio {
        width: 30px;
        height: 30px;
        border-radius: var(--el-border-radius-small);
        margin-right: 10px;
        cursor: pointer;
        padding: 5px;
    }
}
</style>
<style  lang="scss">
.fy-theme-drawer {
    .el-drawer__header {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: bold;
        color: var(--el-text-color-primary);
    }
}
</style>
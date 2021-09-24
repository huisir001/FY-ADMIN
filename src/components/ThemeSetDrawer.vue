<!--
 * @Description: 主题设置抽屉
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-23 14:38:39
 * @LastEditTime: 2021-09-24 10:35:23
-->
<template>
    <el-drawer title="主题配置" :size="280" custom-class="zui-theme-drawer">
        <div class="part">
            <h5>主题色</h5>
            <div class="set-box" style="display:flex">
                <div v-for="item in ThemeColorList" :key="item.name"
                    :style="{background:item.color}" class="theme-color-radio"
                    @click="selectColor(item.name)">
                    <el-icon v-if="curThemeState.color==item.name" color="#fff" :size="20">
                        <Check />
                    </el-icon>
                </div>
            </div>
        </div>
        <div class="part">
            <h5>内容区</h5>

        </div>
    </el-drawer>
</template>
 
<script lang="ts">
import { computed, defineComponent } from 'vue'
const { ThemeColorList } = require('@/settings/common.ts')
import { Check } from '@element-plus/icons'
import { useStore } from '@/store'

export default defineComponent({
    name: 'ThemeSetDrawer',
    components: {
        Check,
    },
    setup() {
        const Store = useStore()

        // 主题配置
        const curThemeState = computed(() => {
            const { color, showPageTagNav, showBreadcrumb } = Store.state.theme
            return {
                color,
                showPageTagNav,
                showBreadcrumb,
            }
        })

        // 主题色改变
        const selectColor = (val: string) => {
            Store.commit('theme/setStates', {
                color: val,
            })
        }

        return {
            ThemeColorList: ThemeColorList.map((item: any) => ({
                name: item.name,
                color: item.color,
            })),
            curThemeState,
            selectColor,
        }
    },
})
</script>
 
<style scoped lang="scss">
.part {
    margin-bottom: 40px;
    h5 {
        color: var(--el-text-color-regular);
    }
    .set-box {
        margin-top: 20px;
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
.zui-theme-drawer {
    .el-drawer__header {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: bold;
    }
}
</style>
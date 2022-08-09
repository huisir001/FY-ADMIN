/*
 * @Description: 初始化操作，与app.vue合并
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-27 10:16:21
 * @LastEditTime: 2022-08-09 17:18:58
 */
import useWinResize from './hooks/useWinResize'
import { useThemeStore } from '@/store'

export default {
    created() {
        // 初始化主题色
        const themeStore = useThemeStore()
        themeStore.setStates({ color: themeStore.color })
        // 执行监听窗口resize
        useWinResize()
    },
}
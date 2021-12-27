/*
 * @Description: 初始化操作，与app.vue合并
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-27 10:16:21
 * @LastEditTime: 2021-12-27 10:31:37
 */
import { useStore } from '@/store'
import useWinResize from './hooks/useWinResize'

export default {
    created() {
        // 初始化主题色
        const store = useStore()
        store.commit('theme/setStates', {
            color: store.state.theme.color,
        })
        // 执行监听窗口resize
        useWinResize()
    },
}
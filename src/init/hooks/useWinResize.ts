/*
 * @Description: 浏览器缩放处理，用于layout
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-16 17:00:21
 * @LastEditTime: 2021-12-27 10:49:28
 */

import { debounce } from '@/ui/helpers'
import { useStore } from '@/store'

/**
 * 浏览器缩放事件,防抖
 * 注意：只调用一次(在App.vue中调用)
 */
export default () => {
    const Store = useStore()

    window.onresize = debounce(() => {

        const currWidth = window.innerWidth
        const currHeight = window.innerHeight

        if (Store.state.sys.visibleAreaWidth !== currWidth) {
            // 更改屏幕可视区宽度缓存
            Store.commit('sys/setStates', {
                visibleAreaWidth: currWidth
            })
        }
        if (Store.state.sys.visibleAreaHeight !== currHeight) {
            // 更改屏幕可视区高度缓存
            Store.commit('sys/setStates', {
                visibleAreaHeight: currHeight
            })
        }

    }, 200)
}

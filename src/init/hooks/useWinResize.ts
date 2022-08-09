/*
 * @Description: 浏览器缩放处理，用于layout
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-16 17:00:21
 * @LastEditTime: 2022-08-09 15:36:12
 */

import { debounce } from '@/ui/helpers'
import { useSysStore } from '@/store'

/**
 * 浏览器缩放事件,防抖
 * 注意：只调用一次(在App.vue中调用)
 */
export default () => {
    const sysStore = useSysStore()

    window.onresize = debounce(() => {

        const currWidth = window.innerWidth
        const currHeight = window.innerHeight

        if (sysStore.visibleAreaWidth !== currWidth) {
            // 更改屏幕可视区宽度缓存
            sysStore.$patch({ visibleAreaWidth: currWidth })
        }
        if (sysStore.visibleAreaHeight !== currHeight) {
            // 更改屏幕可视区高度缓存
            sysStore.$patch({ visibleAreaHeight: currHeight })
        }

    }, 200)
}

/*
 * @Description: 浏览器缩放处理，用于layout
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-16 17:00:21
 * @LastEditTime: 2021-09-18 19:24:12
 */

import { debounce } from "@/utils/common"
import { useStore } from "@/store"

/**
 * 浏览器缩放事件,防抖
 * 注意：只调用一次(在layout中调用)
 */
export default () => {
    const Store = useStore()

    window.onresize = debounce(() => {

        // 更改屏幕可视区宽度缓存
        Store.commit('temp/setStates', {
            visibleAreaWidth: window.innerWidth
        })

    }, 200)
}

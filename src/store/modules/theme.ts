/*
 * @Description: 主题配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 16:27:56
 * @LastEditTime: 2021-09-13 14:47:01
 */
const { ThemeColorList } = require("@/settings/system")
import LocalCache from '@/utils/LocalCache'
import DomCreate from '@/utils/DomCreate';

/**
 * 初始化状态
 */
const {
    color: c_color,
    showPageTagNav: c_showPageTagNav,
    showBreadcrumb: c_showBreadcrumb
} = LocalCache.getCache(LocalCache.Theme) || {}


export default {
    namespaced: true,
    state: () => ({
        /**
         * 主题配色
         */
        color: c_color || ThemeColorList.find((item: any) => item.default).name,

        /**
         * 页面标签栏显隐
         */
        showPageTagNav: c_showPageTagNav === undefined ? true : c_showPageTagNav,

        /**
         * 面包屑显隐
         */
        showBreadcrumb: c_showBreadcrumb === undefined ? true : c_showBreadcrumb,

        /**
         * 样式dom
         */
        linkEl: new DomCreate('link', { rel: "stylesheet", type: "text/css" })
    }),
    mutations: {
        /**
         * 修改状态
         */
        setStates(state: IObj, obj: IObj) {
            // 主题色更改
            if (obj.color) {
                state.linkEl.setAttr("href", ThemeColorList.find((item: any) => item.name == obj.color).cssPath)
                if (document.head.getElementsByClassName(state.linkEl.className).length == 0) {
                    document.head.append(state.linkEl.getElement())
                }
            }
            // 状态更新
            Object.keys(obj).forEach((key) => {
                state[key] = obj[key]
            })
            // 缓存
            const { color, showPageTagNav, showBreadcrumb } = state
            LocalCache.setCache(LocalCache.Theme, { color, showPageTagNav, showBreadcrumb })
        },
    },
}
/*
 * @Description: 主题配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 16:27:56
 * @LastEditTime: 2021-09-21 00:46:50
 */
// tslint:disable-next-line:no-var-requires
const { ThemeColorList, LocalCacheConf } = require("@/settings/common.ts")
import LocalCache from '@/utils/LocalCache'
import DomCreate from '@/utils/DomCreate'
/**
 * 初始化状态
 */
const {
    color: C_COLOR,
    showPageTagNav: C_SHOW_PAGE_TAG_NAV,
    showBreadcrumb: C_SHOW_BREAD_CRUMB
} = LocalCache.getCache(LocalCacheConf.Theme) || {}

/**
 * 用户state接口
 */
export interface IThemeState extends IObj {
    color?: string
    showPageTagNav?: boolean
    showBreadcrumb?: boolean
    linkEl?: DomCreate
}

export const theme = {
    namespaced: true,
    state: {
        /**
         * 主题配色
         */
        color: C_COLOR || ThemeColorList.find((item: any) => item.default).name,

        /**
         * 页面标签栏显隐
         */
        showPageTagNav: C_SHOW_PAGE_TAG_NAV === undefined ? true : C_SHOW_PAGE_TAG_NAV,

        /**
         * 面包屑显隐
         */
        showBreadcrumb: C_SHOW_BREAD_CRUMB === undefined ? true : C_SHOW_BREAD_CRUMB,

        /**
         * 样式dom
         */
        linkEl: new DomCreate('style', { type: "text/css" })
    },
    mutations: {
        /**
         * 修改状态
         */
        async setStates(state: IObj, obj: IObj) {
            // 主题色更改
            if (obj.color) {
                const themeStyle = await ThemeColorList.find((item: any) => item.name === obj.color).loadStyle()
                const themeStyleStr = JSON.stringify(themeStyle.default).replace(/[",]/g, (e) => {
                    return e === '"' ? '' : ';'
                })

                state.linkEl.innerText(':root' + themeStyleStr)

                // 判断是否已经插入元素
                if (document.head.getElementsByClassName(state.linkEl.className).length === 0) {
                    document.head.append(state.linkEl.getElement())
                }
            }
            // 状态更新
            Object.keys(obj).forEach((key) => {
                state[key] = obj[key]
            })
            // 缓存
            const { color, showPageTagNav, showBreadcrumb } = state
            LocalCache.setCache(LocalCacheConf.Theme, { color, showPageTagNav, showBreadcrumb })
        },
    },
}
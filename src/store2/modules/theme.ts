/*
 * @Description: 主题配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 16:27:56
 * @LastEditTime: 2022-03-02 11:14:37
 */
import { STORAGE_OPTIONS, THEME_OPTIONS } from 'settings'
import LocalCache from '@/utils/LocalCache'
import DomCreate from '@/utils/DomCreate'

/**
 * 初始化状态
 */
const {
    color: C_COLOR,
    showPageTagNav: C_SHOW_PAGE_TAG_NAV,
    showBreadcrumb: C_SHOW_BREAD_CRUMB,
    showLogo: C_SHOW_LOGO,
} = LocalCache.getCache(STORAGE_OPTIONS.Theme) || {}

/**
 * 用户state接口
 */
export interface IThemeState extends IObj {
    color?: string
    showPageTagNav?: boolean
    showBreadcrumb?: boolean
    showLogo?: boolean
    linkEl?: DomCreate
}

export const theme = {
    namespaced: true,
    state: {
        /**
         * 主题配色
         */
        color: C_COLOR || THEME_OPTIONS.find((item: any) => item.default)!.name,

        /**
         * 页面标签栏显隐
         */
        showPageTagNav: C_SHOW_PAGE_TAG_NAV === undefined ? true : C_SHOW_PAGE_TAG_NAV,

        /**
         * 面包屑显隐
         */
        showBreadcrumb: C_SHOW_BREAD_CRUMB === undefined ? true : C_SHOW_BREAD_CRUMB,

        /**
         * LOGO显隐
         */
        showLogo: C_SHOW_LOGO === undefined ? true : C_SHOW_LOGO,

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
                const themeStyle = await THEME_OPTIONS.find((item: any) => item.name === obj.color)!.loadStyle()
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
            const { color, showPageTagNav, showBreadcrumb, showLogo } = state
            LocalCache.setCache(STORAGE_OPTIONS.Theme, { color, showPageTagNav, showBreadcrumb, showLogo })
        },
    },
}
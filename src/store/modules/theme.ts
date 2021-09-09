/*
 * @Description: 主题配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 16:27:56
 * @LastEditTime: 2021-09-09 19:08:53
 */
const { ThemeColorList } = require("@/settings/system")
import LocalCache from '@/utils/LocalCache'
import DomCreate from '@/utils/DomCreate';
export default {
    namespaced: true,
    state: () => ({
        /**
         * 主题配色
         */
        color: '',

        /**
         * 页面标签栏显隐
         */
        showPageTagNav: true,

        /**
         * 面包屑显隐
         */
        showBreadcrumb: true,

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
                document.head.append(state.linkEl.getElement())
            }
            // 状态更新
            Object.keys(obj).forEach((key) => {
                state[key] = obj[key]
            })
            // 缓存
            LocalCache.setCache(LocalCache.Theme, state)
        },
    },
}
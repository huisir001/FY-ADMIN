/*
 * @Description: 主题配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 16:27:56
 * @LastEditTime: 2021-09-09 17:35:49
 */
const { ThemeColorList } = require("@/settings/system")
import LocalCache from '@/utils/LocalCache'
export default {
    state: () => ({
        /**
         * 主题配色
         */
        color: ThemeColorList.find((item: any) => item.default).name,

        /**
         * 页面标签栏显隐
         */
        showPageTagNav: true,

        /**
         * 面包屑显隐
         */
        showBreadcrumb: true,
    }),
    mutations: {
        /**
         * 修改状态
         */
        setStates(state: IObj, obj: IObj) {
            // 状态更新
            Object.keys(obj).forEach((key) => {
                state[key] = obj[key]
            })
            // 缓存
            LocalCache.setCache(LocalCache.Theme, state)
        },
    },
}
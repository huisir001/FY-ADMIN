/*
 * @Description:getters-包装 state 数据
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-18 17:04:48
 * @LastEditTime: 2021-09-24 23:27:46
 */
import LocalCache from '@/utils/LocalCache'
// tslint:disable-next-line:no-var-requires
const { LocalCacheConf } = require("@/settings/common.ts")
export default {
    /**
     * 取Token
     * Token存store和localStorage两处,防止用户在登录状态清理浏览器缓存
     * 查询时若一处被清理则回填
     * getter在返回一个函数时，函数的返回值不会被缓存
     */
    getToken: (state: any) => () => {
        const C_TOKEN = LocalCache.getCache(LocalCacheConf.Token)
        const S_TOKEN = state.user.token

        if (C_TOKEN) {
            state.user.token = C_TOKEN
            return C_TOKEN
        } else if (S_TOKEN) {
            LocalCache.setCache(LocalCacheConf.Token, S_TOKEN)
            return S_TOKEN
        } else {
            return null
        }
    },

    /**
     * 复制userInfo
     */
    copyUserInfo: (state: any) => JSON.parse(JSON.stringify(state.user.userInfo))
}
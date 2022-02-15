/*
 * @Description:getters-包装 state 数据
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-18 17:04:48
 * @LastEditTime: 2022-02-15 10:59:31
 */
import LocalCache from '@/utils/LocalCache'
import { STORAGE_OPTIONS } from 'settings'
import { IState } from './index'
export default {
    /**
     * 取Token
     * Token存store和localStorage两处,防止用户在登录状态清理浏览器缓存
     * 查询时若一处被清理则回填
     * getter在返回一个函数时，函数的返回值不会被缓存
     */
    getToken: (state: IState) => () => {
        const C_TOKEN = LocalCache.getCache(STORAGE_OPTIONS.Token)
        const S_TOKEN = state.user.token

        if (C_TOKEN) {
            state.user.token = C_TOKEN
            return C_TOKEN
        } else if (S_TOKEN) {
            LocalCache.setCache(STORAGE_OPTIONS.Token, S_TOKEN)
            return S_TOKEN
        } else {
            return null
        }
    },

    /**
     * 拷贝userInfo
     */
    copyUserInfo: (state: IState) => JSON.parse(JSON.stringify(state.user.userInfo)),

    /**
     * 拷贝menu
     */
    copyUserMenu: (state: IState) => JSON.parse(JSON.stringify(state.user.menus)),

    /**
     * 拷贝historyRoutes
     */
    copyHistRoutes: (state: IState) => JSON.parse(JSON.stringify(state.sys.historyRoutes))
}
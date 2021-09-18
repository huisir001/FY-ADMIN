/*
 * @Description:getters-包装 state 数据
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-18 17:04:48
 * @LastEditTime: 2021-09-18 17:25:42
 */
import LocalCache from '@/utils/LocalCache'

export default {
    /**
     * 取Token
     * Token存store和localStorage两处,防止用户在登录状态清理浏览器缓存
     * getter在返回一个函数时，函数的返回值不会被缓存
     */
    getToken: (state: any) => () => LocalCache.getCache(LocalCache.Token) || state.user.token
}
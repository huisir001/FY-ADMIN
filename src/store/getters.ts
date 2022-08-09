/*
 * @Description: 计算数据
 * @Autor: HuiSir<github.com/huisir001>
 * @Date: 2022-08-09 10:58:04
 * @LastEditTime: 2022-08-09 11:08:56
 */
import { defineStore } from 'pinia'
import { computed } from 'vue'
import LocalCache from '@/utils/LocalCache'
import { STORAGE_OPTIONS } from 'settings'
import useUserStore from './modules/user'
import useSysStore from './modules/sys'

export default defineStore('getters', () => {
    /**
     * 取Token
     * Token存store和localStorage两处,防止用户在登录状态清理浏览器缓存
     * 查询时若一处被清理则回填
     * getter在返回一个函数时，函数的返回值不会被缓存
     */
    const getToken = computed(() => {
        const { token: S_TOKEN, setStates } = useUserStore()
        const C_TOKEN = LocalCache.getCache(STORAGE_OPTIONS.Token)
        if (C_TOKEN) {
            setStates({ token: C_TOKEN })
            return C_TOKEN
        } else if (S_TOKEN) {
            LocalCache.setCache(STORAGE_OPTIONS.Token, S_TOKEN)
            return S_TOKEN
        } else {
            return null
        }
    })
    /**
     * 拷贝userInfo
     */
    const copyUserInfo = computed(() => JSON.parse(JSON.stringify(useUserStore().userInfo)))
    /**
     * 拷贝menu
     */
    const copyUserMenu = computed(() => JSON.parse(JSON.stringify(useUserStore().menus)))
    /**
     * 拷贝historyRoutes
     */
    const copyHistRoutes = computed(() => JSON.parse(JSON.stringify(useSysStore().historyRoutes)))


    return {
        getToken,
        copyUserInfo,
        copyUserMenu,
        copyHistRoutes
    }
})
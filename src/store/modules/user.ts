/*
 * @Description: 用户信息
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-07 16:10:06
 * @LastEditTime: 2021-09-22 16:40:27
 */
// tslint:disable-next-line:no-var-requires
const { LocalCacheConf } = require("@/settings/common.ts")
import { ActionContext } from 'vuex'
import { doLogin, doLogout } from '@/api/user'
import LocalCache from '@/utils/LocalCache'
import { ElMessage } from 'element-plus'
import router from '@/router'

/**
 * 用户state接口
 */
export interface IUserState extends IObj {
    loginStatus?: 0 | 1 | 2
    token?: string | null
    userInfo?: IObj | null
}

export const user = {
    namespaced: true,
    state: {
        /**
         * 登录状态
         * 0-未登录 1-已登录 2-登录失效(弹出登陆框)
         */
        loginStatus: 0,

        /**
         * Token 存这里和localStorage两处
         * 防止用户在登录状态清理浏览器缓存
         */
        token: null,

        /**
         * 缓存用户信息
         * 刷新页面重新拉取
         */
        userInfo: null
    },
    mutations: {
        /**
         * 修改状态
         */
        setStates(state: IUserState, obj: IUserState) {
            Object.keys(obj).forEach((key) => {
                state[key] = obj[key]
            })
        },
        /**
         * 修改token
         */
        setToken(state: IUserState, token: string) {
            state.token = token
            LocalCache.setCache(LocalCacheConf.Token, token)
        },
        /**
         * 删除token
         */
        removeToken(state: IUserState, token: string) {
            state.token = null
            LocalCache.removeCache(LocalCacheConf.Token)
        },
        /**
         * 清除登陆状态
         */
        clearLoginState(state: IUserState) {
            state.loginStatus = 0
            state.token = null
            state.userInfo = null
            LocalCache.removeCache(LocalCacheConf.Token)
        }
    },
    actions: {
        /**
         * 登录
         */
        async login({ commit }: ActionContext<{}, {}>, loginData: IUserInfo) {
            const { ok, data, token } = await doLogin(loginData)
            if (ok === 1) {
                // 登录成功
                commit('setStates', { loginStatus: 1, token, userInfo: data })
                // 缓存token
                LocalCache.setCache(LocalCacheConf.Token, token)
                // 若为登录页，跳转到首页或query中的历史页
                const { name, query } = router.currentRoute.value
                if (name === 'Login') {
                    router.replace((query.redirect as string) || '/')
                }
            }
        },

        /**
         * 登出
         */
        async logout({ commit }: ActionContext<{}, {}>) {
            const { ok } = await doLogout()
            if (ok) {
                // 状态设置
                commit('clearLoginState')

                // 提示
                ElMessage({ type: 'success', message: '已登出' })
                router.replace({ name: 'Login' })
            }
        },
    },
}
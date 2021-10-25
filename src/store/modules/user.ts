/*
 * @Description: 用户信息
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-07 16:10:06
 * @LastEditTime: 2021-10-25 14:59:12
 */
import { STORAGE_OPTIONS } from '@/settings'
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
            LocalCache.setCache(STORAGE_OPTIONS.Token, token)
        },
        /**
         * 删除token
         */
        removeToken(state: IUserState, token: string) {
            state.token = null
            LocalCache.removeCache(STORAGE_OPTIONS.Token)
        },
        /**
         * 清除登陆状态
         */
        clearLoginState(state: IUserState) {
            state.loginStatus = 0
            state.token = null
            state.userInfo = null
            LocalCache.removeCache(STORAGE_OPTIONS.Token)
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
                LocalCache.setCache(STORAGE_OPTIONS.Token, token)
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
        async logout() {
            const { ok } = await doLogout()
            if (ok) {
                ElMessage({ type: 'success', message: '已登出' })
                // 清除登录状态已在路由钩子中处理，这里不处理
                router.replace({ name: 'Login' })
            }
        },
    },
}
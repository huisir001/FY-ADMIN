/*
 * @Description: 用户信息
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-07 16:10:06
 * @LastEditTime: 2021-09-18 19:45:34
 */
import { ActionContext } from 'vuex'
import { doLogin, doLogout } from '@/api/user'
import LocalCache from '@/utils/LocalCache'
import { ElMessage } from 'element-plus'

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
         * 0-未登录 1-已登录 2-登录失效
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
    },
    actions: {
        /**
         * 登录
         */
        async login({ commit }: ActionContext<{}, {}>, loginData: ISignupData) {
            const { ok, data, token } = await doLogin(loginData)
            if (ok === 1) {
                // 登录成功
                commit('setStates', { loginStatus: 1, token, userInfo: data })
                // 缓存token
                LocalCache.setCache(LocalCache.Token, token)
                console.log("登录成功")
                // 判断当前路由，若为登录页，则跳转到首页或query中的历史页
                // if () {
                //      // vm.$router.replace({ name: 'Home' })
                // }
            }
        },

        /**
         * 登出
         */
        async logout({ commit }: ActionContext<{}, {}>, vm: any) {
            const { ok } = await doLogout()
            if (ok === 1) {
                // 状态设置
                commit('setStates', { loginStatus: 0, token: null, userInfo: null })

                // 删token缓存
                sessionStorage.removeCache(LocalCache.Token)

                // 提示
                ElMessage({
                    type: 'success',
                    message: '退出登录成功',
                    onClose() {
                        // 跳转到登录页
                        // vm.$router.replace({ name: 'Startup' })
                    }
                })

            }
        },
    }
}
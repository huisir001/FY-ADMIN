/*
 * @Description: 用户信息
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-07 16:10:06
 * @LastEditTime: 2022-08-05 18:38:15
 */
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { STORAGE_OPTIONS } from 'settings'
import { doLogin, doLogout } from '@/api/user'
import LocalCache from '@/utils/LocalCache'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { menu2Route } from '../helpers'
import { getUserMenus } from '@/api/user'
import { MenuType } from '@/ui/helpers'

/**
 * 用户state接口
 */
export interface IUserState extends IObj {
    loginStatus?: 0 | 1 | 2
    token?: string | null
    userInfo?: IObj | null
    menus: IMenu[]
    dynamicRoutes: string[]
}

export default defineStore('user', () => {
    const state: IUserState = reactive({
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
        userInfo: null,
        /**
         * 菜单列表
         */
        menus: [],
        /**
         * 新增的动态路由name列表
         */
        dynamicRoutes: []
    })

    /**
     * 修改状态
     */
    const setStates = (obj: IObj) => {
        Object.keys(obj).forEach((key) => {
            state[key] = obj[key]
        })
    }
    /**
     * 修改token
     */
    const setToken = (token: string) => {
        state.token = token
        LocalCache.setCache(STORAGE_OPTIONS.Token, token)
    }
    /**
     * 删除token
     */
    const removeToken = (token: string) => {
        state.token = null
        LocalCache.removeCache(STORAGE_OPTIONS.Token)
    }
    /**
     * 清除登陆状态
     */
    const clearLoginState = () => {
        state.loginStatus = 0
        state.token = null
        state.userInfo = null
        LocalCache.removeCache(STORAGE_OPTIONS.Token)
    }
    /**
     * 清除菜单及路由
     */
    const clearAllMenuAndRoute = () => {
        // 清除路由
        state.dynamicRoutes.forEach((routeName: string) => {
            router.removeRoute(routeName)
        })
        // 清除菜单
        state.menus = []
    }

    /**
     * 登录
     */
    const login = async (loginData: IUserInfo) => {
        const { ok, data, token } = await doLogin(loginData)
        if (ok === 1) {
            // 登录之后查目录，处理转换为tree格式并动态添加到路由缓存
            await getMenus()

            // 登录成功缓存用户
            setStates({ loginStatus: 1, token, userInfo: data })

            // 缓存token
            LocalCache.setCache(STORAGE_OPTIONS.Token, token)

            // 若为登录页，跳转到首页或query中的历史页
            const { name, query } = router.currentRoute.value
            if (name === 'Login') {
                router.replace((query.redirect as string) || '/')
            }
        }
    }

    /**
     * 登出
     */
    const logout = async () => {
        const { ok } = await doLogout()
        if (ok) {
            ElMessage({ type: 'success', message: '已登出' })
            // 清除登录状态已在路由钩子中处理，这里不处理
            router.replace({ name: 'Login' })
        }
    }

    /**
     * 查询菜单列表
     * 后端通过登录用户查询所属的菜单
     * 此处查出的并非所有菜单，而是当前用户的菜单列表
     * 菜单管理功能页只有admin有权限
     */
    const getMenus = async () => {
        const { ok, data = [] } = await getUserMenus()
        if (ok) {

            // 更新列表
            setStates({ menus: data })

            // 动态路由缓存
            const dynamicRoutes = []

            // 动态添加路由
            // 重新登录后这里无需考虑路由会重复。相同name的路由会覆盖先前路由
            for (let index = 0; index < data.length; index++) {
                const menu = data[index];
                const { parentId, type, status, blank } = menu

                if (type === MenuType.route && status) {

                    const Route = menu2Route(menu)

                    router.addRoute('Home', Route)
                    // 缓存动态路由name表（父级）
                    dynamicRoutes.push(Route.name)
                }
            }

            // 设置缓存动态路由name
            setStates({ dynamicRoutes })
        }
    }

    return {
        ...toRefs(state),
        setStates,
        setToken,
        removeToken,
        clearLoginState,
        clearAllMenuAndRoute,
        login,
        logout,
        getMenus
    }
})
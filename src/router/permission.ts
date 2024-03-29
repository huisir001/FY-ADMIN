/*
 * @Description: 跳转权限-路由前置钩子
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-17 19:28:46
 * @LastEditTime: 2022-08-09 17:06:10
 */
import { getUserInfo } from '@/api/user'
import { NavigationGuardWithThis } from 'vue-router'
import { useUserStore, useSysStore, useGetters } from '@/store'
import PageLoading from '@/utils/PageLoading'

const permission: NavigationGuardWithThis<void> = async (to, from, next) => {

    // 加载loading
    PageLoading.show()

    // store
    const userStore = useUserStore()
    const sysStore = useSysStore()
    const getters = useGetters()

    // 若跳登录页，则清除登陆状态，直接跳转
    if (to.name === 'Login') {
        // 清除登录状态
        userStore.clearLoginState()
        // 清除菜单和路由
        userStore.clearAllMenuAndRoute()
        // 清除TAB路由
        sysStore.clearHistoryRoute()
        next()
        return
    }

    /**
     * 外站进入、第一次打开、刷新网页
     */
    if (from.fullPath === "/" && !from.name) {


        //获取token
        const Token: string = getters.getToken

        // 有token说明已登录(这里是获取不到登录状态的，只能通过token判断)
        if (Token) {

            // 登录信息
            const UserInfo = userStore.userInfo

            // 没有用户信息，说明没有查询过，则查询一次（这里考虑到用户菜单转为路由后需要再次重定向一次）
            if (!UserInfo) {
                // 查询用户信息
                const { ok, data } = await getUserInfo()

                // 查询若有错误会在axios全局配置钩子中处理
                if (ok) {
                    // 缓存用户信息
                    userStore.setStates({ loginStatus: 1, userInfo: data })

                    // 登录之后查目录，处理转换为tree格式并动态添加到路由缓存
                    await userStore.getMenus()

                    // 由于动态路由的缘故，这里重新定向
                    next({ ...to, replace: true })

                } else {
                    // 如果这里查询完成，登录状态有问题，则直接跳转到登录页
                    next('/login?redirect=' + to.path)
                }

                return

            } else {
                // 重定向后结果
                // 登录状态（这里查询的登录状态包含已经查询过的结果）
                const LoginStatus = userStore.loginStatus

                // 该页面必须要登陆，且现在为未登录状态，则跳转到登录页
                // 若为路由正常跳转时发现未登录，则弹出登录框，而不是跳转到登录页，后面处理
                // 只有当动态路由已添加之后，下次再走到这儿，才能查到to.meta，所以放到UserInfo已赋值之后
                if (to.meta.private && !LoginStatus) {
                    next('/login?redirect=' + to.path)
                    return
                }
            }
        } else {
            // 没有token情况下,跳转登录页
            next('/login?redirect=' + to.path)
            return
        }
    }

    /* 路由正常跳转 */

    // 如果未登录
    if (to.meta.private && !userStore.loginStatus) {
        //登陆失效，弹出登陆框
        userStore.setStates({ loginStatus: 2 })
        // 这里不跳转
        return
    }

    /* 关于权限验证 */
    // 若该用户没有访问该路由的权限，则请求回来的路由中不会包含该路由信息，则访问时会重定向到404页面
    // 若请求回的路由中已有该路由信息，但中途被管理员卸去了权限，则通过接口请求来验证权限
    // 在接口携带的token中添加菜单的ID信息，管理端通过该用户角色信息中的权限信息与菜单ID进行匹配，若匹配失败，则返回无权限
    // 当然在后端验证菜单的权限时，也要判断菜单是否已在中途被删除或被停用（status字段）
    // 所以权限相关验证放到请求钩子中，这里无需考虑

    // 正常情况直接跳转
    next()
}

export default permission
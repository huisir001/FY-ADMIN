/*
 * @Description: 跳转权限-路由前置钩子
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-17 19:28:46
 * @LastEditTime: 2021-10-22 01:19:59
 */
import { getUserInfo } from '@/api/user'
import { NavigationGuardWithThis } from 'vue-router'
import { store } from '@/store'
import { ElMessage } from 'element-plus'
import PageLoading from '@/utils/PageLoading'


const permission: NavigationGuardWithThis<void> = async (to, from, next) => {
    // 加载loading
    PageLoading.show()

    // 外站进入\第一次打开、刷新网页
    if (!(from.name && store.state)) {
        //获取token
        const Token: string = store.getters.getToken()
        // 菜单状态
        const MenusLength = store.state.sys.menuList.length
        // 登录状态
        const loginStatus = store.state.user.loginStatus
        // 有token说明已登录
        if (Token) {

            if (!MenusLength) {
                // 查询用户信息
                const { ok, data } = await getUserInfo()

                // 查询若有错误会在axios全局配置钩子中处理
                if (ok) {
                    // 缓存用户信息
                    store.commit('user/setStates', { loginStatus: 1, userInfo: data })
                    // 查目录
                    await store.dispatch('sys/getMenus')
                }
            }

            // 若该页面是登陆页，则清除登陆状态
            if (to.name === 'Login') {
                store.commit('user/clearLoginState')
            }

            console.log('to.meta', to.meta)

            // 该页面必须要登陆
            if (to.meta.private && !loginStatus) {
                next('/login?redirect=' + to.path)
                return
            }

            // 已登陆，该页面无权限
            // if (to.meta.unallow) {
            //     next('/')
            //     return
            // }
        } else if (to.meta.private) {
            //没有Token，直接转login
            next('/login?redirect=' + to.path)
            return
        }
        MenusLength && next()
        MenusLength || next(to.fullPath)
        return
    }

    /**
     * 路由正常跳转
     */
    if (to.meta.private && !store.state.user.loginStatus) {
        //登陆失效，弹出登陆框
        store.commit('user/setStates', { loginStatus: 2 })
    }
    // else if (to.meta.unallow) {
    //     // 无权限
    //     ElMessage.warning('您暂无权限访问此页！')
    // }
    else {
        next()
    }
}

export default permission
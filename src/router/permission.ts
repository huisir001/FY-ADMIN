/*
 * @Description: 跳转权限-路由前置钩子
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-17 19:28:46
 * @LastEditTime: 2021-09-28 15:07:25
 */
import { getUserInfo } from '@/api/user'
import { NavigationGuardWithThis } from 'vue-router'
import { store } from '@/store'
import { ElMessage } from 'element-plus'
import PageLoaing from '@/utils/PageLoaing'


const permission: NavigationGuardWithThis<void> = async (to, from, next) => {
    // 加载loading
    PageLoaing.show()

    // 外站进入\第一次打开、刷新网页
    if (!(from.name && store.state)) {
        //获取token
        const Token: string = store.getters.getToken()
        if (Token) {
            // 查询用户信息
            const { ok, data } = await getUserInfo()

            // 这里不再判定用户信息是否查到，若有错误会在axios全局配置钩子中处理
            store.commit('user/setStates', { loginStatus: 1, userInfo: data })

            // 若该页面是登陆页，则清除登陆状态
            if (to.name === 'Login') {
                store.commit('user/clearLoginState')
            }

            // 该页面必须要登陆，且查不到用户信息
            if (!to.meta.public && !ok) {
                next('/login?redirect=' + to.path)
                return
            }

            // 已登陆，该页面无权限
            if (to.meta.unallow) {
                next('/')
                return
            }
        } else if (!to.meta.public) {
            //没有Token，直接转login
            next('/login?redirect=' + to.path)
            return
        }
        next()
        return
    }

    /**
     * 路由正常跳转
     */
    if (!to.meta.public && !store.state.user.loginStatus) {
        //登陆失效，弹出登陆框
        store.commit('user/setStates', { loginStatus: 2 })
    } else if (to.meta.unallow) {
        // 无权限
        ElMessage.warning('您暂无权限访问此页！')
    } else {
        next()
    }
}

export default permission
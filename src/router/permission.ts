/*
 * @Description: 跳转权限-路由前置钩子
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-17 19:28:46
 * @LastEditTime: 2021-09-17 19:31:50
 */
import { GetUserInfo } from '@/api/user'


export default async (to, from, next) => {
    // 外站进入\第一次打开、刷新网页
    if (!from.name || !router.app.$store.state) {
        //获取token
        const token = sessionStorage.getItem('_token')
        if (token) {
            // 查询用户信息
            const { ok, data } = await GetUserInfo()
            // 这里不再判定用户信息是否查到，若有错误会在axios全局配置钩子中处理
            router.app.$store.commit('setStates', {
                isLogin: 1, // 登陆状态
                userInfo: data, // 用户信息缓存
            })
            if (!to.meta.notLogin && ok == 0) {
                next('/Startup')
            } else {
                next()
            }
        } else {
            //没有token 设置状态
            router.app.$store.commit('setStates', {
                isLogin: 0, // 登陆状态
                userInfo: null, // 用户信息缓存
            })
            //直接转Startup
            if (!to.meta.notLogin) {
                next('/Startup')
            } else {
                next()
            }
        }
        return
    }
    /* 登陆验证 */
    if (!to.meta.notLogin && !router.app.$store.state.isLogin) {
        //请登录，弹出登陆框
        router.app.$store.commit('setStates', {
            showLoginBox: true,
        })
    } else {
        next()
    }
}
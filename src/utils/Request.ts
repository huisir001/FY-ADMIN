/*
 * @Description: axios中间件（初始化和全局配置）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 13:16:24
 * @LastEditTime: 2021-10-21 18:32:58
 */
// tslint:disable:no-console
import { ElMessage } from 'element-plus'
import axios from 'axios'
// import PageLoading from './PageLoading'
import LocalCache from './LocalCache'
import { store } from '@/store'
import { TOKEN_OPTIONS, STORAGE_OPTIONS } from '@/settings'


//初始化
const Axios: any = axios.create({
    baseURL: $GLOBAL.BASE_API, //api路径
    withCredentials: true, // 跨域时允许设置cookie
    timeout: 10000,      //超时
})

// token
let Token: string

//请求前钩子
Axios.interceptors.request.use(
    (config: any) => {
        // 加载loading
        // PageLoading.show()
        // 由于执行请求时token可能已经改变，故每次请求前都要重新获取token
        Token = store.getters.getToken()
        console.log(Token)
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        Token && (config.headers[TOKEN_OPTIONS.key] = Token)
        return config
    },
    (error: any) => {
        // PageLoading.hide() // 关闭loading
        console.error('[Request error]: ' + error)
    }
)

//响应后钩子
Axios.interceptors.response.use(
    (response: any) => {
        console.log('response', response)
        // 关闭loading
        // PageLoading.hide()

        // 对响应数据做些事
        if (response.status !== 200 || !response.data.ok) {
            ElMessage.error(response.data.msg)
            console.error('[Request error]: ' + response.data.msg)
        } else if (typeof response.data === 'string') {
            try {
                response.data = JSON.parse(response.data)
            } catch (error) {
                console.error('[JSON-Parse error]: ' + error)
            }
        }

        // 更新token
        const newToken = response.headers[TOKEN_OPTIONS.key]
        if (newToken && newToken !== Token) {
            store.commit('user/setToken', newToken)
        }

        return response.data
    },
    (error: any) => {
        // PageLoading.hide() // 关闭loading

        // 代码层面出错
        if (!error.response) {
            const msg = error.toString()
            ElMessage.error(msg) //错误提示
            console.error('[Request error]: ' + error)
            return { status: 0, msg }
        }
        // 后端返回异常
        const { status, data, statusText } = error.response
        // 若这里响应码为403，则改变登陆状态，弹出登录框
        if (status === 403) {
            store.commit('user/setStates', { loginStatus: 2, token: null, userInfo: null })
            //删除token
            LocalCache.removeCache(STORAGE_OPTIONS.Token)
        }
        setTimeout(() => {
            if (status === 404) {
                ElMessage.error(`${status}: ${statusText}（${error.response.config.url}）`) //错误提示
            } else {
                ElMessage.error(data.msg) //错误提示
            }
        }, 100)
        return data
    }
)

export default Axios

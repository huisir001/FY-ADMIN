/*
 * @Description: axios中间件（初始化和全局配置）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 13:16:24
 * @LastEditTime: 2021-09-08 17:10:49
 */
import { ElMessage } from 'element-plus'
import axios from 'axios'
import PageLoaing from './PageLoaing'
import { useStore } from 'vuex'
const Store = useStore() // useStore须执行

//初始化
let Axios: any = axios.create({
    baseURL: process.env.VUE_APP_BASEAPI, //api路径
    withCredentials: true, // 跨域时允许设置cookie
    timeout: 10000,      //超时
})

//请求前钩子
Axios.interceptors.request.use(
    (config: any) => {
        // 加载loading
        PageLoaing.show()
        // 由于执行请求时token可能已经改变，故每次请求前都要重新获取token
        const Token = sessionStorage.getItem('_token')
        if (Token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['token'] = Token
        }
        return config
    },
    (error: any) => {
        PageLoaing.hide() // 关闭loading
        console.error(error)
    }
)

//响应后钩子
Axios.interceptors.response.use(
    (response: any) => {
        // 对响应数据做些事
        if (response.status === 200) {
            if (typeof response.data == 'string') {
                try {
                    response.data = JSON.parse(response.data)
                } catch (error) { }
                // 关闭loading
                PageLoaing.hide()
                return response.data
            }
            if (!response.data.ok) {
                ElMessage.error(response.data.msg)
                console.error('[Request error]: ' + response.data.msg)
            }
        } else {
            ElMessage.error(response.data.msg)
            console.error('[Request error]: ' + response.data.msg)
        }
        // 关闭loading
        PageLoaing.hide()
        return response.data
    },
    (error: any) => {
        const { status, data, statusText } = error.response
        PageLoaing.hide() // 关闭loading
        console.error(error)
        // 若这里响应码为403，则改变登陆状态，弹出登录框
        if (status == 403) {
            Store.commit('setStates', {
                isLogin: 0, // 登陆状态
                userInfo: null, // 用户信息缓存
                showLoginBox: true, // 打开登陆弹窗
            })
            //删除token
            sessionStorage.removeItem('_token')
        }
        setTimeout(() => {
            if (data) {
                ElMessage.error(data.msg) //错误提示
            } else {
                ElMessage.error(`${status}: ${statusText}`) //错误提示
            }
        }, 100)
        return data
    }
)

export default Axios

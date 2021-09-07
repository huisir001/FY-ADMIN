/*
 * @Description: 用户相关接口
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-02 18:06:40
 * @LastEditTime: 2021-09-07 17:06:40
 */
import Req from "../utils/Request"
const Prefix = '/api/user'

// 用户信息
export const getUserInfo: IPromiseFunc = () => Req.get(`${Prefix}/getUserInfo`)

// 注册
// export const signup: IPromiseFunc =
//     (params: ISignupData) => Req.post(`${Prefix}/signup`, params)

// 登录
export const doLogin: IPromiseFunc =
    ({ username, password }: ISignupData) => Req.post(`${Prefix}/login`, { username, password })

// 登出
export const doLogout: IPromiseFunc = () => Req.post(`${Prefix}/logout`)

// 重置密码
export const resetPass: IPromiseFunc =
    (oldPass: string, newPass: string) => Req.post(`${Prefix}/resetPass`, { oldPass, newPass })
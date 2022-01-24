/*
 * @Description: 基础配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 16:44:22
 * @LastEditTime: 2021-10-21 18:23:47
 */

/**
 * token令牌请求传参配置
 */
export const TOKEN_OPTIONS: IObj = {
    key: 'ACCESS_TOKEN', // 键名(请求头、响应头)
    prevStr: '',    // 前置字符(请求头传参拼接)
    nextStr: ''     // 后置字符(请求头传参拼接)
}
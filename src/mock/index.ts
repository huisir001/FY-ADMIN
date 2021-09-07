/*
 * @Description: mockjs-api数据模拟
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-05-12 21:55:26
 * @LastEditTime: 2021-09-07 19:02:09
 */
import Mock from "mockjs"
import common from "./rules/common"
import User from "./rules/user"

/* 接口拦截(url可使用正则) */
// 用户信息
Object.keys(User).forEach(key => {
    // 忽略请求方式
    Mock.mock(new RegExp(`user/${key}$`), { ...common, ...User[key] })
})
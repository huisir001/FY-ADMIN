/*
 * @Description: mockjs-api数据模拟
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-05-12 21:55:26
 * @LastEditTime: 2021-09-02 18:17:54
 */
import Mock from "mockjs"
import common from "./rules/common"
import User from "./rules/user"

/* 接口拦截(url可使用正则) */
// 用户信息
Object.keys(User).forEach(key => {
    Mock.mock(key, Object.assign(common, User[key]))
})
/*
 * @Description: mockjs-api数据模拟
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-05-12 21:55:26
 * @LastEditTime: 2021-09-24 23:08:57
 */
import Mock from "mockjs"
import common from "./rules/common"
import User from "./rules/user"
import Upload from "./rules/upload"

/**
 * 延时
 */
Mock.setup({
    timeout: '100-300'
})


/**
 * 用户
 */
Object.keys(User).forEach((key) => {
    // 接口拦截(url可使用正则)
    // 忽略请求方式
    Mock.mock(new RegExp(`user/${key}$`), { ...common, ...User[key] })
})

/**
 * 上传
 */
Mock.mock(/api\/upload/, { ...common, ...Upload })
/*
 * @Description: mockjs-api数据模拟
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-05-12 21:55:26
 * @LastEditTime: 2021-12-27 16:05:02
 */
import Mock from "mockjs"
import common from "./rules/common"
import User from "./rules/user"
import File from "./rules/file"
import Sys from "./rules/sys"

/**
 * DOC:https://github.com/nuysoft/Mock/wiki
 * Examples:http://mockjs.com/examples.html
 */

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
    Mock.mock(new RegExp(`user/${key}(\\?.*)?$`), { ...common, ...User[key] })
})

/**
 * 上传
 */
Object.keys(File).forEach((key) => {
    Mock.mock(new RegExp(`file/${key}(\\?.*)?$`), { ...common, ...File[key] })
})

/**
 * 系统配置
 */
Object.keys(Sys).forEach((key) => {
    Mock.mock(new RegExp(`sys/${key}(\\?.*)?$`), { ...common, ...Sys[key] })
})
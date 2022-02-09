/*
 * @Description: mockjs-api数据模拟
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-05-12 21:55:26
 * @LastEditTime: 2022-02-09 15:09:39
 */
import User from "./rules/user"
import File from "./rules/file"
import Sys from "./rules/sys"

/**
 * DOC:https://github.com/nuysoft/Mock/wiki
 * Examples:http://mockjs.com/examples.html
 */

export default [
    ...User,
    ...File,
    ...Sys
]
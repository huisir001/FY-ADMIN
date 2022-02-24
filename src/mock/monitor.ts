/*
 * @Description: 监控日志
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-02-24 16:27:37
 * @LastEditTime: 2022-02-24 16:44:44
 */

import { rules2MockMethods } from './_helpers'
const Prefix = '/api/monitor/'

// 查询所有请求日志列表（用于日志管理）
const getReqLogsByPage = {
    data: {
        'list|15': [{
            id: '@id',
            ip: '@ip', // 访客IP
            userId: '@id', // 用户id
            username: '@name',
            action: '@url', // 请求地址
            desc: '@ctitle(3, 5)', // 操作说明
            createTime: '@datetime',
            updateTime: '@datetime',
        }],
        page: 1,
        limit: 10,
        total: 100,
        pageTotal: 10
    }
}

// 删除请求日志
const delReqLogs = { msg: '删除成功' }

// 查询所有登录日志列表（用于日志管理）
const getLoginLogsByPage = {
    data: {
        'list|15': [{
            id: '@id',
            ip: '@ip', // 访客IP
            userId: '@id', // 用户id
            username: '@name',
            location: '@city(true)', // 请求地址
            "msg|1": [
                "登录成功",
                "登录失败",
                "未知错误",
                "用户名或密码错误",
            ], // 操作反馈
            "os|1": [
                "Windows 10",
                "Mac OS",
                "Windows 7",
                "Linux",
                "Android",
                "Android Mobile",
                "Windows 8.1",
            ], // 操作系统
            "browser|1": [
                "Chrome 9",
                "Chrome 8",
                "Chrome",
                "Firefox 9",
                "Mobile Safari",
                "Safari",
                "Chrome Mobile",
            ], // 浏览器
            createTime: '@datetime',
            updateTime: '@datetime',
        }],
        page: 1,
        limit: 10,
        total: 100,
        pageTotal: 10
    }
}

// 删除登录日志
const delLoginReqLogs = { msg: '删除成功' }

const Rules: IObj = {
    getReqLogsByPage,
    getLoginLogsByPage,
    delReqLogs,
    delLoginReqLogs
}

export default rules2MockMethods(Rules, Prefix)
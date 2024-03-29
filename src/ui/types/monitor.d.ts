/*
 * @Description: 监控页类型(src\ui\pages\monitor)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-02-21 14:04:18
 * @LastEditTime: 2022-02-28 10:49:21
 */

/**
 * 请求日志参数
 */
declare interface IReqLog extends IObj {
    id?: string
    ip?: string // 访客IP
    userId?: string // 用户id
    username?: string // 用户名
    action?: string // 请求地址
    desc?: string // 操作说明
    createTime?: string
    updateTime?: string
}

/**
 * 登录日志参数
 */
declare interface ILoginLog extends IObj {
    id?: string
    ip?: string // 访客IP
    userId?: string // 用户id
    username?: string // 用户名
    location?: string // 登录地点
    msg?: string // 操作信息
    os?: string // 操作系统
    browser?: string // 浏览器
    createTime?: string
    updateTime?: string
}

/**
 * 在线用户参数
 */
declare interface IOnlineUser extends IUserInfo {
    ip?: string // 访客IP
    location?: string // 登录地点
    os?: string // 操作系统
    browser?: string // 浏览器
    loginTime?: string // 登录时间
}

/**
 * 日志分页列表入参
 */
declare interface IGetLogsParams {
    search?: IReqLog | ILoginLog | IOnlineUser
    page?: number // 当前页码
    limit?: number // 每页条数
}
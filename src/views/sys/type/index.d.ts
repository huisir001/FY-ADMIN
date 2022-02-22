/*
 * @Description: 公共类型
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-02-21 14:04:18
 * @LastEditTime: 2022-02-22 15:06:35
 */

/**
 * 日志参数
 */
declare interface ILog extends IObj {
    id?: string
    ip?: string // 访客IP
    userId?: string // 用户id
    username?: string // 用户昵称
    action?: string // 请求地址
    desc?: string // 操作说明
    createTime?: string
    updateTime?: string
}

/**
 * 日志分页列表入参
 */
declare interface IGetLogsParams {
    search?: ILog
    page?: number // 当前页码
    limit?: number // 每页条数
}
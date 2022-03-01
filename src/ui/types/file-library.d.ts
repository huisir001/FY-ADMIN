/*
 * @Description: 文件仓库
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-03-01 14:25:42
 * @LastEditTime: 2022-03-01 14:27:48
 */

/**
 * 文件分页列表入参
 */
declare interface IGetFileListParams {
    type?: 'pic' | 'zip'
    group?: string // 分组
    name?: string // 名称
    page: number // 当前页码
    limit: number // 每页条数
}

/**
 * 文件参数
 */
declare interface IFileParams {
    id: string
    type: 'pic' | 'zip'
    name: string
    createTime: string
    size: number
    dimensions?: [number, number]
    desc: string
    group?: string
    url: string
}
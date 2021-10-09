/*
 * @Description: 全局类型定义
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-10-09 15:45:31
 */

/**
 * .vue文件预设，必要
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * 资源文件预设，必要
 */
declare module '*.scss' {
  const mod: any
  export default mod
}
declare module '*.svg' {
  const mod: any
  export default mod
}
declare module '*.png' {
  const mod: any
  export default mod
}
declare module '*.jpg' {
  const mod: any
  export default mod
}

/**
 * 可索引对象
 */
declare interface IObj {
  [key: string]: any
}

/**
 * 返回Promise对象的函数
 */
declare type IPromiseFunc = (...params: any) => Promise<any>

/**
 * 用户数据
 */
declare interface IUserInfo extends IObj {
  username: string
  password?: string
  nickname?: string
  email?: string
  phone?: string
  avatar?: string
  sex?: 0 | 1 | 2       //0-保密 1-男 2-女
}

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

/**
 * 文件分类
 */
declare interface IFileGroup {
  id: string
  name: string
}

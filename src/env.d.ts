/// <reference types="vite/client" />
/*
 * @Description: 全局类型定义
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2022-03-01 14:07:22
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
declare module '*.json' {
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
 * vite.config.js中定义的全局变量名称(编译时全局变量)
 */
declare const __BASE_API__: string
declare const __NODE_ENV__: string
declare const __VIEW_PATHS__: string[]

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
 * 自定义按钮
 */
interface IBtnOptions {
  name: string
  icon?: string
  disabled?: boolean
  callback: (el: HTMLElement) => void
}
/*
 * @Description: 全局类型定义
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-10-22 11:07:46
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
 * vue.config.js中定义的全局变量名称(编译时全局变量)
 */
declare const $GLOBAL: {
  BASE_API?: string
  BASE_URL?: string
  NODE_ENV?: string
  VIEW_PATHS: string[]
}

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

/**
 * 菜单参数
 */
declare interface IMenu {
  id: string //主键
  createTime: string
  updateTime: string
  path: string //唯一
  name: string //唯一
  title: string
  icon: string
  redirectId: string
  parentId?: string
  keepAlive: boolean //默认为true
  visible: boolean //默认展示
  private: boolean //默认true,必须登录才能访问，否则跳登录页
  orderNum: number //排序index
  auth?: string //权限，空字符串或null则为所有权限
  type: 1 | 2 | 3 //1-普通路由；2-链接；3-按钮(可添加vuex-commit事件)
  query?: string //type=1/2时传参（{a=1,b=2}）
  viewPath?: string //type=1时跳转的文件路径(相对于src目录)若为null,且路由为一级路由，则渲染Layout组件;//type=2时跳转链接
  blank: boolean //type=2时在新页面打开链接，默认为true
  triggerMode?: 'commit' | 'dispatch' //type=3时要激活事件的方式：commit/dispatch
  triggerMethod?: string //字符串，type=3时要激活的事件
  status: 1 | 0 //1-正常；0-停用
  children?: IMenu[]
}

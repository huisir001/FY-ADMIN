/*
 * @Description: 全局类型定义
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-12-30 10:23:26
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
  id?: string
  username: string
  password?: string
  nickname?: string
  email?: string
  phone?: string
  avatar?: string
  sex?: 0 | 1 | 2 | '' | '0' | '1' | '2'     //0-保密 1-男 2-女 ''-全部
  status?: 0 | 1 | '' | '0' | '1'    //0-冻结 1-正常  ''-全部
  createTime?: string
  updateTime?: string
  roleIds?: string  //角色，逗号分割角色ID号
  roleNames?: string  //角色，逗号分割角色名称
}

/**
 * 用户分页列表入参
 */
declare interface IGetUsersParams {
  search?: IUserInfo
  page?: number // 当前页码
  limit?: number // 每页条数
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
  path: string
  title: string
  icon: string
  redirectId: string
  parentId?: string
  keepAlive: boolean //默认为true
  visible: boolean //默认展示,false时不展示，但用链接能够访问
  private: boolean //默认true,必须登录才能访问，否则跳登录页
  orderNum: number //排序index
  auth?: string //权限，空字符串或null则为所有权限
  type: 1 | 2 | 3 //1-普通路由；2-链接；3-按钮(可添加vuex-commit事件)
  query?: string //type=1/2时传参（{a=1,b=2}）
  viewPath?: string //type=1时跳转的文件路径(相对于src目录)若为null,且路由为一级路由，则渲染Layout组件;//type=2时跳转链接
  blank: boolean //type=2时在新页面打开链接，默认为true
  triggerMode?: 'commit' | 'dispatch' //type=3时要激活事件的方式：commit/dispatch
  triggerMethod?: string //字符串，type=3时要激活的事件
  status: 1 | 0 //1-正常；0-停用（停用时用户无法查询，且访问受限），admin能查询所有菜单，侧边栏不展示
  children?: IMenu[]
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

/**
 * 路由meta
 */
interface IRouteMeta {
  keepAlive?: boolean
  title: string
  icon?: string
  private?: boolean
}

/**
 * 部門數據
 */
interface IDept {
  id?: string
  name?: string
  status?: 1 | 0 //1-正常；0-停用
  leader?: string
  email?: string
  phone?: string
  delFlag?: 1 | 0 //1-已刪除；0-正常
  remark?: string
  parentId?: string | null
  createTime?: string
  updateTime?: string
}

/**
 * 角色數據
 */
interface IRole {
  id?: string
  name?: string
  key?: string
  status?: 1 | 0 //1-正常；0-停用
  delFlag?: 1 | 0 //1-已刪除；0-正常
  remark?: string
  createTime?: string
  updateTime?: string
}


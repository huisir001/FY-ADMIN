/*
 * @Description: 全局类型定义
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-09-20 15:50:48
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
 * 用户注册-表单提交数据
 */
declare interface IUserInfo extends IObj {
  username: string
  password: string
  email?: string
  phone?: string
}
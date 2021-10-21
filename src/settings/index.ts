/*
 * @Description: 中转,便于commonjs和esnext同时使用
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 17:43:50
 * @LastEditTime: 2021-10-21 19:50:50
 */

// tslint:disable-next-line:no-var-requires
const Title = require("./title.ts")
export const TITLE = Title
export * from './others'
export { default as STORAGE_OPTIONS } from './storage'
export { default as THEME_OPTIONS } from './theme'
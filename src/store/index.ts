/*
 * @Description: store
 * @Autor: HuiSir<github.com/huisir001>
 * @Date: 2022-08-09 10:51:34
 * @LastEditTime: 2022-08-09 18:04:38
 */
import { createPinia } from 'pinia'
export { default as useCommonStore } from './modules/common'
export { default as useSysStore } from './modules/sys'
export { default as useThemeStore } from './modules/theme'
export { default as useUserStore } from './modules/user'
export { default as useGetters } from './getters'
export default createPinia()
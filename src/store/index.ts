/*
 * @Description: store
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-09-18 19:29:26
 */
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { user, IUserState } from './modules/user'
import { theme, IThemeState } from './modules/theme'
import { temp, ITempState } from './modules/temp'
import getters from './getters'

// State接口
export interface IState {
  user: IUserState
  theme: IThemeState
  temp: ITempState
}

// 定义类型化的 InjectionKey
export const storeKey: InjectionKey<Store<IState>> = Symbol()

// 定义自己的 `useStore` 组合式函数
// 将类型化的 InjectionKey 传给 useStore 方法
export const useStore = () => baseUseStore(storeKey)

// 导出Store
export const store = createStore<IState>({
  modules: {
    user,
    theme,
    temp
  },
  getters
})

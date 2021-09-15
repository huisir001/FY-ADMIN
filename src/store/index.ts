/*
 * @Description: store
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-09-15 13:52:28
 */
import { createStore } from 'vuex'
import user from './modules/user'
import theme from './modules/theme'
import temp from './modules/temp'

export default createStore({
  modules: {
    user,
    theme,
    temp
  }
})

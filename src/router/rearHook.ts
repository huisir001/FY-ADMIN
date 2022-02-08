/*
 * @Description: 路由后置钩子
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-20 18:59:01
 * @LastEditTime: 2022-02-08 18:08:51
 */
import { TITLE } from 'settings'
import { NavigationHookAfter } from 'vue-router'
import PageLoading from '@/utils/PageLoading'
import { store } from '@/store'

const rearHook: NavigationHookAfter = (to) => {
    // 框架标题获取
    if (to.name === 'Frame') {
        to.meta.title = (store.state.user.menus.find(
            (item) => item.id === to.params.id
        ) as IMenu).title
    }
    // 更改Tab标题
    to.meta.title && (document.title = to.meta.title + ' - ' + TITLE)
    // 关闭loading
    PageLoading.hide()
    // 更新历史记录
    store.commit('sys/addHistoryRoute', to)
}

export default rearHook
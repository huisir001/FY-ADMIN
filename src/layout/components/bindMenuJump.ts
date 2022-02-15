/*
 * @Description: 辅助脚本
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-02-15 11:36:27
 * @LastEditTime: 2022-02-15 14:02:01
 */
import { MenuType } from '@/ui/types'
import { Router } from 'vue-router'
import { IState } from '@/store'
import { Store } from 'vuex'

// 菜单点击
export default (menu: IMenu, router: Router, store: Store<IState>) => {
    switch (menu.type) {
        case MenuType.cat:
            return
            break
        case MenuType.route:
            //路由
            router.push({ name: menu.id })
            break
        case MenuType.link:
            // 链接
            if (menu.blank) {
                window.open(menu.src)
            } else {
                router.push({ name: 'Frame', params: { id: menu.id } })
            }
            break
        case MenuType.button:
            // 按钮
            store[menu.triggerMode as 'commit' | 'dispatch'](menu.triggerMethod!)
            break
    }
}

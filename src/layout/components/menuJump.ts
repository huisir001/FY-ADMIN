/*
 * @Description: 辅助脚本
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-02-15 11:36:27
 * @LastEditTime: 2022-08-09 18:36:29
 */
import { Router } from 'vue-router'
import { useCommonStore } from '@/store'
import { MenuType } from '@/ui/helpers'

// 菜单点击
export default async (menu: IMenu, router: Router) => {
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
            menu.triggerMethod && await (useCommonStore() as any)[menu.triggerMethod]()
            break
    }
}

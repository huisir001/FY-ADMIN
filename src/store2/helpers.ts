/*
 * @Description: 辅助 
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-31 10:19:03
 * @LastEditTime: 2022-02-15 15:51:16
 */
import { RouteRecordRaw } from 'vue-router'

/**
 * views目录所有文件列表
 * vite编译内置方法import.meta.glob
 */
export const viewModules1 = import.meta.glob('../views/**/*.vue')
export const viewModules2 = import.meta.glob('../ui/pages/**/*.vue')
export const viewModules = { ...viewModules1, ...viewModules2 }

/**
 * menuItem => routeItem
 */
export const menu2Route = (menu: IMenu): RouteRecordRaw => {
    const { id, path, title, icon, parentId, keepAlive, private: prvt, viewPath, visible } = menu
    // 路由的name直接使用id，避免冲突
    return {
        path,
        name: id,
        component: viewModules[`../${viewPath}`],
        meta: { title, icon, keepAlive, private: prvt, visible }
    }
}
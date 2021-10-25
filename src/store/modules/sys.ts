/*
 * @Description: 临时变量
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-15 11:25:57
 * @LastEditTime: 2021-10-25 16:05:56
 */
import { RouteRecordRaw } from 'vue-router'
import { ActionContext } from 'vuex'
import { getUserMenus } from '@/api/sys'
import Layout from '@/layout/index.vue'
import router from '@/router'
import { rawList2Tree, menu2Route } from '@/utils/common'

/**
 * 用户state接口
 */
export interface ISysState extends IObj {
    sidebarCollapse?: boolean
    sidebarHide?: boolean
    visibleAreaWidth?: number
    historyRoutes: RouteRecordRaw[]
    menuTree: IMenu[]
}

export const sys = {
    namespaced: true,
    state: {
        /**
         * 侧边栏收起
         */
        sidebarCollapse: false,
        /**
         * 侧边栏隐藏
         */
        sidebarHide: false,
        /**
         * 屏幕可视区宽度
         */
        visibleAreaWidth: window.innerWidth,
        /**
         * 历史路由
         */
        historyRoutes: [],
        /**
         * 菜单列表
         */
        menuTree: []
    },
    mutations: {
        /**
         * 修改状态
         */
        setStates(state: IObj, obj: IObj) {
            Object.keys(obj).forEach((key) => {
                state[key] = obj[key]
            })
        },
        /**
         * 侧边栏状态更改
         */
        changeSidebarCollapse(state: IObj) {
            state.sidebarCollapse = !state.sidebarCollapse
        },
        /**
         * 添加新路由
         */
        addHistoryRoute(state: IObj, route: any) {
            if (!state.historyRoutes.find((item: any) => item.name === route.name)
                && route.path.split('/').length > 2) {
                state.historyRoutes.push(route)
            }
        },
        /**
         * 删除路由
         */
        delHistoryRoute(state: IObj, route: any) {
            const INDEX = state.historyRoutes.findIndex((item: any) => item.name === route.name)
            state.historyRoutes.splice(INDEX, 1)
        },
        /**
         * 清除路由
         */
        clearHistoryRoute(state: IObj) {
            state.historyRoutes = []
        },
        /**
         * 清除菜单及路由
         */
        clearAllMenuAndRoute(state: IObj) {
            // 清除路由
            state.menuTree.forEach((menu: IMenu) => {
                router.removeRoute(menu.id)
            });
            // 清除菜单
            state.menuTree = []
        },
    },
    actions: {
        /**
         * 查询菜单列表
         */
        async getMenus({ commit }: ActionContext<{}, {}>) {
            const { ok, data = [] } = await getUserMenus()
            if (ok) {
                // parentId list => children tree
                const menuTreeList = rawList2Tree(data, 'parentId', 'children')

                // 动态添加路由
                for (let index = 0; index < data.length; index++) {
                    const menu = data[index];
                    const { parentId, type, status } = menu

                    if (type !== 1 || !status) { return }

                    const Route = menu2Route(menu, data, Layout)

                    if (parentId) {
                        // 路由的name直接使用id，避免冲突
                        router.addRoute(data.find((item: IMenu) => item.id === parentId).id, Route)
                    } else {
                        router.addRoute(Route)
                    }
                }

                // 添加404页面
                router.addRoute({
                    path: '/:catchAll(.*)',
                    name: '404',
                    meta: { title: "404", visible: false, private: false },
                    component: () => import('@/views/404/index.vue')
                })

                // 更新列表
                commit('setStates', { menuTree: menuTreeList })
            }
        },

    }
}
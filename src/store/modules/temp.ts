/*
 * @Description: 临时变量
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-15 11:25:57
 * @LastEditTime: 2021-09-30 17:45:40
 */

/**
 * 用户state接口
 */
export interface ITempState extends IObj {
    sidebarCollapse?: boolean
    sidebarHide?: boolean
    visibleAreaWidth?: number
}

export const temp = {
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
        historyRoutes: [
            {
                path: '/my',
                name: 'My',
                meta: { title: "个人中心", hidden: true }
            },
            {
                path: '/my1',
                name: 'My1',
                meta: { title: "个人中心1", hidden: true }
            },
            {
                path: '/my2',
                name: 'My2',
                meta: { title: "个人中心2", hidden: true }
            },
            {
                path: '/my3',
                name: 'My3',
                meta: { title: "个人中心3", hidden: true }
            },
            {
                path: '/my4',
                name: 'My4',
                meta: { title: "个人中心4", hidden: true }
            },
            {
                path: '/my5',
                name: 'My5',
                meta: { title: "个人中心5", hidden: true }
            },
        ]
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
            if (!state.historyRoutes.find((item: any) => item.name === route.name) && route.name !== 'Home') {
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

    }
}
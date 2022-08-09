/*
 * @Description: 临时变量
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-15 11:25:57
 * @LastEditTime: 2022-04-15 11:38:55
 */

/**
 * 路由meta
 */
interface IRouteMeta {
    keepAlive?: boolean
    title: string
    icon?: string
    private?: boolean
}

/**
 * 用户state接口
 */
export interface ISysState extends IObj {
    sidebarCollapse?: boolean
    sidebarHide?: boolean
    visibleAreaWidth?: number
    historyRoutes: { name: string, path: string, meta: IRouteMeta, params: IObj }[]
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
         * 屏幕可视区高度
         */
        visibleAreaHeight: window.innerHeight,
        /**
         * 历史路由
         */
        historyRoutes: [],
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
         * 添加历史路由
         */
        addHistoryRoute(state: IObj, route: any) {
            if (!state.historyRoutes.find((item: any) => item.name === route.name)
                && route.meta.visible && route.name) {
                const { name, path, meta, params } = route
                state.historyRoutes.push({ name, path, meta, params })
            }
        },
        /**
         * 删除历史路由
         */
        delHistoryRoute(state: IObj, route: any) {
            const INDEX = state.historyRoutes.findIndex((item: any) => item.name === route.name)
            state.historyRoutes.splice(INDEX, 1)
        },
        /**
         * 清除历史路由
         */
        clearHistoryRoute(state: IObj) {
            state.historyRoutes = []
        },
    }
}
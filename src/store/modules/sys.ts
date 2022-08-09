/*
 * @Description: 临时变量
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-15 11:25:57
 * @LastEditTime: 2022-08-09 14:55:14
 */
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
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
interface ISysState extends IObj {
    sidebarCollapse?: boolean
    sidebarHide?: boolean
    visibleAreaWidth?: number
    visibleAreaHeight?: number
    historyRoutes: { name: string, path: string, meta: IRouteMeta, params: IObj }[]
}

export default defineStore('sys', () => {
    const state: ISysState = reactive({
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
    })

    // setStates 由于pinia的$patch方法可以取代此自定义方法，所以无需再定义

    /**
     * 侧边栏状态更改
     */
    const changeSidebarCollapse = () => {
        state.sidebarCollapse = !state.sidebarCollapse
    }
    /**
     * 添加历史路由
     */
    const addHistoryRoute = (route: any) => {
        if (!state.historyRoutes.find((item: any) => item.name === route.name)
            && route.meta.visible && route.name) {
            const { name, path, meta, params } = route
            state.historyRoutes.push({ name, path, meta, params })
        }
    }
    /**
     * 删除历史路由
     */
    const delHistoryRoute = (route: any) => {
        const INDEX = state.historyRoutes.findIndex((item: any) => item.name === route.name)
        state.historyRoutes.splice(INDEX, 1)
    }
    /**
     * 清除历史路由
     */
    const clearHistoryRoute = () => {
        state.historyRoutes = []
    }

    return {
        ...toRefs(state),
        changeSidebarCollapse,
        addHistoryRoute,
        delHistoryRoute,
        clearHistoryRoute
    }
})
/*
 * @Description: 临时变量
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-15 11:25:57
 * @LastEditTime: 2021-09-17 18:31:12
 */
export default {
    namespaced: true,
    state: () => ({
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
        visibleAreaWidth: window.innerWidth
    }),
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
        }
    }
}
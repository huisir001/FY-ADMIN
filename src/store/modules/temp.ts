/*
 * @Description: 临时变量
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-15 11:25:57
 * @LastEditTime: 2021-09-15 14:05:03
 */
export default {
    namespaced: true,
    state: () => ({
        /**
         * 侧边栏收起
         */
        sidebarCollapse: false
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
    }
}
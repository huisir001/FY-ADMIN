/*
 * @Description: 公共缓存及方法
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-02-08 14:27:26
 * @LastEditTime: 2022-02-08 14:37:53
 */
export const common = {
    namespaced: true,
    mutations: {
        sidebarBtn1() {
            alert('测试按钮1，使用vuex:commit触发事件')
        }
    },
    actions: {
        sidebarBtn2() {
            alert('测试按钮2，使用vuex:dispatch触发事件')
        }
    }
}
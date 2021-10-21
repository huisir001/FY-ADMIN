/*
 * @Description: 系统配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-15 15:10:44
 * @LastEditTime: 2021-10-21 11:17:47
 */
const getUserMenus = {
    data: {
        list: [{
            id: '@id',
            createTime: '@datetime',
            updateTime: '@datetime',
            path: '/sys',
            name: 'Sys',
            title: '系统配置',
            icon: "el-icon-setting",
            redirectMenuId: null,
            parentId: null,
            keepAlive: true, //默认为true
            visible: true, //默认展示
            private: true, //默认true,必须登录才能访问，否则跳登录页
            orderNum: 0,//排序index
            auth: null, //权限，空字符串或null则为所有权限
            type: 1, //1-普通路由；2-链接；3-按钮(可添加vuex-commit事件)
            query: '',//type=1/2时传参（{a=1,b=2}）
            viewPath: null,//type=1时,跳转的文件路径(相对于src目录),若为null且路由为一级路由，则渲染Layout组件;//type=2时跳转链接
            blank: true,//type=2时在新页面打开链接，默认为true
            triggerMode: null,//type=3时要激活事件的方式：commit/dispatch
            triggerMethod: null,//字符串，type=3时要激活的事件
            status: 1,//1-正常；0-停用
        }]
    }
}

const Sys: IObj = {
    getUserMenus
}

export default Sys
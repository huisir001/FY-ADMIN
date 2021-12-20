/*
 * @Description: 系统配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-15 15:10:44
 * @LastEditTime: 2021-12-20 15:08:11
 */

// 查询所有菜单，用于菜单管理（唯总管理员才有权限）
const getAllMenus = {
    data: [{
        id: '001', //主键
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/sys', //唯一
        title: '系统配置',
        icon: "Setting",
        redirectId: '002',
        parentId: null,
        keepAlive: true, //默认为true
        visible: true, //默认展示
        private: true, //type=1/3时，默认true,必须登录才能访问，否则跳登录页
        orderNum: 1, //排序index
        auth: null, //权限，空字符串或null则为所有权限
        type: 1, //1-普通路由；2-链接；3-按钮(可添加vuex-commit事件)
        query: null, //type=1/2时传参（{a=1,b=2}）
        viewPath: null, //type=1时,跳转的文件路径(相对于src目录),若为null且路由为一级路由，则渲染Layout组件;//type=2时跳转链接
        blank: true, //type=2时在新页面打开链接，默认为true
        triggerMode: 'commit', //type=3时要激活事件的方式：commit/dispatch
        triggerMethod: null, //字符串，type=3时要激活的事件
        status: 1, //1-正常；0-停用
    },
    {
        id: '002',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/sys/dept',
        title: '部门管理',
        icon: "Operation",
        redirectId: null,
        parentId: '001',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        auth: null,
        type: 1,
        query: null,
        viewPath: 'views/sys/dept.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    }, {
        id: '@id',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/sys/menu',
        title: '菜单管理',
        icon: "Menu",
        redirectId: null,
        parentId: '001',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 3,
        auth: null,
        type: 1,
        query: null,
        viewPath: 'views/sys/menu.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    }, {
        id: '@id',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/sys/role',
        title: '角色管理',
        icon: "Key",
        redirectId: null,
        parentId: '001',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 4,
        auth: null,
        type: 1,
        query: null,
        viewPath: 'views/sys/role.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    }, {
        id: '@id',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/sys/users',
        title: '用户管理',
        icon: "User",
        redirectId: null,
        parentId: '001',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 4,
        auth: null,
        type: 1,
        query: null,
        viewPath: 'views/sys/users.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    }]
}

const Sys: IObj = {
    getAllMenus
}

export default Sys
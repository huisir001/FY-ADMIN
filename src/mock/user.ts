/*
 * @Description: 用户数据规则
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-02 15:39:43
 * @LastEditTime: 2022-02-24 17:22:20
 */
import { rules2MockMethods } from './_helpers'
import { Random } from "mockjs"
const Prefix = '/api/user/'

// 用户信息
export const getUserInfo = {
    data: {
        id: '@id',
        username: 'admin',
        nickname: '@cname',
        'sex|0-2': 1,
        email: '@email',
        phone: /^(13[0-9]|14[57]|15[0-9]|18[0-35-9])\d{8}$/,
        status: 1, //1-正常；0-停用
        avatar: Random.image('50x50', '#2f3447', '#FFF', 'A'),
        roleIds: "001,002,003",
        roleNames: "超级管理员,游客,测试",
        dept: { // 所属部门
            id: '002',
            name: '行政部',
        }
    }
}

// 注册
const signup = {
    data: getUserInfo.data,
    msg: '注册成功'
}

// 登录
const login = {
    data: getUserInfo.data,
    token: '@guid',
    msg: '登录成功'
}

// 登出
const logout = { msg: '注销登陆成功' }

// 重设密码
const resetPass = { msg: '修改密码成功' }

// 查询当前用户菜单列表
export const getUserMenus = {
    data: [{
        id: '001', //主键
        createTime: '@datetime',
        updateTime: '@datetime',
        path: null, //唯一
        title: '系统管理',
        icon: "setting",
        parentId: null,
        keepAlive: true, //默认为true
        visible: true, //默认展示
        private: true, //默认true,必须登录才能访问，否则跳登录页
        orderNum: 1, //排序index
        type: 0, //0-目录；1-普通路由；2-链接；3-按钮(可添加vuex-commit事件)
        query: null, //type=1/2时传参（{a=1,b=2}）
        viewPath: null, //type=1时,跳转的文件路径(相对于src目录),若为null且路由为一级路由，则渲染Layout组件;//type=2时跳转链接
        blank: true, //type=2时在新页面打开链接，默认为true
        triggerMode: null, //type=3时要激活事件的方式：commit/dispatch
        triggerMethod: null, //字符串，type=3时要激活的事件
        status: 1, //1-正常；0-停用
    },
    {
        id: '002',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/sys/dept',
        title: '部门管理',
        icon: "operation",
        parentId: '001',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        type: 1,
        query: null,
        viewPath: 'ui/pages/sys/dept.vue',
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
        icon: "menu",
        parentId: '001',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 3,
        type: 1,
        query: null,
        viewPath: 'ui/pages/sys/menu.vue',
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
        icon: "role",
        parentId: '001',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 4,
        type: 1,
        query: null,
        viewPath: 'ui/pages/sys/role.vue',
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
        icon: "user",
        parentId: '001',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 4,
        type: 1,
        query: null,
        viewPath: 'ui/pages/sys/users.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    {
        id: '003', //主键
        createTime: '@datetime',
        updateTime: '@datetime',
        path: null, //唯一
        title: '布局容器',
        icon: "layout",
        parentId: null,
        keepAlive: true, //默认为true
        visible: true, //默认展示
        private: true, //默认true,必须登录才能访问，否则跳登录页
        orderNum: 1, //排序index
        type: 0, //0-目录；1-普通路由；2-链接；3-按钮(可添加vuex-commit事件)
        query: null, //type=1/2时传参（{a=1,b=2}）
        viewPath: null, //type=1时,跳转的文件路径(相对于src目录),若为null且路由为一级路由，则渲染Layout组件;//type=2时跳转链接
        blank: true, //type=2时在新页面打开链接，默认为true
        triggerMode: null, //type=3时要激活事件的方式：commit/dispatch
        triggerMethod: null, //字符串，type=3时要激活的事件
        status: 1, //1-正常；0-停用
    },
    {
        id: '004',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/layout/full',
        title: '整体布局',
        icon: "fullScreen",
        parentId: '003',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        type: 1,
        query: null,
        viewPath: 'views/examples/container/full.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    {
        id: '@id',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/layout/grid',
        title: '栅格布局',
        icon: "grid",
        parentId: '003',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        type: 1,
        query: null,
        viewPath: 'views/examples/container/grid.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    {
        id: '005', //主键
        createTime: '@datetime',
        updateTime: '@datetime',
        path: null, //唯一
        title: '组件示例',
        icon: "Module",
        parentId: null,
        keepAlive: true, //默认为true
        visible: true, //默认展示
        private: true, //默认true,必须登录才能访问，否则跳登录页
        orderNum: 1, //排序index
        type: 0, //0-目录；1-普通路由；2-链接；3-按钮(可添加vuex-commit事件)
        query: null, //type=1/2时传参（{a=1,b=2}）
        viewPath: null, //type=1时,跳转的文件路径(相对于src目录),若为null且路由为一级路由，则渲染Layout组件;//type=2时跳转链接
        blank: true, //type=2时在新页面打开链接，默认为true
        triggerMode: null, //type=3时要激活事件的方式：commit/dispatch
        triggerMethod: null, //字符串，type=3时要激活的事件
        status: 1, //1-正常；0-停用
    },
    {
        id: '006',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/example/card',
        title: '卡片',
        icon: "Postcard",
        parentId: '005',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        type: 1,
        query: null,
        viewPath: 'views/examples/basicComp/card.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    {
        id: '@id',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/example/editor',
        title: '富文本编辑器',
        icon: "Edit",
        parentId: '005',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        type: 1,
        query: null,
        viewPath: 'views/examples/basicComp/editor.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    {
        id: '007', //主键
        createTime: '@datetime',
        updateTime: '@datetime',
        path: null, //唯一
        title: '页面示例',
        icon: "PageManage",
        parentId: null,
        keepAlive: true, //默认为true
        visible: true, //默认展示
        private: true, //默认true,必须登录才能访问，否则跳登录页
        orderNum: 1, //排序index
        type: 0, //0-目录；1-普通路由；2-链接；3-按钮(可添加vuex-commit事件)
        query: null, //type=1/2时传参（{a=1,b=2}）
        viewPath: null, //type=1时,跳转的文件路径(相对于src目录),若为null且路由为一级路由，则渲染Layout组件;//type=2时跳转链接
        blank: true, //type=2时在新页面打开链接，默认为true
        triggerMode: null, //type=3时要激活事件的方式：commit/dispatch
        triggerMethod: null, //字符串，type=3时要激活的事件
        status: 1, //1-正常；0-停用
    },
    {
        id: '008',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/pages/success',
        title: '成功页',
        icon: "DocumentChecked",
        parentId: '007',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        type: 1,
        query: null,
        viewPath: 'views/examples/pages/success.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    {
        id: '009',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/pages/fail',
        title: '失败页',
        icon: "DocumentDelete",
        parentId: '007',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        type: 1,
        query: null,
        viewPath: 'views/examples/pages/fail.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    {
        id: '011',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: null,
        title: '链接',
        icon: "Link",
        parentId: null,
        keepAlive: true,
        visible: false,
        private: true,
        orderNum: 2,
        type: 0,
        query: null,
        viewPath: null,
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    {
        id: '012',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: null,
        src: "https://www.zuifengyun.com",
        title: '框架内',
        icon: null,
        parentId: "011",
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        type: 2,
        query: null,
        viewPath: null,
        blank: false,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    {
        id: '013',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: null,
        src: "https://www.zuifengyun.com",
        title: '新标签',
        icon: null,
        parentId: '011',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        type: 2,
        query: null,
        viewPath: null,
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    {
        id: '014',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: null,
        title: '按钮',
        icon: "ClickButton",
        parentId: null,
        keepAlive: true,
        visible: false,
        private: true,
        orderNum: 2,
        type: 0,
        query: null,
        viewPath: null,
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    }, {
        id: '@id',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: null,
        src: null,
        title: '按钮1',
        icon: null,
        parentId: '014',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        type: 3,
        query: null,
        viewPath: null,
        blank: true,
        triggerMode: 'commit',
        triggerMethod: 'common/sidebarBtn1',
        status: 1,
    }, {
        id: '@id',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: null,
        src: null,
        title: '按钮2',
        icon: null,
        parentId: '014',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        type: 3,
        query: null,
        viewPath: null,
        blank: true,
        triggerMode: 'dispatch',
        triggerMethod: 'common/sidebarBtn2',
        status: 1,
    }, {
        id: '015',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: null,
        title: '监控',
        icon: "Monitor",
        parentId: null,
        keepAlive: true,
        visible: false,
        private: true,
        orderNum: 2,
        type: 0,
        query: null,
        viewPath: null,
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    }, {
        id: '@id',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/monitor/reqlogs',
        title: '请求日志',
        icon: "Document",
        parentId: '015',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 4,
        type: 1,
        query: null,
        viewPath: 'ui/pages/monitor/reqlogs.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    }, {
        id: '@id',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/monitor/loginlogs',
        title: '登录日志',
        icon: "LoginLogs",
        parentId: '015',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 4,
        type: 1,
        query: null,
        viewPath: 'ui/pages/monitor/loginlogs.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    ]
}

const Rules: IObj = {
    signup,
    login,
    getUserInfo,
    logout,
    resetPass,
    getUserMenus
}

export default rules2MockMethods(Rules, Prefix)
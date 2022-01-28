/*
 * @Description: 系统配置(唯总管理员才有权限)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-15 15:10:44
 * @LastEditTime: 2022-01-28 14:38:17
 */
import user from './user'

// 查询所有菜单，用于菜单管理
const getAllMenus = {
    data: [{
        id: '001', //主键
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/sys', //唯一
        title: '系统配置',
        icon: "setting",
        redirectId: '002',
        parentId: null,
        keepAlive: true, //默认为true
        visible: true, //默认展示
        private: true, //默认true,必须登录才能访问，否则跳登录页
        orderNum: 1, //排序index
        auth: null, //权限，空字符串或null则为所有权限
        type: 1, //0-目录；1-普通路由；2-链接；3-按钮(可添加vuex-commit事件)
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
        icon: "menu",
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
        icon: "role",
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
        icon: "user",
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
    },
    {
        id: '003', //主键
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/layout', //唯一
        title: '布局容器',
        icon: "layout",
        redirectId: '004',
        parentId: null,
        keepAlive: true, //默认为true
        visible: true, //默认展示
        private: true, //默认true,必须登录才能访问，否则跳登录页
        orderNum: 1, //排序index
        auth: null, //权限，空字符串或null则为所有权限
        type: 1, //0-目录；1-普通路由；2-链接；3-按钮(可添加vuex-commit事件)
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
        redirectId: null,
        parentId: '003',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        auth: null,
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
        redirectId: null,
        parentId: '003',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        auth: null,
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
        path: '/example', //唯一
        title: '组件示例',
        icon: "Module",
        redirectId: '006',
        parentId: null,
        keepAlive: true, //默认为true
        visible: true, //默认展示
        private: true, //默认true,必须登录才能访问，否则跳登录页
        orderNum: 1, //排序index
        auth: null, //权限，空字符串或null则为所有权限
        type: 1, //0-目录；1-普通路由；2-链接；3-按钮(可添加vuex-commit事件)
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
        redirectId: null,
        parentId: '005',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        auth: null,
        type: 1,
        query: null,
        viewPath: 'views/examples/basicComp/card.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    {
        id: '007', //主键
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/example', //唯一
        title: '页面示例',
        icon: "PageManage",
        // redirectId: '008',
        parentId: null,
        keepAlive: true, //默认为true
        visible: true, //默认展示
        private: true, //默认true,必须登录才能访问，否则跳登录页
        orderNum: 1, //排序index
        auth: null, //权限，空字符串或null则为所有权限
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
        redirectId: null,
        parentId: '007',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        auth: null,
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
        redirectId: null,
        parentId: '007',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        auth: null,
        type: 1,
        query: null,
        viewPath: 'views/examples/pages/fail.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    {
        id: '010',
        createTime: '@datetime',
        updateTime: '@datetime',
        path: '/pages/fail',
        title: '测试子目录1',
        icon: "DocumentDelete",
        redirectId: null,
        parentId: '009',
        keepAlive: true,
        visible: true,
        private: true,
        orderNum: 2,
        auth: null,
        type: 1,
        query: null,
        viewPath: 'views/examples/pages/fail.vue',
        blank: true,
        triggerMode: null,
        triggerMethod: null,
        status: 1,
    },
    ]
}

// 查询所有部门，用于部门管理
const getAllDept = {
    data: [
        {
            id: '002',
            name: '行政部',
            status: '@integer(0, 1)',
            leader: '@cname',
            email: '@email',
            phone: /^(13[0-9]|14[57]|15[0-9]|18[0-35-9])\d{8}$/,
            delFlag: '@integer(0, 1)',
            remark: '',
            parentId: null,
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '003',
            name: '人力资源部',
            status: '@integer(0, 1)',
            leader: '@cname',
            email: '@email',
            phone: /^(13[0-9]|14[57]|15[0-9]|18[0-35-9])\d{8}$/,
            delFlag: '@integer(0, 1)',
            remark: '',
            parentId: null,
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '004',
            name: '销售部',
            status: '@integer(0, 1)',
            leader: '@cname',
            email: '@email',
            phone: /^(13[0-9]|14[57]|15[0-9]|18[0-35-9])\d{8}$/,
            delFlag: '@integer(0, 1)',
            remark: '',
            parentId: null,
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '005',
            name: '技术部',
            status: '@integer(0, 1)',
            leader: '@cname',
            email: '@email',
            phone: /^(13[0-9]|14[57]|15[0-9]|18[0-35-9])\d{8}$/,
            delFlag: '@integer(0, 1)',
            remark: '',
            parentId: null,
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '006',
            name: '财务部',
            status: '@integer(0, 1)',
            leader: '@cname',
            email: '@email',
            phone: /^(13[0-9]|14[57]|15[0-9]|18[0-35-9])\d{8}$/,
            delFlag: '@integer(0, 1)',
            remark: '',
            parentId: null,
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '007',
            name: '网络部',
            status: '@integer(0, 1)',
            leader: '@cname',
            email: '@email',
            phone: /^(13[0-9]|14[57]|15[0-9]|18[0-35-9])\d{8}$/,
            delFlag: '@integer(0, 1)',
            remark: '',
            parentId: '005',
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '008',
            name: '测试部',
            status: '@integer(0, 1)',
            leader: '@cname',
            email: '@email',
            phone: /^(13[0-9]|14[57]|15[0-9]|18[0-35-9])\d{8}$/,
            delFlag: '@integer(0, 1)',
            remark: '',
            parentId: '005',
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '009',
            name: '开发部',
            status: '@integer(0, 1)',
            leader: '@cname',
            email: '@email',
            phone: /^(13[0-9]|14[57]|15[0-9]|18[0-35-9])\d{8}$/,
            delFlag: '@integer(0, 1)',
            remark: '',
            parentId: '005',
            createTime: '@datetime',
            updateTime: '@datetime',
        },
    ]
}

// 查询所有角色
const getAllRole = {
    data: [
        {
            id: '001',
            name: '超级管理员',
            key: "admin",
            status: '@integer(0, 1)',
            delFlag: '@integer(0, 1)',
            remark: '',
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '002',
            name: '游客',
            key: "visitor",
            status: '@integer(0, 1)',
            delFlag: '@integer(0, 1)',
            remark: '',
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '003',
            name: '测试',
            key: "test",
            status: '@integer(0, 1)',
            delFlag: '@integer(0, 1)',
            remark: '',
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '004',
            name: '运营',
            key: "op",
            status: '@integer(0, 1)',
            delFlag: '@integer(0, 1)',
            remark: '',
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '005',
            name: '开发',
            key: "dev",
            status: '@integer(0, 1)',
            delFlag: '@integer(0, 1)',
            remark: '',
            createTime: '@datetime',
            updateTime: '@datetime',
        },
    ]
}

// 查询所有用户列表（用于用户管理）
const getUsersByPage = {
    data: {
        'list|15': [{
            ...user.getUserInfo.data,
            username: '@name',
            createTime: '@datetime',
            updateTime: '@datetime',
        }],
        page: 1,
        limit: 10,
        total: 100,
        pageTotal: 10
    }
}

// 保存账号(新增、编辑)
const saveUserInfo = { msg: '保存成功' }
// 保存菜单(新增、编辑)
const saveMenu = saveUserInfo
// 保存角色(新增、编辑)
const saveRole = saveUserInfo
// 保存部门(新增、编辑)
const saveDept = saveUserInfo
// 删除账号(删除单个、多个)
const delUsers = { msg: '删除成功' }
// 删除菜单
const delMenu = delUsers
// 删除角色
const delRole = delUsers
// 删除部门
const delDept = delUsers

const Sys: IObj = {
    getAllMenus,
    getAllDept,
    getAllRole,
    getUsersByPage,
    saveUserInfo,
    saveMenu,
    saveRole,
    saveDept,
    delUsers,
    delMenu,
    delRole,
    delDept
}

export default Sys
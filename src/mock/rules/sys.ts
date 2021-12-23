/*
 * @Description: 系统配置(唯总管理员才有权限)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-15 15:10:44
 * @LastEditTime: 2021-12-23 14:01:23
 */

// 查询所有菜单，用于菜单管理
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
        icon: "Role",
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

// 查询所有部门，用于部门管理
const getAllDept = {
    data: [
        {
            id: '002',
            name: '行政部',
            status: '@integer(0, 1)',
            leader: '@cname',
            email: '@email',
            phone: /^1[3-9][0-9]{9}$/,
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
            phone: /^1[3-9][0-9]{9}$/,
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
            phone: /^1[3-9][0-9]{9}$/,
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
            phone: /^1[3-9][0-9]{9}$/,
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
            phone: /^1[3-9][0-9]{9}$/,
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
            phone: /^1[3-9][0-9]{9}$/,
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
            phone: /^1[3-9][0-9]{9}$/,
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
            phone: /^1[3-9][0-9]{9}$/,
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
            id: '@id',
            name: '超级管理员',
            key: "admin",
            status: '@integer(0, 1)',
            delFlag: '@integer(0, 1)',
            remark: '',
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '@id',
            name: '游客',
            key: "visitor",
            status: '@integer(0, 1)',
            delFlag: '@integer(0, 1)',
            remark: '',
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '@id',
            name: '测试',
            key: "test",
            status: '@integer(0, 1)',
            delFlag: '@integer(0, 1)',
            remark: '',
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '@id',
            name: '运营',
            key: "op",
            status: '@integer(0, 1)',
            delFlag: '@integer(0, 1)',
            remark: '',
            createTime: '@datetime',
            updateTime: '@datetime',
        },
        {
            id: '@id',
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

const Sys: IObj = {
    getAllMenus,
    getAllDept,
    getAllRole
}

export default Sys
/*
 * @Description: 系统配置(唯总管理员才有权限)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-15 15:10:44
 * @LastEditTime: 2022-02-08 14:41:01
 */
import user from './user'

// 查询所有菜单，用于菜单管理
const getAllMenus = user.getUserMenus

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
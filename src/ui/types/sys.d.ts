/*
 * @Description: 系统管理页相关类型
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-03-01 14:01:24
 * @LastEditTime: 2022-04-06 11:33:07
 */

/**
 * 部門數據
 */
declare interface IDept {
    id?: string
    name?: string
    status?: 1 | 0 //1-正常；0-停用
    leader?: string
    email?: string
    phone?: string
    delFlag?: 1 | 0 //1-已刪除；0-正常
    remark?: string
    parentId?: string | null
    createTime?: string
    updateTime?: string
}

/**
 * 角色數據
 */
declare interface IRole {
    id?: string
    name?: string
    key?: string
    status?: 1 | 0 //1-正常；0-停用
    delFlag?: 1 | 0 //1-已刪除；0-正常
    remark?: string
    createTime?: string
    updateTime?: string
}

/**
 * 菜单参数
 */
declare interface IMenu {
    id: string //主键
    createTime: string
    updateTime: string
    path: string
    title: string
    icon: string
    parentId?: string
    keepAlive: boolean //默认为true
    visible: boolean //默认展示,false时不展示，但用链接能够访问
    private: boolean //默认true,必须登录才能访问，否则跳登录页
    orderNum: number //排序index
    type: 0 | 1 | 2 | 3 //0-目录；1-普通路由；2-链接；3-按钮(可添加vuex-commit事件)
    query?: string //type=1/2时传参（{a=1,b=2}）
    viewPath?: string //type=1时跳转的文件路径(相对于src目录)若为null,且路由为一级路由，则渲染Layout组件;//type=2时跳转链接
    blank: boolean //type=2时在新页面打开链接，默认为true
    triggerMode?: 'commit' | 'dispatch' //type=3时要激活事件的方式：commit/dispatch
    triggerMethod?: string //字符串，type=3时要激活的事件
    status: 1 | 0 //1-正常；0-停用（停用时用户无法查询，且访问受限），admin能查询所有菜单，侧边栏不展示
    children?: IMenu[],
    src?: string //link-链接
}

/**
 * 用户数据
 */
declare interface IUserInfo extends IObj {
    id?: string
    username: string
    password?: string
    nickname?: string
    email?: string
    phone?: string
    avatar?: string
    sex?: 0 | 1 | 2 | '' | '0' | '1' | '2'     //0-保密 1-男 2-女 ''-全部
    status?: 0 | 1 | '' | '0' | '1'    //0-冻结 1-正常  ''-全部
    createTime?: string
    updateTime?: string
    roleIds?: string  //角色，逗号分割角色ID号
    roleNames?: string  //角色，逗号分割角色名称
    deptId?: string //部门ID
    deptName?: string //部门名称
}

/**
 * 用户分页列表入参
 */
declare interface IGetUsersParams {
    search?: IUserInfo
    page?: number // 当前页码
    limit?: number // 每页条数
}
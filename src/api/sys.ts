/*
 * @Description: 系統配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 09:57:09
 * @LastEditTime: 2021-12-27 14:16:46
 */
import Req from "../utils/Request"
const Prefix = '/api/sys'

// 所有菜单查询，用于菜单管理（唯总管理员才有权限）
export const getAllMenus: IPromiseFunc = () => Req.get(`${Prefix}/getAllMenus`)
// 所有部门
export const getAllDept: IPromiseFunc = () => Req.get(`${Prefix}/getAllDept`)
// 所有角色
export const getAllRole: IPromiseFunc = () => Req.get(`${Prefix}/getAllRole`)
// 用戶列表
export const getUsersByPage: IPromiseFunc = (params: IGetUsersParams) =>
    Req.get(`${Prefix}/getUsersByPage`, { params })
// 保存账号(新增、编辑)
export const saveUserInfo = (userInfo: IUserInfo) => Req.post(`${Prefix}/saveUserInfo`, userInfo)
// 保存菜单(新增、编辑)
export const saveMenu = (menuInfo: IMenu) => Req.post(`${Prefix}/saveMenu`, menuInfo)
// 保存菜单(新增、编辑)
// export const saveDept = (deptInfo: IMenu) => Req.post(`${Prefix}/saveDept`, deptInfo)
// 保存角色(新增、编辑)
// export const saveRole =  (roleInfo: IUserInfo) => Req.post(`${Prefix}/saveRole`, roleInfo)
// 删除账号(删除单个、多个,逗号分割)
export const delUsers = (ids: string) => Req.post(`${Prefix}/delUsers`, { ids })
// 删除菜单
export const delMenu = (id: string) => Req.post(`${Prefix}/delMenu`, { id })
// 删除角色
export const delRole = (id: string) => Req.post(`${Prefix}/delRole`, { id })
// 删除部门
export const delDept = (id: string) => Req.post(`${Prefix}/delDept`, { id })
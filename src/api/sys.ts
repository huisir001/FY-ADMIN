/*
 * @Description: 系統配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 09:57:09
 * @LastEditTime: 2021-12-21 10:18:15
 */
import Req from "../utils/Request"
const Prefix = '/api/sys'

// 所有菜单查询，用于菜单管理（唯总管理员才有权限）
export const getAllMenus: IPromiseFunc = () => Req.get(`${Prefix}/getAllMenus`)
// 所有部门
export const getAllDept: IPromiseFunc = () => Req.get(`${Prefix}/getAllDept`)
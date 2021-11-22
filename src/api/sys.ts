/*
 * @Description: 系統配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 09:57:09
 * @LastEditTime: 2021-11-22 13:54:03
 */
import Req from "../utils/Request"
const Prefix = '/api/sys'

// 所有菜单查询，用于菜单管理（唯总管理员才有权限）
export const getAllMenus: IPromiseFunc = () => Req.get(`${Prefix}/getAllMenus`)
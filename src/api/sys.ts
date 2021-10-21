/*
 * @Description: 系統配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 09:57:09
 * @LastEditTime: 2021-10-21 10:01:05
 */
import Req from "../utils/Request"
const Prefix = '/api/sys'

// 用戶菜单查询
export const getUserMenus: IPromiseFunc = () => Req.get(`${Prefix}/getUserMenus`)
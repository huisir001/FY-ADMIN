/*
 * @Description: 通知公告
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-06 17:37:00
 * @LastEditTime: 2022-04-06 17:58:38
 */
import Req from "../utils/Request";
const Prefix = "/api/msg";

// 查询通知公告列表
export const getMsgsByPage: IPromiseFunc = (page: number, limit: number = 15) =>
    Req.get(`${Prefix}/getMsgsByPage`, {
        params: {
            page, limit
        }
    })

// 查询通知公告详情
export const getMsgDetail: IPromiseFunc = (id) =>
    Req.get(`${Prefix}/getMsgDetail`, { params: { id } })

// 删除通知公告
export const delMsg: IPromiseFunc = (id: string) =>
    Req.post(`${Prefix}/delMsg`, { id })


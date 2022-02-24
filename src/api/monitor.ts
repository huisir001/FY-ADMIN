/*
 * @Description: 监控日志
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-02-24 16:15:38
 * @LastEditTime: 2022-02-24 16:25:10
 */
import Req from "../utils/Request";
const Prefix = "/api/monitor";

// 请求日志列表
export const getReqLogsByPage: IPromiseFunc = (params: IGetLogsParams) =>
    Req.get(`${Prefix}/getReqLogsByPage`, { params });

// 删除请求日志(删除单个、多个,逗号分割)
export const delReqLogs = (ids: string) =>
    Req.post(`${Prefix}/delReqLogs`, { ids });

// 登录日志列表
export const getLoginLogsByPage: IPromiseFunc = (params: IGetLogsParams) =>
    Req.get(`${Prefix}/getLoginLogsByPage`, { params });

// 删除登录日志(删除单个、多个,逗号分割)
export const delLoginReqLogs = (ids: string) =>
    Req.post(`${Prefix}/delLoginReqLogs`, { ids });
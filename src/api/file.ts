/*
 * @Description: 文件相关
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-02 18:06:40
 * @LastEditTime: 2021-11-22 13:54:44
 */
import Req from "../utils/Request"
const Prefix = '/api/file'

// 查询列表
export const getFileListByPage: IPromiseFunc = (params: IGetFileListParams) =>
    Req.get(`${Prefix}/getFileListByPage`, { params })

// 更新文件信息
export const update: IPromiseFunc = (params: IFileParams) =>
    Req.post(`${Prefix}/update`, params)

// 删除文件
export const removeFileById: IPromiseFunc = (id: string) =>
    Req.post(`${Prefix}/removeFileById`, { id })

// 查询文件类目列表
export const getFileGroupList: IPromiseFunc = () =>
    Req.get(`${Prefix}/getFileGroupList`)

// 新增文件类目
export const addFileGroup: IPromiseFunc = (name: string) =>
    Req.post(`${Prefix}/addFileGroup`, { name })
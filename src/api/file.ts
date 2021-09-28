/*
 * @Description: 文件相关
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-02 18:06:40
 * @LastEditTime: 2021-09-28 10:48:08
 */
import Req from "../utils/Request"
const Prefix = '/api/file'

// 查询列表
export const getFileListByPage: IPromiseFunc = (params: IGetFileListParams) => Req.get(`${Prefix}/getFileListByPage`, { params })


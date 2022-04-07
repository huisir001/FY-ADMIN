/*
 * @Description: 类型
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-07 14:41:36
 * @LastEditTime: 2022-04-07 14:41:37
 */
export interface IMessageDetail {
    id?: string
    title?: string
    status?: 1 | 0 // 0-未读，1-已读
    content?: string
    createTime?: string
    updateTime?: string
}
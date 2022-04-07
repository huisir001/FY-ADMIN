/*
 * @Description: 通知公告
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-06 16:53:33
 * @LastEditTime: 2022-04-07 14:38:08
 */
import { rules2MockMethods } from './_helpers'
const Prefix = '/api/msg/'

// 查询通知公告列表
const getMsgsByPage = {
    data: {
        'list|15': [{
            id: '123',
            title: '@ctitle(5, 20)',
            status: 0, // 0-未读，1-已读
            createTime: '@datetime',
            updateTime: '@datetime',
        }, {
            id: '@id',
            title: '@ctitle(5, 20)',
            status: 0, // 0-未读，1-已读
            createTime: '@datetime',
            updateTime: '@datetime',
        }],
        page: 1,
        limit: 10,
        total: 100,
        pageTotal: 10
    }
}

// 查询详情（标记已读）
const getMsgDetail = {
    data: {
        id: '123',
        title: '@ctitle(5, 20)',
        status: 1, // 0-未读，1-已读
        content: '@cparagraph(1, 100)',
        createTime: '@datetime',
        updateTime: '@datetime',
    }
}

// 删除通知公告
const delMsg = { msg: '删除成功' }


const Rules: IObj = {
    getMsgsByPage,
    getMsgDetail,
    delMsg
}

export default rules2MockMethods(Rules, Prefix)
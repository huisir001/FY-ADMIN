/*
 * @Description: 上传
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-24 22:56:35
 * @LastEditTime: 2021-09-28 14:30:59
 */

import { Random } from "mockjs"

// 登录
const upload = {
    data: {
        url: Random.image('64x64', Random.color(), Random.color(), Random.character('upper'))
    },
    msg: '上传成功'
}

// 分頁查文件列表
const getFileListByPage = {
    data: {
        'list|5-10': [
            {
                id: '@id',
                type: '@pick(["pic", "zip"])',
                name: '@csentence(3, 5)',
                createTime: '@datetime',
                size: '@integer(60, 100)',
                dimensions: ['@integer(60, 100)', '@integer(60, 100)'],
                desc: '@cparagraph(1, 3)',
                group: '@integer(1, 10)',
                url: Random.image('64x64', Random.color(), Random.color(), Random.character('upper')),
            }
        ],
        page: 1,
        limit: 10,
        total: 100,
        pageTotal: 10
    }
}

const File: IObj = {
    upload,
    getFileListByPage
}

export default File
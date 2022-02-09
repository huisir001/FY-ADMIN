/*
 * @Description: 上传
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-24 22:56:35
 * @LastEditTime: 2022-02-09 15:05:04
 */
import { rules2MockMethods } from '../helpers'
import { Random } from "mockjs"
const Prefix = '/api/file/'

// 上传文件
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
                name: '@ctitle(3, 5)',
                createTime: '@datetime',
                size: '@integer(60, 100)',
                dimensions: ['@integer(60, 100)', '@integer(60, 100)'],
                desc: '@cparagraph(1, 3)',
                group: '@integer(1, 9)',
                url: Random.image('64x64', Random.color(), Random.color(), Random.character('upper')),
            }
        ],
        page: 1,
        limit: 10,
        total: 100,
        pageTotal: 10
    }
}

// 删除文件
const removeFileById = { msg: '删除成功' }

// 查询类目列表
const getFileGroupList = {
    data: {
        'list|5-10': [
            {
                id: '@id',
                name: '@ctitle(3, 5)',
            },
        ]
    }
}

// 新增类目
const addFileGroup = {
    data: {
        id: '@id',
        name: '@ctitle(3, 5)',
    },
    msg: '新增成功'
}

// 更新文件信息
const update = { msg: '更新成功' }

const Rules: IObj = {
    upload,
    getFileListByPage,
    removeFileById,
    getFileGroupList,
    addFileGroup,
    update
}

export default rules2MockMethods(Rules, Prefix)
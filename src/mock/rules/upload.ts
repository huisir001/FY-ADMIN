/*
 * @Description: 上传
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-24 22:56:35
 * @LastEditTime: 2021-09-24 23:06:09
 */

import { Random } from "mockjs"

// 登录
const upload = {
    data: {
        url: Random.image('64x64', Random.color(), Random.color(), Random.character('upper'))
    },
    msg: '上传成功'
}

export default upload
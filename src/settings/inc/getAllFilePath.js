/*
 * @Description: 配置项工具
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 15:09:11
 * @LastEditTime: 2021-10-22 10:57:19
 */
const fs = require('fs')
const path = require('path')
/**
 * 递归获取文件夹内所有子文件路径集合(node环境)
 */
module.exports = function (dirPath) {
    let tempPathArr = []
    const traverseDir = (dir) => {
        fs.readdirSync(dir).forEach((file) => {
            let fullPath = path.join(dir, file)
            if (fs.lstatSync(fullPath).isDirectory()) {
                // 递归
                traverseDir(fullPath)
            } else {
                // 规范化
                tempPathArr.push(fullPath.replace(new RegExp(`\\${path.sep}`, 'g'), '/').split('src/')[1])
            }
        })
    }
    traverseDir(dirPath)
    return tempPathArr
}
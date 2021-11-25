/*
 * @Description: 配置项工具
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 15:09:11
 * @LastEditTime: 2021-11-25 10:17:26
 */
const fs = require('fs')
const path = require('path')
/**
 * 递归获取文件夹内所有子文件路径集合(node环境)
 */
module.exports = function (dirPath, extname) {
    let tempPathArr = [];
    (function traverseDir (dir) {
        fs.readdirSync(dir).forEach((file) => {
            let fullPath = path.join(dir, file)
            if (fs.lstatSync(fullPath).isDirectory() &&
                !fullPath.includes('login') &&
                !fullPath.includes('404')
            ) {
                // 递归
                traverseDir(fullPath)
            } else if (path.extname(file) === extname) { // extname='.vue'=>只取vue后缀的文件
                // 规范化
                tempPathArr.push(fullPath.replace(new RegExp(`\\${path.sep}`, 'g'), '/').split('src/')[1])
            }
        })
    })(dirPath)
    return tempPathArr
}
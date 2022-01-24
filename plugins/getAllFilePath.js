/*
 * @Description: 配置项工具
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 15:09:11
 * @LastEditTime: 2022-01-24 16:05:25
 */
import { readdirSync, lstatSync } from 'fs';
import { join, extname as _extname, sep } from 'path';
/**
 * 递归获取文件夹内所有子文件路径集合(node环境)
 */
export default function (dirPath, extname) {
    let tempPathArr = [];
    (function traverseDir (dir) {
        readdirSync(dir).forEach((file) => {
            let fullPath = join(dir, file)
            if (lstatSync(fullPath).isDirectory() &&
                !fullPath.includes('login') &&
                !fullPath.includes('404')
            ) {
                // 递归
                traverseDir(fullPath)
            } else if (_extname(file) === extname) { // extname='.vue'=>只取vue后缀的文件
                // 规范化
                tempPathArr.push(fullPath.replace(new RegExp(`\\${sep}`, 'g'), '/').split('src/')[1])
            }
        })
    })(dirPath)
    return tempPathArr
}
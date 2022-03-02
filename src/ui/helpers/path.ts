/*
 * @Description: 处理路径
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-03-02 17:10:46
 * @LastEditTime: 2022-03-02 17:49:26
 */

// 注意：这里的路径为携带`/`或`\\`的字符串，若未携带，则视为非路径

/**
 * 获取分隔符
 */
export const sep = (path: string) => path.includes('\\') ? '\\' : path.includes('/') ? '/' : undefined

/**
 * 获取目录
 */
export const dirname = (path: string) => {
    const _sep = sep(path)
    return _sep ? path.slice(0, path.lastIndexOf(_sep)) : path
}

/**
 * 获取文件名
 * 参数ext为需要截掉的后缀内容
 */
export const basename = (path: string, ext?: string) => {
    const _sep = sep(path)
    return _sep
        ? path.slice(path.lastIndexOf(_sep) + 1, ext ? path.indexOf(ext!) : undefined)
        : path.slice(0, ext ? undefined : path.indexOf(ext!))

}

/**
 * 获取扩展名
 */
export const extname = (path: string) => {
    const dotIndex = path.lastIndexOf('.')
    return dotIndex >= 0 ? path.slice(dotIndex) : path
}

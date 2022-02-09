/*
 * @Description: 辅助
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-02-09 14:54:22
 * @LastEditTime: 2022-02-09 15:00:35
 */
import { MockMethod } from 'vite-plugin-mock'

export const rules2MockMethods = (rules: IObj, prefix: string) => {
    const MockMethods: MockMethod[] = []
    Object.keys(rules).forEach((key) => {
        MockMethods.push({
            url: prefix + key,
            timeout: Math.floor(Math.random() * 100),
            response: () => {
                return {
                    ok: 1,
                    msg: '成功',
                    code: 200,
                    ...rules[key]
                }
            }
        })
    })
    return MockMethods
}
/*
 * @Description: 工具栏方法（固定写死）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-25 10:54:54
 * @LastEditTime: 2021-12-06 10:44:49
 */

import { ref, watch } from 'vue'
import { exportRaw, tree2RawList } from '@/utils/common'
import { ICols } from '../types'
import writeXlsxFile from 'write-excel-file'

export default (tableRef: any, cols: ICols[]) => ({
    /**
     * 列展示
     */
    selectShowCols() {
        // 列筛选
        const colLables = cols.map((item) => item.label).filter((item) => item)
        const showCols = ref(
            cols.filter((item) => item.label && !item.hide).map((item) => item.label)
        )
        // 反馈给父组件
        watch(showCols, (val) => {
            cols.forEach((col) => {
                col.hide = !!(col.label && !val.includes(col.label))
            })
        })
        return {
            colLables,
            showCols
        }
    },
    /**
     * 树形表格展开/折叠
     */
    toggleTreeTableAll(expanded: boolean) {
        (function toggle(data: any[]) {
            data.forEach(row => {
                tableRef.value.toggleRowExpansion(row, expanded)
                if (row.children && row.children.length) {
                    // 递归子项
                    toggle(row.children)
                }
            })
        })(tableRef.value.data)
    },
    /**
     * 导出当前页
     */
    exportCurrPage(n: number) {
        // 树结构解构，标志tableRef.value.rowKey
        const data: any[] = tableRef.value.rowKey ? tree2RawList(tableRef.value.data) : tableRef.value.data
        const keys = Object.keys(data[0])
        if (n === 1) {
            const csvData = data.reduce((prev: string, curr: { [x: string]: any }, index: number) => {
                index === 1 && (prev = `${keys.join(",")}\r\n${keys.map(key => handleCsvWord(data[0][key])).join(',')}`)
                return `${prev}\r\n${keys.map(key => handleCsvWord(curr[key])).join(',')}`
            })
            exportRaw(`${Date.now()}.csv`, csvData)
        } else {
            const row1 = keys.map(key => ({ value: key, fontWeight: "bold", type: String }))
            const row = data.map((item: any) => {
                return keys.map(key => {
                    const errTypeflags = ['object', 'undefined']
                    const value = errTypeflags.includes(typeof item[key]) ? JSON.stringify(item[key]) : item[key]
                    const type = errTypeflags.includes(typeof item[key]) ? String : item[key].constructor
                    return { value, type }
                })
            })
            writeXlsxFile(row, { fileName: `${Date.now()}.xlsx` })
        }
    },
})

/**
 * 处理csv中值
 * 每条记录占一行 以逗号为分隔符 逗号前后的空格会被忽略
 * 字段中包含有逗号，该字段必须用双引号括起来
 * 字段中包含有换行符，该字段必须用双引号括起来
 * 字段前后包含有空格，该字段必须用双引号括起来
 * 字段中如果有双引号，该字段必须用双引号括起来
 * 字段中如果有長字符串且为数字字符串，则添加\t制表符，防止预览时被表格转义为科学计数
 */
function handleCsvWord(value: string) {
    const Characters = [',', ' ', '\r\n', '"']
    if (value && value.toString().split("").find(word => Characters.includes(word))) {
        return `"${value}"`
    } else if (typeof value === "string" && value.length > 5 && !isNaN(Number(value))) {
        // 防止预览时被表格转义为科学计数
        return value + "\t"
    } else {
        return value
    }
}

/*
 * @Description: 表格工具栏配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-01 10:50:15
 * @LastEditTime: 2021-11-01 22:04:56
 */
import { ITableTool, TOptionOfTools } from './types'

export default (options: TOptionOfTools[]) => {

    const tableTools: ITableTool[] = [
        {
            title: '新增',
            name: 'add',
            icon: 'plus',
            position: 'left',
            type: 'primary',
        },
        {
            title: '展开/折叠',
            name: 'fold',
            icon: 'sort',
            position: 'left',
            type: 'info',
            disabled: true
        },
        {
            title: '导出',
            name: 'export',
            icon: 'folder-opened',
            position: 'right',
            disabled: true
        },
        {
            title: '展开搜索表单',
            name: 'search',
            icon: 'search',
            position: 'right',
        },
        {
            title: '刷新',
            name: 'refresh',
            icon: 'refresh',
            position: 'right',
        },
    ]

    return tableTools.filter((item: any) => options.includes(item.name))
}
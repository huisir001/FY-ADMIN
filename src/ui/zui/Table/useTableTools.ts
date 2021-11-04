/*
 * @Description: 表格工具栏配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-01 10:50:15
 * @LastEditTime: 2021-11-04 15:17:37
 */
import { TUseTableTools } from './types'

const tableTools: TUseTableTools = () => ({
    left: [
        {
            title: '新增',
            name: 'add',
            icon: 'plus',
            type: 'primary',
        },
        {
            title: '展开/折叠',
            name: 'fold',
            icon: 'sort',
            type: 'info',
            disabled: true
        },
    ],
    right: [
        {
            title: '列展示',
            name: 'cols',
            icon: 'operation',
            position: 'right',
        },
        {
            title: '导出',
            name: 'export',
            icon: 'export',
            position: 'right',
            disabled: true
        },
        {
            title: '搜索表单显隐',
            name: 'search',
            icon: 'search',
            position: 'right',
        },
        {
            title: '刷新',
            name: 'refresh',
            icon: 'refresh',
            position: 'right',
        }
    ]
})
export default tableTools
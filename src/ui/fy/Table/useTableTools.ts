/*
 * @Description: 表格工具栏配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-01 10:50:15
 * @LastEditTime: 2021-12-16 10:43:20
 */
import { TUseTableTools } from '../types'

const tableTools: TUseTableTools = () => ({
    left: [
        {
            title: '新增',
            name: 'add',
            icon: 'plus',
            type: 'primary',
        },
        {
            title: '删除',
            name: 'delete',
            icon: 'delete',
            type: 'danger',
        },
        {
            title: '展开/折叠',
            name: 'fold',
            icon: 'sort',
            type: 'info',
            // disabled: true
        },
    ],
    right: [
        {
            title: '列展示',
            name: 'cols',
            icon: 'operation',
            position: 'right',
            dropdown: true
        },
        {
            title: '导出当前页',
            name: 'export',
            icon: 'export',
            position: 'right',
            dropdown: true
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
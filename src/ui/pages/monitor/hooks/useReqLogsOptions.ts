/*
 * @Description: 请求日志管理-配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-05 11:41:30
 * @LastEditTime: 2022-02-24 15:39:00
 */
import { IFormOption, ICols, TOptionOfTools } from '@/ui/fy/types'
import { ref } from "vue"
export default () => {
    /**
     * 搜索栏配置
     */
    const searchOptions: IFormOption[] = [
        {
            label: '用户ID',
            component: 'input',
            key: 'userId',
            props: {
                placeholder: '请输入用户ID',
            },
        },
        {
            label: '用户名',
            component: 'input',
            key: 'username',
            props: {
                placeholder: '请输入用户名',
            },
        },
        {
            label: 'IP地址',
            component: 'input',
            key: 'ip',
            props: {
                placeholder: '请输入ip',
            },
        },
        {
            label: '创建时间',
            component: 'date-picker',
            key: 'dateRange',
            props: {
                type: 'daterange',
                rangeSeparator: '-',
                startPlaceholder: '开始时间',
                endPlaceholder: '结束时间',
            },
        },
    ]

    /**
     * 表格列配置
     */
    const tableCols: ICols[] = [
        {
            minWidth: 50,
            type: "selection",
            align: "center"
        },
        {
            label: '访客IP',
            minWidth: 100,
            prop: 'ip'
        },
        {
            label: '用户id',
            minWidth: 120,
            prop: 'userId',
        },
        {
            label: '用户名',
            minWidth: 100,
            prop: 'username',
        },
        {
            label: '请求地址',
            minWidth: '200',
            prop: 'action',
        },
        {
            label: '操作说明',
            minWidth: 100,
            prop: 'desc',
        },
        {
            label: '创建时间',
            prop: 'createTime',
            minWidth: 160,
            sortable: true,
        },
        {
            label: '操作',
            fixed: 'right',
            minWidth: 60,
            slot: 'todo',
        },
    ]

    /**
     * 表格工具欄
     */
    const tableTools: TOptionOfTools[] = ['delete', 'search', 'export', 'refresh', 'cols']


    return {
        searchOptions,
        tableCols: ref(tableCols),
        tableTools,
    }
}
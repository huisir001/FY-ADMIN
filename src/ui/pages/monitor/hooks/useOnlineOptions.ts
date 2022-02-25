/*
 * @Description: 在线用户管理-配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-05 11:41:30
 * @LastEditTime: 2022-02-25 18:19:36
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
            label: '登录时间',
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
            label: 'IP地址',
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
            label: '登录地点',
            minWidth: '200',
            prop: 'location',
        },
        {
            label: '反馈信息',
            minWidth: 100,
            prop: 'msg',
        },
        {
            label: '操作系统',
            minWidth: 100,
            prop: 'os',
        },
        {
            label: '浏览器',
            minWidth: 100,
            prop: 'browser',
        },
        {
            label: '登录时间',
            prop: 'createTime',
            minWidth: 160,
            sortable: true,
        },
        {
            label: '登录状态',
            minWidth: 80,
            slot: 'status',
        },
        {
            label: '操作',
            fixed: 'right',
            minWidth: 160,
            slot: 'todo',
        },
    ]

    /**
     * 表格工具欄
     */
    const tableTools: TOptionOfTools[] = ['search', 'export', 'refresh', 'cols']


    return {
        searchOptions,
        tableCols: ref(tableCols),
        tableTools,
    }
}
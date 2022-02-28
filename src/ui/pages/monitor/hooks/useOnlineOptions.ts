/*
 * @Description: 在线用户管理-配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-05 11:41:30
 * @LastEditTime: 2022-02-28 15:05:22
 */
import { IFormOption, IDetailOption, ICols, TOptionOfTools } from '@/ui/fy/types'
import { ref } from "vue"
export default () => {
    /**
     * 搜索栏配置
     */
    const searchOptions: IFormOption[] = [
        {
            label: '用户ID',
            component: 'input',
            key: 'id',
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
            label: '用户id',
            minWidth: 140,
            prop: 'id',
        },
        {
            label: '账号',
            minWidth: 120,
            prop: 'username',
        },
        {
            label: '昵称',
            minWidth: 60,
            prop: 'nickname',
        },
        {
            label: '性别',
            minWidth: 60,
            align: "center",
            prop: 'sex',
            formatter: (row: IObj, column: IObj, cellValue: number) => {
                const sex = ["保密", "男", "女"]
                return sex[cellValue && Number(cellValue)]
            },
        },
        {
            label: '角色',
            minWidth: '200',
            slot: 'role',
        },
        {
            label: 'IP地址',
            minWidth: 110,
            prop: 'ip'
        },
        {
            label: '登录地点',
            minWidth: '200',
            prop: 'location',
        },
        {
            label: '登录时间',
            prop: 'loginTime',
            minWidth: 160,
            sortable: true,
        },
        {
            label: '操作',
            fixed: 'right',
            minWidth: 160,
            slot: 'todo',
        },
    ]

    const detailOptions: IDetailOption[] = [
        {
            label: '用户id',
            key: 'id',
        },
        {
            label: '账号',
            key: 'username',
        },
        {
            label: '昵称',
            key: 'nickname',
        },
        {
            label: '性别',
            key: 'sex',
            formatter: (params: IObj) => {
                const sexs = ["保密", "男", "女"]
                return sexs[params.sex]
            },
        },
        {
            label: '邮箱',
            key: 'email',
        },
        {
            label: '手机号',
            key: 'phone',
        },
        {
            label: '状态',
            key: 'status',
            formatter: (params: IObj) => {
                const statusArr = ["冻结", "正常"]
                return statusArr[params.status]
            },
        },
        {
            label: '角色',
            key: 'roleNames',
        },
        {
            label: '部门',
            key: 'dept',
            formatter: (params: IObj) => params.dept.name,
        },
        {
            label: 'IP地址',
            key: 'ip'
        },
        {
            label: '登录地点',
            key: 'location',
        },
        {
            label: '操作系统',
            key: 'os',
        },
        {
            label: '浏览器',
            key: 'browser',
        },
        {
            label: '登录时间',
            key: 'loginTime',
        },
    ]

    /**
     * 表格工具欄
     */
    const tableTools: TOptionOfTools[] = ['forcedExit', 'search', 'export', 'refresh', 'cols']


    return {
        searchOptions,
        tableCols: ref(tableCols),
        tableTools,
        detailOptions
    }
}
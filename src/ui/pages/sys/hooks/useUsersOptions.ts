/*
 * @Description: 用户管理-配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-05 11:41:30
 * @LastEditTime: 2022-04-06 14:41:25
 */
import { IFormOption, ICols, TOptionOfTools } from '@/ui/fy/types'
import { ref } from "vue"
export default () => {
    /**
     * 搜索栏配置
     */
    const searchOptions: IFormOption[] = [
        {
            label: '账号',
            component: 'input',
            key: 'username',
            props: {
                placeholder: '请输入账号',
            },
        },
        {
            label: '昵称',
            component: 'input',
            key: 'nickname',
            props: {
                placeholder: '请输入昵称',
            },
        },
        {
            label: '手机号码',
            component: 'input',
            key: 'phone',
            props: {
                placeholder: '请输入手机号码',
            },
        },
        {
            label: '邮箱',
            component: 'input',
            key: 'email',
            props: {
                placeholder: '请输入邮箱',
            },
        },
        {
            label: '用户ID',
            component: 'input',
            key: 'id',
            props: {
                placeholder: '请输入用户ID',
            },
        },
        {
            label: '性别',
            component: 'select',
            key: 'sex',
            props: {
                placeholder: '选择用户性别',
            },
            options: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '保密',
                    value: '0',
                },
                {
                    label: '男',
                    value: '1',
                },
                {
                    label: '女',
                    value: '2',
                },
            ],
        },
        {
            label: '状态',
            component: 'select',
            key: 'status',
            props: {
                placeholder: '选择用户状态',
            },
            options: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '冻结',
                    value: '0',
                },
                {
                    label: '正常',
                    value: '1',
                },
            ],
        },
        {
            label: '部门',
            key: 'deptId',
            slot: 'deptId',
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
            label: '登录账号',
            minWidth: 100,
            prop: 'username'
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
            label: '邮箱',
            minWidth: '200',
            prop: 'email',
        },
        {
            label: '手机号',
            minWidth: 100,
            prop: 'phone',
        },
        {
            label: '部门',
            minWidth: 100,
            prop: 'deptName',
        },
        {
            label: '角色',
            minWidth: 200,
            slot: 'role',
        },
        {
            label: '状态',
            minWidth: 80,
            slot: 'status',
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
            minWidth: 120,
            slot: 'todo',
        },
    ]

    /**
     * 表格工具欄
     */
    const tableTools: TOptionOfTools[] = ['add', 'delete', 'search', 'export', 'refresh', 'cols']

    /**
     * 编辑弹窗配置
     */
    const editOptions: IFormOption[] = [
        {
            label: '账号',
            component: 'input',
            key: 'username',
            props: {
                placeholder: '请输入账号',
            },
            rules: {
                required: true,
                trigger: 'blur',
                message: '账号不能为空'
            }
        },
        {
            label: '密码',
            component: 'input',
            key: 'password',
            props: {
                placeholder: '请输入密码',
                type: 'password',
                autocomplete: 'off'
            },
            rules: {
                required: true,
                trigger: 'blur',
                message: '密码不能为空'
            }
        },
        {
            label: '部门',
            key: 'deptId',
            slot: 'deptId',
            default: null,
        },
        {
            label: '角色',
            key: 'roleIdArr',
            slot: 'role',
            rules: {
                required: true,
                trigger: 'blur',
                message: '角色不能为空',
            },
        },
        {
            label: '昵称',
            component: 'input',
            key: 'nickname',
            props: {
                placeholder: '请输入昵称',
            },
        },
        {
            label: '手机',
            component: 'input',
            key: 'phone',
            props: {
                placeholder: '请输入手机号码',
            },
            rules: {
                trigger: 'blur',
                pattern: /^(13[0-9]|14[57]|15[0-9]|18[0-35-9])\d{8}$/,
                message: '手机号填写错误',
            },
        },
        {
            label: '邮箱',
            component: 'input',
            key: 'email',
            props: {
                placeholder: '请输入邮箱',
            },
            rules: {
                trigger: 'blur',
                pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                message: '邮箱填写错误',
            },
        },
        {
            label: '性别',
            component: 'select',
            key: 'sex',
            props: {
                placeholder: '选择用户性别',
            },
            options: [
                {
                    label: '保密',
                    value: 0,
                },
                {
                    label: '男',
                    value: 1,
                },
                {
                    label: '女',
                    value: 2,
                },
            ],
        },
        {
            label: '状态',
            component: 'switch',
            key: 'status',
            props: {
                activeText: "正常",
                inactiveText: "冻结",
                activeValue: 1,
                inactiveValue: 0
            },
        },
    ]

    return {
        searchOptions,
        tableCols: ref(tableCols),
        tableTools,
        editOptions
    }
}
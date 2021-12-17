/*
 * @Description: 菜单管理-配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-22 16:57:50
 * @LastEditTime: 2021-12-17 18:10:55
 */
import { ICols, IFormOption, TOptionOfTools } from '@/ui/fy/types'
import { ref } from "vue"
export default () => {
    /**
     * 表格列配置
     */
    const tableCols: ICols[] = [
        {
            label: '菜单名称',
            minWidth: 180,
            slot: 'title',
        },
        {
            label: '图标',
            minWidth: 50,
            align: 'center',
            slot: 'icon',
        },
        {
            label: '类型',
            prop: 'type',
            minWidth: 60,
            formatter: (row: IObj, column: IObj, cellValue: number) => {
                const types: IObj = {
                    1: '路由',
                    2: '链接',
                    3: '按钮',
                }
                return types[cellValue]
            },
        },
        {
            label: '路径',
            prop: 'path',
        },
        {
            label: '显隐',
            prop: 'visible',
            minWidth: 60,
            formatter: (row: IObj, column: IObj, cellValue: boolean) => {
                return cellValue ? '显示' : '隐藏'
            },
        },
        {
            label: '登录权限',
            prop: 'private',
            helpTip: '是否需要登录才能访问',
            minWidth: 90,
            formatter: (row: IObj, column: IObj, cellValue: boolean) => {
                return cellValue ? '需要' : '不需要'
            },
        },
        {
            label: '文件路径',
            helpTip: '路由类型的菜单可配置Vue文件路径',
            minWidth: 130,
            prop: 'viewPath',
        },
        {
            label: '缓存',
            helpTip: '页面组件是否做缓存',
            minWidth: 65,
            align: 'center',
            prop: 'keepAlive',
            formatter: (row: IObj, column: IObj, cellValue: boolean) => {
                return cellValue ? '是' : '否'
            },
        },
        {
            label: '权限',
            prop: 'auth',
        },
        {
            label: '排序',
            minWidth: 50,
            align: 'center',
            prop: 'orderNum',
        },
        {
            label: '状态',
            minWidth: 70,
            filters: [
                { text: '111', value: 1 },
                { text: '222', value: 0 },
            ],
            slot: 'status',
        },
        {
            label: '更新时间',
            prop: 'updateTime',
            minWidth: 140,
            sortable: true,
        },
        {
            fixed: 'right',
            minWidth: 180,
            slotHead: 'todoHead',
            slot: 'todo',
        },
    ]

    // 表格工具栏
    const tableTools: TOptionOfTools[] = ['add', 'fold', 'export', 'refresh', 'cols']

    /**
     * 编辑弹窗配置
     */
    const editOptions: IFormOption[] = [
        {
            label: '菜单名称',
            component: 'input',
            key: 'title',
            props: {
                placeholder: '请输入菜单名称',
            },
            rules: {
                required: true,
                trigger: 'blur',
                message: '名称不能为空'
            }
        },
        {
            label: '路径',
            component: 'input',
            key: 'path',
            props: {
                placeholder: '请输入路径',
            },
        },
        {
            label: '排序',
            component: 'input-number',
            key: 'orderNum',
            props: {
                controlsPosition: 'right'
            }
        },
        {
            label: '状态',
            component: 'select',
            key: 'status',
            props: {
                placeholder: '选择状态',
            },
            options: [
                {
                    label: '正常',
                    value: 1,
                },
                {
                    label: '冻结',
                    value: 2,
                },
                {
                    label: '备用',
                    value: 3,
                },
            ],
        },
        {
            label: '图标',
            slot: 'icon',
            key: 'icon',
        },
        {
            label: '权限',
            key: 'auth',
            slot: 'auth'
        },
        {
            label: '显隐',
            component: 'switch',
            key: 'visible',
            props: {
                activeText: "显示",
                inactiveText: "隐藏",
                // activeValue: 1,
                // inactiveValue: 0
            },
        },
        {
            label: '需要登录',
            component: 'switch',
            key: 'private',
            props: {
                activeText: "需要",
                inactiveText: "不需要",
                // activeValue: 1,
                // inactiveValue: 0
            },
        },
        {
            label: '类型',
            key: 'type',
            slot: 'type'
        },
        {
            label: '缓存',
            component: 'switch',
            key: 'keepAlive',
            props: {
                activeText: "是",
                inactiveText: "否",
                // activeValue: 1,
                // inactiveValue: 0
            },
        },
        {
            label: '文件路径',
            key: 'viewPath',
            slot: 'viewPath'
        },
    ]

    return {
        tableCols: ref(tableCols),
        tableTools,
        editOptions
    }
}
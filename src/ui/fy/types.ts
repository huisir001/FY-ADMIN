/*
 * @Description: 类型定义
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-28 14:22:33
 * @LastEditTime: 2021-12-17 18:00:29
 */

/**
 * 表格列配置
 */
export interface ICols {

    // 对应列的类型。 如果设置了selection则显示多选框； 
    // 如果设置了 index 则显示该行的索引（从 1 开始计算）； 
    // 如果设置了 expand 则显示为一个可展开的按钮
    type?: 'selection' | 'index' | 'expand'

    // 仅对 type=selection 的列有效，
    // 返回值用来决定这一行的 CheckBox 是否可以勾选
    selectable?: (row: any, index: number) => boolean

    //列标题 
    label?: string

    // 对应列内容的字段名
    prop?: string

    // 用来格式化内容，返回值为当前行的展示内容
    formatter?: (row: IObj, column: IObj, cellValue: any, index: number) => any

    // 对应列的宽度
    width?: string | number

    // 列对齐方式
    align?: 'left' | 'center' | 'right'

    // 列的自定义 className
    className?: string

    // 当前列标题的自定义类名
    labelClassName?: string

    // 对应列的最小宽度， 与 width 的区别是 
    // width 是固定的，
    // min-width 会把剩余宽度按比例分配给设置了 min-width 的列
    minWidth?: string | number

    // 列是否固定在左侧或者右侧， true 表示固定在左侧
    fixed?: true | 'left' | 'right'

    // 对应列是否可以排序
    // 'custom'：代表用户希望远程排序，需要监听 Table 的 sort-change 事件
    // 相关事件文档：https://element-plus.gitee.io/zh-CN/component/table.html#table-events
    sortable?: true | false | 'custom'

    // 指定数据排序方案，与数组sort方法类似
    sortMethod?: (a: any, b: any) => number

    // 指定数据按照哪个属性进行排序，仅当sortable设置为true且没有设置sort-method的时候有效。 
    // 如果为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推
    sortBy?: string | string[]

    // 数据过滤的选项， 数组格式，数组中的元素需要有 text 和 value 属性。
    // 需要监听 Table 的 filter-change 事件
    filters?: Array<{ text: string, value: any }>

    // 当内容过长被隐藏时显示 tooltip
    showTooltip?: boolean

    // 允许默认插槽，且已定义插槽模板
    // <template #default="scope">...</template>
    slot?: string

    // 允许表头插槽，且已定义表头插槽模板
    // <template #header>...</template>
    slotHead?: string

    // 表头标题带帮助提示
    helpTip?: string

    // 隐藏
    hide?: boolean
}

/**
 * 表格工具栏
 */
export interface ITableTool {
    title: string
    name: string
    icon?: string
    disabled?: boolean
    // 类型（按钮色）：默认primary，只针对position为left位置有效
    type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text'
    dropdown?: boolean // 是否为下拉菜单
}

/**
 * 表格工具左右按钮组
 */
export type TUseTableTools = () => { left: ITableTool[], right: ITableTool[] }

/**
 * 表格工具配置传参
 */
export type TOptionOfTools = 'add' | 'delete' | 'fold' | 'export' | 'search' | 'refresh' | 'cols'

/**
 * 表单验证
 */
export interface IFormRule {
    required?: boolean
    message?: string
    trigger: 'blur' | 'change'
    type?: 'date' | 'array' | 'string'
    min?: number
    max?: number
    validator?: (rule: any, value: any, callback: () => any) => any
    pattern?: RegExp
}

/**
 * 表单项配置
 */
export interface IFormOption {
    // 表单项名称
    label: string
    // 表单项类型
    component?: string
    // 字段
    key: string
    // 验证
    rules?: IFormRule | IFormRule[]
    // 下拉框选项
    options?: Array<{ label: string, value: string | number }>
    // 表单项其他属性
    props?: {
        placeholder?: string
        //year/month/date/dates/datetime/week/datetimerange/daterange/monthrange
        type?: string
        rangeSeparator?: string
        startPlaceholder?: string
        endPlaceholder?: string
        readonly?: boolean
        disabled?: boolean
        //显示在输入框中的格式
        format?: string
        defaultValue?: typeof Date
        defaultTime?: Array<typeof Date>
        //绑定值的格式。不指定则绑定值为 Date 对象: (YYYY-MM-DD|x),x为毫秒数
        valueFormat?: string
        //设置快捷选项，需要传入数组对象
        shortcuts?: Array<{ text: string, value: typeof Date | typeof Function }>
        // 是否多选（select类型）
        multiple?: boolean
        // 是否折叠多选（select类型）
        collapseTags?: boolean
        // 开关属性
        activeText?: string
        inactiveText?: string
        activeValue?: string | number
        inactiveValue?: string | number
        // 数字输入框
        controlsPosition?: 'right'
    },
    // 插槽-自定义表单项
    slot?: string
}
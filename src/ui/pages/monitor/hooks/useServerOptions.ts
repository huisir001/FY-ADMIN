/*
 * @Description: 服务器监控数据配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-02-28 16:31:17
 * @LastEditTime: 2022-02-28 17:45:10
 */
import { IDetailOption, ICols } from '@/ui/fy/types'
export default () => {
    /**
     * cpu
     */
    const cpuOptions: IDetailOption[] = [
        {
            label: '核心数量',
            key: 'cpuNum',
        },
        {
            label: '空闲比例',
            key: 'free',
            formatter: (params: IObj) => `${params.free || 0}%`,
        },
        {
            label: '系统占用',
            key: 'sys',
            formatter: (params: IObj) => `${params.sys || 0}%`,
        },
        {
            label: '用户占用',
            key: 'used',
            formatter: (params: IObj) => `${params.used || 0}%`,
        },
    ]

    /**
     * 内存
     */
    const memOptions: IDetailOption[] = [
        {
            label: '总内存',
            key: 'total',
            formatter: (params: IObj) => `${params.total || 0}G`,
        },
        {
            label: '已用内存',
            key: 'used',
            formatter: (params: IObj) => `${params.used || 0}G`,
        },
        {
            label: '空闲内存',
            key: 'free',
            formatter: (params: IObj) => `${params.free || 0}G`,
        },
        {
            label: '使用率',
            key: 'usage',
            formatter: (params: IObj) => `${params.usage || 0}%`,
        },
    ]

    /**
     * 系统信息
     */
    const sysOptions: IDetailOption[] = [
        {
            label: '服务器名称',
            key: 'name',
        },
        {
            label: '公网IP',
            key: 'ip',
        },
        {
            label: '操作系统',
            key: 'os',
        },
        {
            label: '系统架构',
            key: 'arch',
        },
    ]

    /**
     * 磁盘信息
     */
    const diskOptions: ICols[] = [
        {
            label: '路径',
            minWidth: 100,
            prop: 'dir'
        },
        {
            label: '文件系统',
            minWidth: 100,
            prop: 'sysType',
        },
        {
            label: '总容量',
            minWidth: 100,
            prop: 'total',
        },
        {
            label: '可用大小',
            minWidth: 100,
            prop: 'free',
        },
        {
            label: '已用大小',
            minWidth: 100,
            prop: 'used',
        },
        {
            label: '使用率',
            minWidth: 100,
            prop: 'usage',
            formatter: (row: IObj, column: IObj, cellValue: number) => {
                return cellValue + '%'
            },
        },
    ]



    return {
        cpuOptions,
        memOptions,
        sysOptions,
        diskOptions
    }
}
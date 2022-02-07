/*
 * @Description: UI全局注册
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-03 17:24:53
 * @LastEditTime: 2022-02-07 17:09:05
 */
import { App } from 'vue'
import ElementPlus from 'element-plus'
import svgs from './svgs'
import fy from './fy'

/* 这里ElementPlus使用完整导入，方便扩展 */
export default (app: App<any>) => app.use(ElementPlus, { zIndex: 3000 }).use(svgs).use(fy)
/*
 * @Description: 路由
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-09-17 17:08:47
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'


/**
 * 配置规则：
 * name:'router-name'            // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    cache: true                  // 如果设置为true，则会被 <keep-alive> 缓存
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字,当不设置时显示路由name
    icon: ''                     // 设置该路由的图标，不设置则会使用默认
    hidden: true                 // 当设置 true 的时候该路由不会在侧边栏及导航条出现 如401，login等页面，或者如一些编辑页面
  }
 */

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: () => import('../views/home/index.vue'),
        name: 'home',
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    meta: { hidden: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

/*
 * @Description: 路由
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2022-04-15 11:38:02
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'
import permission from './permission'
import rearHook from './rearHook'


/**
 * 配置规则：
 * 路由path前加“/”代表根节点
 * name:'router-name'            // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
 *   keepAlive: true              // 如果设置为true，则会被 <keep-alive> 缓存（默认全部缓存）
 *   title: 'title'               // 设置该路由在侧边栏\面包屑\浏览器标签栏中展示的名字,当不设置时显示路由name
 *   icon: ''                     // 设置该路由的图标，不设置则会使用默认
 *   private:true                 // 默认true,当设置false时该路由无需登录就可以访问，比如登录页，注册页，404等等，否则必须登录（跳转登录页）
 *   visible:true                 // 默认true,展示到tab栏
 * }
 */

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: { name: 'Dashboard' },
    meta: { visible: false, private: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/home/index.vue'),
        meta: { title: '首页', visible: false, private: true },
      },
      {
        path: '/message',
        name: 'Message',
        component: () => import('../ui/pages/reserve/message.vue'),
        meta: { title: "通知公告", visible: true, private: true, keepAlive: true },
      },
      {
        path: '/frame/:id',
        name: 'Frame',
        component: () => import('../ui/pages/tool/frame.vue'),
        meta: { visible: true, private: true, keepAlive: true },
      },
    ]
  },
  {
    path: '/my',
    component: Layout,
    name: 'My',
    redirect: { name: 'Center' },
    meta: { title: '用户配置', visible: false, private: true, keepAlive: true },
    children: [
      {
        path: 'center',
        name: 'Center',
        component: () => import('../views/my/center.vue'),
        meta: { title: "个人中心", visible: true, private: true, keepAlive: true },
      },
    ]
  },
  {
    path: '/exception',
    component: Layout,
    name: 'Exception',
    redirect: { name: 'E403' },
    meta: { title: '异常', visible: true, private: true, keepAlive: true },
    children: [
      {
        path: '403',
        name: 'E403',
        component: () => import('../ui/pages/exception/403.vue'),
        meta: { title: "403", visible: true, private: true, keepAlive: true },
      },
      {
        path: '404',
        name: 'E404',
        component: () => import('../ui/pages/exception/404.vue'),
        meta: { title: "404", visible: true, private: true, keepAlive: true },
      },
      {
        path: '500',
        name: 'E500',
        component: () => import('../ui/pages/exception/500.vue'),
        meta: { title: "500", visible: true, private: true, keepAlive: true },
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { title: "登录", visible: false, private: false }
  },
  // 由于动态路由的缘故，这里添加假路由，解决动态路由会报警告的问题
  // 同时添加404页面
  {
    path: '/:pathMatch(.*)',
    meta: { title: "404", visible: false, private: false },
    component: () => import('@/views/404/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由权限验证
router.beforeEach(permission)

// 路由切换后钩子
router.afterEach(rearHook)

export default router
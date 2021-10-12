/*
 * @Description: 路由
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-10-12 18:35:56
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'
import permission from './permission'
import rearHook from './rearHook'


/**
 * 配置规则：
 * name:'router-name'            // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
 *   noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存（默认全部缓存）
 *   title: 'title'               // 设置该路由在侧边栏\面包屑\浏览器标签栏中展示的名字,当不设置时显示路由name
 *   icon: ''                     // 设置该路由的图标，不设置则会使用默认
 *   hidden:true                  // 当设置时候不在侧边栏及导航条出现 如401，login等页面，或者一些编辑页面和用户无权限访问的页面
 *   public:true                  // 当设置时该路由无需登录就可以访问，比如登录页，注册页，404等等，否则必须登录（跳转登录页）
 *   unallow:true                 // 当设置时该用户无权访问此页面，提示暂无权限
 * }
 */

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: { name: 'Home' },
    meta: { title: '首页', icon: 'dashboard' },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        meta: { hidden: true }
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('../views/my/index.vue'),
        meta: { title: "个人中心", hidden: true },
      },
      // {
      //   path: '/user',
      //   children: [
      //     {
      //       path: '/my1',
      //       name: 'My1',
      //       component: () => import('../views/my/1.vue'),
      //       meta: { title: "个人中心1", hidden: true }
      //     },
      //     {
      //       path: '/my2',
      //       name: 'My2',
      //       component: () => import('../views/my/2.vue'),
      //       meta: { title: "个人中心2", hidden: true }
      //     },
      //     {
      //       path: '/my3',
      //       name: 'My3',
      //       component: () => import('../views/my/3.vue'),
      //       meta: { title: "个人中心3", hidden: true }
      //     },
      //     {
      //       path: '/my4',
      //       name: 'My4',
      //       component: () => import('../views/my/4.vue'),
      //       meta: { title: "个人中心4", hidden: true }
      //     },
      //     {
      //       path: '/my5',
      //       name: 'My5',
      //       component: () => import('../views/my/5.vue'),
      //       meta: { title: "个人中心5", hidden: true }
      //     },
      //   ]
      // },
      {
        path: '/sys',
        redirect: { name: 'Dept' },
        children: [
          {
            path: '/dept',
            name: 'Dept',
            component: () => import('../views/my/index.vue'),
            meta: { title: "部门管理" }
          },
          {
            path: '/menu',
            name: 'Menu',
            component: () => import('../views/my/index.vue'),
            meta: { title: "菜单管理" }
          },
          {
            path: '/role',
            name: 'Role',
            component: () => import('../views/my/index.vue'),
            meta: { title: "角色管理" }
          },
          {
            path: '/users',
            name: 'Users',
            component: () => import('../views/my/index.vue'),
            meta: { title: "用户管理" }
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { title: "登录", hidden: true, public: true, }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由权限验证
router.beforeEach(permission)

// 路由切换后钩子
router.afterEach(rearHook)

export default router

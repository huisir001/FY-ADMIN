/*
 * @Description: vite config
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-24 14:04:37
 * @LastEditTime: 2022-01-25 11:05:16
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { injectHtml } from 'vite-plugin-html'
import { TITLE, CSSCDN, JSCDN } from './settings'
import { loadEnv } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: '/',
    resolve: {
      // 路径缩写
      alias: {
        '@': path.resolve(__dirname, './src'),
        'public': path.resolve(__dirname, './public'),
        'settings': path.resolve(__dirname, './settings'),
        'theme': path.resolve(__dirname, './src/assets/styles/themes'),
      },
    },
    plugins: [
      vue(),
      injectHtml({
        // 初始化變量配置(传参到html)
        injectData: {
          TITLE,
          CSSCDN,
          JSCDN
        }
      })
    ],
    // 環境變量配置
    define: {
      __NODE_ENV__: `'${loadEnv(mode, process.cwd()).VITE_NODE_ENV}'`,
      __BASE_API__: `'${loadEnv(mode, process.cwd()).VITE_BASE_API}'`,
    },
    json: {
      stringify: true // 导入的 JSON 会被转换为 export default JSON.parse('...')
    },
    server: {
      host: '127.0.0.1',
      port: 8000,
      open: true,
      // proxy: {
      //   // 字符串简写写法
      //   '/foo': 'http://localhost:4567',
      //   // 选项写法
      //   '/api': {
      //     target: 'http://jsonplaceholder.typicode.com',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   },
      //   // 正则表达式写法
      //   '^/fallback/.*': {
      //     target: 'http://jsonplaceholder.typicode.com',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/fallback/, '')
      //   },
      //   // 使用 proxy 实例
      //   '/api': {
      //     target: 'http://jsonplaceholder.typicode.com',
      //     changeOrigin: true,
      //     configure: (proxy, options) => {
      //       // proxy 是 'http-proxy' 的实例
      //     }
      //   }
      // }
    }
  }
})
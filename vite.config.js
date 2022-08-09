/*
 * @Description: vite config
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-24 14:04:37
 * @LastEditTime: 2022-08-02 15:44:00
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { injectHtml } from 'vite-plugin-html'
import { viteMockServe } from "vite-plugin-mock"
import externalGlobals from "rollup-plugin-external-globals"
import { TITLE, CSSCDN, JSCDN } from './settings'
import { loadEnv } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  return {
    base: './',
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
          // 打包时再导入外部CDN，开发环境使用包管理
          JSCDN: command === 'build' ? JSCDN : []
        }
      }),
      /**
       * vite-Mock插件（vue-cli是直接使用，无插件）
       * 开发环境是使用 Connect 中间件实现的。
       * 与生产环境不同，您可以在浏览器控制台中查看网络请求记录
       * https://gitee.com/wangchao2203/vite-plugin-mock
       */
      viteMockServe({
        ignore: /^\_/, // 忽略以_开头的文件
        mockPath: "./src/mock", // 解析根目录下的mock文件夹
        supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
        watchFiles: true, // 监视文件更改
        logger: false, // 关闭控制台请求日志
        localEnabled: command === 'serve',  // 开发打包开关
        prodEnabled: false // 生产环境关闭Mock（这里原本是想生产环境也用mock的，但仔细想了想没必要）
      }),
    ],
    // 環境變量配置
    define: {
      __NODE_ENV__: `'${loadEnv(mode, process.cwd()).VITE_NODE_ENV}'`,
      __BASE_API__: `'${loadEnv(mode, process.cwd()).VITE_BASE_API}'`,
    },
    json: {
      stringify: true // 导入的 JSON 会被转换为 export default JSON.parse('...')
    },
    // 打包配置
    build: {
      target: "es2020",
      // 压缩
      minify: "esbuild",
      sourcemap: false, // 输出.map文件
      rollupOptions: {
        // 确保外部化处理不想打包进库的依赖
        // 外部包
        external: JSCDN.map(item => item.dependencies),
        plugins: [
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          externalGlobals(getOutputGlobals(JSCDN)),
        ],
      }
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

function getOutputGlobals (cdnObjs) {
  const outputGlobals = {}
  cdnObjs.forEach(item => {
    outputGlobals[item.dependencies] = item.globalVar
  })
  return outputGlobals
}
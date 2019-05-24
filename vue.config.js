const path = require('path')
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const postcsspx2rem = require('postcss-px2rem')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 项目部署的基础路径，
  // 默认假设你的应用将会部署在域名的根部，比如将要部署得域名为：https://www.my-app.com/
  // 如果你的应用部署时是在一个子路径下，比如：https://www.foobar.com/my-app/
  // 那么你需要指定子路径，将publicPath这个值改为 `/my-app/`
  // 如果想让打包后得文件，通过本地浏览器打开index.html浏览，那么 将publicPath这个值改为 './'
  publicPath: '/',
  // 将构建好的文件输出到哪里
  outputDir: 'dist',
  // 是否启用eslint检测代码风格
  lintOnSave: false,
  // webpack-dev-server插件，文档位置：https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 3102,
    https: false,
    open: false, // 配置自动启动浏览器
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3102/api',
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否开启代理，设置为true则创建一个本地虚拟服务端，本地虚拟服务端和远程后代服务端通信，就不会有跨域问题
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // PWA 设置
  pwa: {
    name: 'ifredom PWA App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // 配置Workbox插件
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // 注册文件。在InjectManifest模式下需要手动进行注册
      swSrc: 'src/registerServiceWorker.js'
      // ...其他Workbox参数...
    }
  },
  // 编译配置。默认情况下 babel-loader会忽略 node_modules文件夹下的所有文件
  transpileDependencies: [],
  // 包含运行时编译器的 Vue 构建版本
  // 设置为 true 后你就可以在 Vue 组件中使用 template 这一个参数，但是这会让应用额外增加 10kb 左右
  runtimeCompiler: true,
  // 生产环境 sourceMap
  // 设置为true，则会将
  productionSourceMap: false,
  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@styles', resolve('src/styles'))
      .set('@assets', resolve('src/assets'))
      .set('@com', resolve('src/components'))

    // 处理所有svg图片
    config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 模块分析.执行yarn build后，会开启一个本地服务，展示每一个页面得模块大小，以便于对比，进行优化
    if (process.env.NODE_ENV === 'production') {
      config.plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  // vux配置文档：在构建后去除重复css代码 duplicate-style--在构建后去除重复css代码
  configureWebpack: (config) => {
  },
  css: {
    loaderOptions: {
      less: {
        globalVars: {
          'ta-gloal-text-color': 'blue'
        },
        // 自定义vant（有赞）框架主题。https://github.com/youzan/vant/blob/1.x/packages/style/var.less
        modifyVars: {
          'overlay-background-color': 'rgba(0, 0, 0, 0.4)',
          'switch-node-size': '.746667rem',
          'switch-height': '.746667rem',
          'switch-width': '1.6rem'
        }
      },
      postcss: {
        plugins: [
          //
          autoprefixer(),
          // 如果使用vux框架，那么remUnit参数会生效。
          postcsspx2rem({
            remUnit: 37.5
          }),
          // 配置vant框架，使用rem方式进行开发。rootValue默认为37.5
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            // 该项仅在使用 Circle 组件时需要。原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  }
}

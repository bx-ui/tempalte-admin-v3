const path = require('path')
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

const devHost = '127.0.0.1'

module.exports = {
  devServer: {
    proxy: {
      // 测试地址
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true
      },
      '/auth-server': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        onProxyRes: function(proxyRes, req, res) {
          const cookies = proxyRes.headers['set-cookie']
          if (cookies) {
            // 替换IP地址
            const cookieRegex = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/i
            const newCookie = cookies.map(function(cookie) {
              if (cookieRegex.test(cookie)) {
                cookie = cookie.replace(cookieRegex, devHost)
              }
              return cookie
            })
            delete proxyRes.headers['set-cookie']
            proxyRes.headers['set-cookie'] = newCookie
          }
        }
      }
    }
  },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}

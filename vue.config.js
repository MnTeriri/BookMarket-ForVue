const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: './',
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:80', // 目标服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' // 如果目标服务器的接口路径中有/api前缀，使用此配置去除
                }
            }
        }
    }
})
